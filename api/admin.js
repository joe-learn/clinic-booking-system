export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const N8N_ADMIN_WEBHOOK = 'https://joenegm.app.n8n.cloud/webhook/d9479756-8133-46ef-acaf-112d2b942754/clinic-admin-v2';

  try {
    const upstream = await fetch(N8N_ADMIN_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const text = await upstream.text();
    res.status(upstream.status);
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json');
    res.send(text);
  } catch (err) {
    res.status(502).json({ error: 'upstream_failed', message: err.message });
  }
}
