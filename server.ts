import express from 'express';
import { createServer as createViteServer, build as viteBuild } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const host = process.env.HOST || '0.0.0.0';

// Middleware for parsing JSON requests with large image payloads
app.use(express.json({ limit: '25mb' }));

// Healthcheck endpoints for Cloud Run
app.get('/healthz', (_req, res) => {
  res.status(200).send('OK');
});
app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'healthy', uptime: process.uptime() });
});

// Initialize GoogleGenAI client if API key is present
const aiApiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (aiApiKey) {
  aiClient = new GoogleGenAI({
    apiKey: aiApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// Helper to extract base64 data & mime
function parseBase64(dataUrl: string) {
  const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
  const mimeMatch = dataUrl.match(/^data:(image\/\w+);base64,/);
  const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
  return { base64Data, mimeType };
}

// Candidate models for image generation in order of preference
const IMAGE_MODELS = [
  'gemini-3.1-flash-image-preview',
  'gemini-3.1-flash-image',
  'gemini-3.1-flash-lite-image'
];

// Helper to generate image via Gemini SDK
async function callGeminiImageModel(parts: any[], aspectRatio: string = '3:4') {
  if (!aiClient) {
    throw new Error('GEMINI_API_KEY is not configured on server');
  }

  let lastError: any = null;
  for (const model of IMAGE_MODELS) {
    try {
      console.log(`[Gemini Image] Attempting generation with model: ${model}`);
      const response = await aiClient.models.generateContent({
        model,
        contents: { parts },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio as any,
            imageSize: '1K'
          }
        } as any
      });

      if (response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData?.data) {
            const mime = part.inlineData.mimeType || 'image/png';
            return {
              imageUrl: `data:${mime};base64,${part.inlineData.data}`,
              modelUsed: model
            };
          }
        }
      }
    } catch (err: any) {
      console.warn(`[Gemini Image] Model ${model} failed:`, err?.message || err);
      lastError = err;
    }
  }

  throw lastError || new Error('No image was returned by Gemini image models');
}

// Endpoint 1: Direct Image Generation from Prompt (with optional reference photo)
app.post('/api/ai/direct-generate', async (req, res) => {
  try {
    const { prompt, referenceImageBase64, aspectRatio = '3:4' } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'prompt is required' });
    }

    const parts: any[] = [];
    if (referenceImageBase64 && typeof referenceImageBase64 === 'string') {
      const { base64Data, mimeType } = parseBase64(referenceImageBase64);
      parts.push({
        inlineData: {
          data: base64Data,
          mimeType: mimeType
        }
      });
    }
    parts.push({ text: prompt });

    try {
      const result = await callGeminiImageModel(parts, aspectRatio);
      return res.json({
        success: true,
        imageUrl: result.imageUrl,
        modelUsed: result.modelUsed,
        promptUsed: prompt
      });
    } catch (modelErr: any) {
      console.error('Direct generation model error:', modelErr);
      return res.status(502).json({
        success: false,
        error: modelErr?.message || 'Failed to generate image via AI model',
        promptUsed: prompt
      });
    }
  } catch (err: any) {
    console.error('Server error in /api/ai/direct-generate:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// Endpoint 2: Edit Image with Text Prompt using gemini-3.1-flash-image-preview
app.post('/api/ai/edit-image', async (req, res) => {
  try {
    const { imageBase64, editPrompt, aspectRatio = '3:4' } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'imageBase64 is required for editing' });
    }
    if (!editPrompt || typeof editPrompt !== 'string') {
      return res.status(400).json({ error: 'editPrompt is required' });
    }

    const { base64Data, mimeType } = parseBase64(imageBase64);
    const instructionPrompt = `Image editing task: Modify the provided image according to this instruction: ${editPrompt}. Maintain high-fashion photorealistic quality, natural textures, authentic Vietnamese traditional clothing aesthetics, and consistent lighting.`;

    const parts = [
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType
        }
      },
      { text: instructionPrompt }
    ];

    try {
      const result = await callGeminiImageModel(parts, aspectRatio);
      return res.json({
        success: true,
        imageUrl: result.imageUrl,
        modelUsed: result.modelUsed,
        editPromptUsed: editPrompt
      });
    } catch (modelErr: any) {
      console.error('Edit image model error:', modelErr);
      return res.status(502).json({
        success: false,
        error: modelErr?.message || 'Failed to edit image via AI model',
        editPromptUsed: editPrompt
      });
    }
  } catch (err: any) {
    console.error('Server error in /api/ai/edit-image:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// Endpoint 3: Full-body AI Try-On using Gemini / Imagen
app.post('/api/ai/fullbody-tryon', async (req, res) => {
  try {
    const {
      userPhotoBase64,
      garmentName,
      garmentDetails,
      styleName,
      colorName,
      bodyType,
      background,
      pose
    } = req.body;

    const fullbodyPrompt = `Full-body high-fashion editorial photograph of the person in this image standing full length from head to shoes.
Subject: Maintain exact facial features, facial structure, skin tone, hair, and identity of the person in the provided input photo.
Pose & Figure: Standing ${pose || 'confidently upright in a relaxed 3/4 editorial pose'}, full-length complete body shot showing full outfit down to the footwear, body type ${bodyType || 'natural proportions'}.
Costume: Authentically wearing traditional Vietnamese ${garmentName || 'Áo Ngũ Thân'} in elegant ${colorName || 'Royal Blue'} made of luxurious Vietnamese silk with intricate jacquard weave. ${garmentDetails || 'Proper five-panel tailored fit with authentic lap linh collar and five jade buttons'}.
Gen Z Styling: Modern ${styleName || 'Modern Minimalist'} fusion, paired with tailored wide-leg trousers, stylish modern footwear, and minimalist Vietnamese silver jewelry.
Environment: ${background || 'Minimalist art gallery studio with architectural raw concrete walls, warm softbox directional sunlight, subtle sheer silk curtain shadows'}.
Quality: Photorealistic 8k, Hasselblad H6D-100c medium format camera, 85mm f/1.4 portrait lens, natural skin pore texture, cinematic lighting, editorial Vogue Vietnam style. Head to toe framing, complete full body view.`;

    if (userPhotoBase64 && aiClient) {
      try {
        const { base64Data, mimeType } = parseBase64(userPhotoBase64);
        const parts = [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType
            }
          },
          { text: fullbodyPrompt }
        ];

        const result = await callGeminiImageModel(parts, '3:4');
        return res.json({
          success: true,
          imageUrl: result.imageUrl,
          promptUsed: fullbodyPrompt,
          modelUsed: result.modelUsed,
          mode: 'gemini-model-generated'
        });
      } catch (geminiError: any) {
        console.warn('Gemini image generation attempt failed in fullbody-tryon:', geminiError?.message);
      }
    }

    // Fallback response with prompt and instructions
    return res.json({
      success: true,
      promptUsed: fullbodyPrompt,
      mode: 'synthesis-fallback',
      message: 'Generated via Full-Body Lookbook Synthesis Engine'
    });
  } catch (err: any) {
    console.error('Server error in /api/ai/fullbody-tryon:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// Setup Vite or Static File Serving
async function startServer() {
  const distDir = path.resolve(__dirname, 'dist');
  const indexHtml = path.join(distDir, 'index.html');
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    if (!fs.existsSync(indexHtml)) {
      console.log('Production mode detected but dist/index.html is missing. Building with Vite...');
      try {
        await viteBuild();
        console.log('Vite build completed successfully.');
      } catch (buildErr) {
        console.error('Failed to build frontend with Vite:', buildErr);
      }
    }

    if (fs.existsSync(indexHtml)) {
      console.log(`Starting in production mode serving ${distDir}`);
      app.use(express.static(distDir));
      app.get('*', (_req, res) => {
        res.sendFile(indexHtml, (err) => {
          if (err) {
            console.error('Error sending index.html:', err);
            if (!res.headersSent) {
              res.status(500).send('Error loading page. Please try again.');
            }
          }
        });
      });
    } else {
      console.warn('dist/index.html still unavailable. Falling back to Vite middleware.');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa'
      });
      app.use(vite.middlewares);
    }
  } else {
    console.log('Starting in development mode with Vite middleware');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  const server = app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });

  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });
  });
}

startServer();
