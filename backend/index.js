import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { getTvShowDetails } from './services/tvService.js';

const app = express();
const PORT = 5000;
app.use(cors());

let shows = [];

app.get('/api/shows', async (req, res) => {
  if (shows.length === 0) {
    const titles = fs.readFileSync(path.join('data', 'tvtitles.txt'), 'utf-8')
      .split('\n')
      .filter(Boolean);
    for (const title of titles) {
      try {
        const show = await getTvShowDetails(title);
        if (show) shows.push(show);
      } catch (e) {
        console.error(`Failed to fetch ${title}`);
      }
    }
  }
  res.json(shows);
});

app.get('/api/shows/:id', (req, res) => {
  const show = shows.find(s => s.id == req.params.id);
  if (show) res.json(show);
  else res.status(404).json({ error: 'Show not found' });
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
