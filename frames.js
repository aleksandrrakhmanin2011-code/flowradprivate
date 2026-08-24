// api/frames.js
export default async function handler(req, res) {
  // Разрешаем только GET запросы
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { path } = req.query;
  
  // Проверяем, что path передан
  if (!path) {
    return res.status(400).json({ error: 'Missing path parameter' });
  }

  // Ключ берем из переменных окружения Vercel
  const API_KEY = process.env.IDARKMETEO_KEY;
  
  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  // Формируем URL к API с ключом на серверной стороне
  const targetUrl = https://idarkmeteo.host/api/v1/${path}?key=${API_KEY};

  try {
    const response = await fetch(targetUrl);
    
    if (!response.ok) {
      return res.status(response.status).json({ 
        error: API error: ${response.status} 
      });
    }

    const data = await response.json();
    
    // Добавляем CORS заголовки для безопасности
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ error: 'Internal proxy error' });
  }
}