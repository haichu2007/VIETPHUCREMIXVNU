import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import { generateOutfitStyling } from './src/server/geminiStylist.ts';
import { searchRealProducts } from './src/server/geminiSearchProducts.ts';
import { searchDestinations } from './src/server/geminiSearchDestinations.ts';
import { generateOutfitCardImage, tryOnUserOutfitImage } from './src/server/geminiImageGenerator.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();

  // In AI Studio development containers (ais-dev-*), Nginx is bound to 8080 and proxies traffic to 3000.
  // In Cloud Run live deployment containers (ais-pre-*, production), Cloud Run sets PORT (usually 8080)
  // and routes traffic directly to it without Nginx.
  const isDevContainer =
    Boolean(process.env.K_SERVICE?.includes('-dev-')) ||
    process.env.npm_lifecycle_event === 'dev' ||
    process.env.NODE_ENV === 'development';

  const defaultPort = isDevContainer ? 3000 : Number(process.env.PORT || 8080);

  app.use(express.json({ limit: '25mb' }));

  // API health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Gemini AI Stylist endpoint
  app.post('/api/gemini/stylist', async (req, res) => {
    try {
      const { prompt } = req.body || {};
      if (!prompt || typeof prompt !== 'string') {
        res.status(400).json({ error: 'Prompt is required' });
        return;
      }
      const result = await generateOutfitStyling(prompt);
      res.json(result);
    } catch (err: any) {
      console.error('Stylist API error:', err);
      res.status(500).json({
        error: 'Failed to process styling request',
        message: err?.message || 'Unknown error'
      });
    }
  });

  // Google Search Products Grounding endpoint
  app.post('/api/gemini/search-products', async (req, res) => {
    try {
      const {
        garmentName,
        bottomName,
        footwearName,
        headwearName,
        bagName,
        accessoryName,
        colorName,
        styleName,
        outfitCode
      } = req.body || {};

      if (!garmentName) {
        res.status(400).json({ error: 'garmentName is required' });
        return;
      }

      const result = await searchRealProducts({
        garmentName,
        bottomName: bottomName || '',
        footwearName: footwearName || '',
        headwearName,
        bagName,
        accessoryName,
        colorName,
        styleName,
        outfitCode
      });

      res.json(result);
    } catch (err: any) {
      res.status(500).json({
        error: 'Failed to search products',
        message: err?.message || 'Unknown error'
      });
    }
  });

  // Google Search Destinations Grounding with New Vietnam Administrative Divisions
  app.post('/api/gemini/search-destinations', async (req, res) => {
    try {
      const { garmentName, styleName, colorName, city, category, query } = req.body || {};
      const result = await searchDestinations({
        garmentName,
        styleName,
        colorName,
        city,
        category,
        query
      });
      res.json(result);
    } catch (err: any) {
      console.error('Destination Search API error:', err);
      res.status(500).json({
        error: 'Failed to search destinations',
        message: err?.message || 'Unknown error'
      });
    }
  });

  // AI Heritage Model Image Generation endpoint
  app.post('/api/gemini/generate-card-image', async (req, res) => {
    try {
      const {
        garmentName,
        garmentId,
        styleName,
        colorName,
        colorHex,
        bottomName,
        bottomId,
        footwearName,
        footwearId,
        headwearName,
        headwearId,
        accessoryName,
        accessoryId,
        bagName,
        bagId,
        userCustomPrompt
      } = req.body || {};

      if (!garmentName) {
        res.status(400).json({ error: 'garmentName is required' });
        return;
      }

      const result = await generateOutfitCardImage({
        garmentName,
        garmentId: garmentId || 'ao-ngu-than',
        styleName: styleName || 'Cổ phong',
        colorName: colorName || 'Màu sắc truyền thống',
        colorHex: colorHex || '#8B1E1E',
        bottomName: bottomName || '',
        bottomId,
        footwearName: footwearName || '',
        footwearId,
        headwearName,
        headwearId,
        accessoryName,
        accessoryId,
        bagName,
        bagId,
        userCustomPrompt
      });

      res.json(result);
    } catch (err: any) {
      res.status(500).json({
        error: 'Failed to generate card image',
        message: err?.message || 'Unknown error'
      });
    }
  });

  // AI Heritage Virtual Try-On endpoint (Directly onto User's Uploaded Photo)
  app.post('/api/gemini/try-on-user-photo', async (req, res) => {
    try {
      const {
        userPhotoUrl,
        garmentName,
        garmentId,
        styleName,
        colorName,
        colorHex,
        bottomName,
        bottomId,
        footwearName,
        footwearId,
        headwearName,
        headwearId,
        accessoryName,
        accessoryId,
        bagName,
        bagId,
        userCustomPrompt
      } = req.body || {};

      if (!userPhotoUrl) {
        res.status(400).json({ error: 'userPhotoUrl is required' });
        return;
      }

      if (!garmentName) {
        res.status(400).json({ error: 'garmentName is required' });
        return;
      }

      const result = await tryOnUserOutfitImage({
        userPhotoUrl,
        garmentName,
        garmentId: garmentId || 'ao-ngu-than',
        styleName: styleName || 'Cổ phong',
        colorName: colorName || 'Màu sắc truyền thống',
        colorHex: colorHex || '#8B1E1E',
        bottomName: bottomName || '',
        bottomId,
        footwearName: footwearName || '',
        footwearId,
        headwearName,
        headwearId,
        accessoryName,
        accessoryId,
        bagName,
        bagId,
        userCustomPrompt
      });

      res.json(result);
    } catch (err: any) {
      console.error('Try-on API error:', err);
      res.status(500).json({
        error: 'Failed to try on outfit on user photo',
        message: err?.message || 'Unknown error'
      });
    }
  });

  const distPath = path.resolve(__dirname, 'dist');
  const indexPath = path.join(distPath, 'index.html');
  const hasDist = fs.existsSync(indexPath);

  if (!isDevContainer && hasDist) {
    // Production (Cloud Run rollout): Serve pre-built static assets from Vite build output
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(indexPath);
    });
  } else {
    // Development (or fallback): Mount Vite in middleware mode
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: defaultPort },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  const server = app.listen(defaultPort, '0.0.0.0', () => {
    console.log(`Server listening on 0.0.0.0:${defaultPort} (container: ${isDevContainer ? 'dev' : 'production'})`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE' && defaultPort !== 3000) {
      console.warn(`Port ${defaultPort} in use, falling back to port 3000...`);
      app.listen(3000, '0.0.0.0', () => {
        console.log('Server listening on 0.0.0.0:3000 (fallback)');
      });
    } else {
      console.error('Server listen error:', err);
    }
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
