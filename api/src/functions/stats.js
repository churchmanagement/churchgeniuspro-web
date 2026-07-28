'use strict';

/**
 * GET /api/stats — aggregated video engagement analytics.
 *
 * ACCESS CONTROL: this route is restricted to the `admin` role in
 * staticwebapp.config.json (Azure Static Web Apps built-in auth). Grant the
 * role via Azure Portal → Static Web App → Role management → Invite.
 *
 * Returns per-video impressions, clicks, plays, and total watch seconds.
 */

const { app } = require('@azure/functions');
const { TableClient } = require('@azure/data-tables');

const TABLE_NAME = 'VideoEvents';

app.http('stats', {
  methods: ['GET'],
  authLevel: 'anonymous', // route-level role check is enforced by Static Web Apps
  handler: async (_request, context) => {
    const conn = process.env.STORAGE_CONNECTION_STRING;
    if (!conn) {
      return {
        jsonBody: {
          videos: [],
          totals: { impressions: 0, clicks: 0, plays: 0, watchSeconds: 0 },
          note: 'STORAGE_CONNECTION_STRING is not configured — no events are being stored yet.',
        },
      };
    }

    try {
      const client = TableClient.fromConnectionString(conn, TABLE_NAME);
      const byVideo = new Map();
      const totals = { impressions: 0, clicks: 0, plays: 0, watchSeconds: 0 };

      for await (const e of client.listEntities()) {
        const id = e.partitionKey;
        let v = byVideo.get(id);
        if (!v) {
          v = { videoId: id, title: '', impressions: 0, clicks: 0, plays: 0, watchSeconds: 0 };
          byVideo.set(id, v);
        }
        if (e.title && !v.title) v.title = String(e.title);
        switch (e.event) {
          case 'impression':
            v.impressions += 1;
            totals.impressions += 1;
            break;
          case 'click':
            v.clicks += 1;
            totals.clicks += 1;
            break;
          case 'play':
            v.plays += 1;
            totals.plays += 1;
            break;
          case 'watch': {
            const s = Number(e.seconds) || 0;
            v.watchSeconds += s;
            totals.watchSeconds += s;
            break;
          }
          default:
            break;
        }
      }

      const videos = [...byVideo.values()].sort(
        (a, b) => b.watchSeconds - a.watchSeconds || b.plays - a.plays
      );
      return { jsonBody: { videos, totals } };
    } catch (err) {
      context.error('Failed to aggregate stats', err);
      return { status: 500, jsonBody: { error: 'Failed to load analytics.' } };
    }
  },
});
