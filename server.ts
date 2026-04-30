import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Get visitor's IP
  app.get('/api/my-ip', (req, res) => {
    // In production/Cloud Run, the real IP is often in x-forwarded-for
    const forwarded = req.headers['x-forwarded-for'];
    const ip = typeof forwarded === 'string' ? forwarded.split(',')[0] : req.socket.remoteAddress;
    res.json({ ip });
  });

  // API Route: Lookup IP info
  app.get('/api/lookup/:query', async (req, res) => {
    try {
      const { query } = req.params;
      // Using ip-api.com (free for non-commercial, no key for low volume)
      // For production apps, you'd use a key-based service like ipstack or abstractapi
      const response = await axios.get(`http://ip-api.com/json/${query}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query`);
      
      if (response.data.status === 'fail') {
        return res.status(400).json({ error: response.data.message });
      }

      res.json(response.data);
    } catch (error) {
      console.error('IP Lookup error:', error);
      res.status(500).json({ error: 'Failed to fetch IP details' });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
