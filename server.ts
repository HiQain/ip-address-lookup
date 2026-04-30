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

  const isLocalOrPrivateIp = (ip: string) => {
    return /^(::1|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[0-1])\.|169\.254\.|0\.0\.0\.0)/.test(ip);
  };

  // API Route: Get visitor's IP
  app.get('/api/my-ip', async (req, res) => {
    try {
      // In production/Cloud Run, the real IP is often in x-forwarded-for
      const forwarded = req.headers['x-forwarded-for'];
      const forwardedIp = typeof forwarded === 'string'
        ? forwarded.split(',')[0]?.trim()
        : Array.isArray(forwarded)
          ? forwarded[0]
          : undefined;
      const rawIp = forwardedIp || req.socket.remoteAddress || '';
      const normalizedIp = rawIp.replace(/^::ffff:/, '');

      if (normalizedIp && !isLocalOrPrivateIp(normalizedIp)) {
        return res.json({ ip: normalizedIp });
      }

      // Local development requests arrive from loopback/private addresses.
      // In that case, fetch the machine's public IP so the local user still sees their real address.
      const publicIpResponse = await axios.get('https://api.ipify.org?format=json', {
        timeout: 5000,
      });

      return res.json({ ip: publicIpResponse.data.ip || normalizedIp });
    } catch (error) {
      console.error('My IP detection error:', error);
      return res.status(500).json({ error: 'Failed to detect your IP address' });
    }
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
