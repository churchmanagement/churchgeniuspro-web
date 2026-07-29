'use strict';

/**
 * POST /api/chat — AI live chat assistant.
 *
 * Answers visitor questions about ChurchGeniusPro using the Claude API,
 * grounded in the official user manual, feature list, and pricing (see
 * ../kb.js).
 *
 * Required application settings (Azure Portal → Static Web App →
 * Environment variables):
 *   ANTHROPIC_API_KEY  — your Anthropic API key (https://console.anthropic.com)
 *   ANTHROPIC_MODEL    — optional model override (default: claude-haiku-4-5)
 */

const { app } = require('@azure/functions');
const { KNOWLEDGE_BASE } = require('../kb');

const SYSTEM_PROMPT = `You are the friendly AI assistant on the ChurchGeniusPro marketing website (www.churchgeniuspro.com). ChurchGeniusPro is an AI-powered all-in-one church management and accounting platform.

Answer visitor questions helpfully and concisely (usually 2-5 sentences) using ONLY the knowledge base below. If a question is outside the knowledge base or you are unsure, say so and point the visitor to support@churchgeniuspro.com or the Contact page (/contact). Never invent features, prices, or policies. Do not discuss topics unrelated to ChurchGeniusPro and church management — politely steer the conversation back. Point visitors to the Help Center (/help) for step-by-step guides, the Product Tour on the homepage for demo videos, and the YouTube channel for tutorials.

${KNOWLEDGE_BASE}`;

const MAX_TURNS = 10;
const MAX_MESSAGE_CHARS = 2000;

app.http('chat', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      context.warn('ANTHROPIC_API_KEY is not configured');
      return { status: 503, jsonBody: { error: 'Chat assistant is not configured yet.' } };
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return { status: 400, jsonBody: { error: 'Invalid JSON body.' } };
    }

    const raw = Array.isArray(body?.messages) ? body.messages : [];
    const messages = raw
      .filter(
        (m) =>
          m &&
          (m.role === 'user' || m.role === 'assistant') &&
          typeof m.content === 'string' &&
          m.content.trim().length > 0
      )
      .slice(-MAX_TURNS)
      .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_CHARS) }));

    if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
      return { status: 400, jsonBody: { error: 'Send at least one user message.' } };
    }

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5',
          max_tokens: 600,
          system: SYSTEM_PROMPT,
          messages,
        }),
      });

      if (!res.ok) {
        const detail = await res.text();
        context.error(`Anthropic API error ${res.status}: ${detail.slice(0, 500)}`);
        return { status: 502, jsonBody: { error: 'The assistant is temporarily unavailable.' } };
      }

      const data = await res.json();
      const reply = (data.content ?? [])
        .filter((block) => block.type === 'text')
        .map((block) => block.text)
        .join('\n')
        .trim();

      return { jsonBody: { reply: reply || 'Sorry, I could not generate a reply. Please try again.' } };
    } catch (err) {
      context.error('Chat handler failed', err);
      return { status: 502, jsonBody: { error: 'The assistant is temporarily unavailable.' } };
    }
  },
});
