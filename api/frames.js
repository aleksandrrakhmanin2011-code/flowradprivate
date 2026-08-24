// api/frames.js
export default async function handler(req, res) {
  const { path } = req.query;
  
  if (!path) {
    return res.status(400).json({ error: 'Missing path' });
  }

  // Ключ берется из переменной окружения, которую вы только что добавили
  const API_KEY = process.env.IDARKMETEO_KEY;
  
  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await fetch(
      https://idarkmeteo.host/api/v1/${path}?key=${API_KEY}
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy error' });
  }
}
