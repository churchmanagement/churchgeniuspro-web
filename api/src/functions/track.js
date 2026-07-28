'use strict';

/**
 * POST /api/track — records a video engagement event.
 *
 * Events (impression | click | play | watch) are appended to an Azure Table
 * Storage table. Aggregates are served to administrators by /api/stats.
 *
 * Required application setting:
 *   STORAGE_CONNECTION_STRING — connection string of any Azure Storage
 *   account (Table service). Without it, events are accepted and dropped so
 *   the website never breaks.
 */

const { app } = require('@azure/functions');
const { TableClient } = require('@azure/data-tables');

const TABLE_NAME = 'VideoEvents';
const VALID_EVENTS = new Set(['impression', 'click', 'play', 'watch']);

let clientPromise = null;
function getClient() {
  const conn = process.env.STORAGE_CONNECTION_STRING;
  if (!conn) return null;
  if (!clientPromise) {
    const client = TableClient.fromConnectionString(conn, TABLE_NAME);
    clientPromise = client
      .createTable()
      .catch(() => undefined) // already exists
      .then(() => client);
  }
  return clientPromise;
}

app.http('track', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    let body;
    try {
      body = await request.json();
    } catch {
      return { status: 400, jsonBody: { error: 'Invalid JSON body.' } };
    }

    const videoId = typeof body?.videoId === 'string' ? body.videoId.slice(0, 20) : '';
    const event = typeof body?.event === 'string' ? body.event : '';
    if (!/^[A-Za-z0-9_-]{5,20}$/.test(videoId) || !VALID_EVENTS.has(event)) {
      return { status: 400, jsonBody: { error: 'Invalid event.' } };
    }

    const seconds =
      event === 'watch' && Number.isFinite(Number(body.seconds))
        ? Math.max(0, Math.min(60, Number(body.seconds)))
        : 0;

    const pending = getClient();
    if (!pending) {
      context.warn('STORAGE_CONNECTION_STRING not configured — event dropped');
      return { status: 202, jsonBody: { ok: false, stored: false } };
    }

    try {
      const client = await pending;
      await client.createEntity({
        partitionKey: videoId,
        rowKey: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
        event,
        seconds,
        title: typeof body.title === 'string' ? body.title.slice(0, 120) : '',
        page: typeof body.page === 'string' ? body.page.slice(0, 200) : '',
        sessionId: typeof body.sessionId === 'string' ? body.sessionId.slice(0, 64) : '',
      });
      return { status: 202, jsonBody: { ok: true, stored: true } };
    } catch (err) {
      context.error('Failed to store event', err);
      return { status: 202, jsonBody: { ok: false, stored: false } };
    }
  },
});
