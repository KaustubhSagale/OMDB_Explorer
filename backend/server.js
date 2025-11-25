require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { createCache } = require('./cacheStore');

const app = express();
app.use(express.json());
app.use(cors());

const OMDB_KEY = process.env.OMDB_KEY;
const SERVER_PORT = process.env.PORT || 3000;
const CACHE_LIMIT = parseInt(process.env.CACHE_LIMIT || '120', 10);
const CACHE_TTL = parseInt(process.env.CACHE_TTL_SECONDS || '600', 10) * 1000;

if (!OMDB_KEY) {
  console.error('ERROR: please create backend/.env from .env.example and set OMDB_KEY');
  process.exit(1);
}

const cache = createCache({ maxItems: CACHE_LIMIT, ttlMs: CACHE_TTL });
const OMDB_URL = 'https://www.omdbapi.com/';

async function fetchFromOmdb(params) {
  const key = Object.keys(params).sort().map(k => `${k}=${params[k]}`).join('&');
  const cacheKey = `omdb::${key}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const res = await axios.get(OMDB_URL, { params: { ...params, apikey: OMDB_KEY }, timeout: 6000 });
  cache.set(cacheKey, res.data);
  return res.data;
}

app.get('/status', (req, res) => {
  res.json({ healthy: true, cache: cache.info() });
});

app.get('/api/search', async (req, res) => {
  const { query, page } = req.query;
  if (!query) return res.status(400).json({ error: 'missing query parameter' });
  try {
    const data = await fetchFromOmdb({ s: query, page: page || 1 });
    if (data.Response === 'False') return res.json({ total: 0, results: [], message: data.Error });
    const formatted = (data.Search || []).map(i => ({
      id: i.imdbID, name: i.Title, year: i.Year, poster: i.Poster === 'N/A' ? null : i.Poster, kind: i.Type
    }));
    res.json({ total: parseInt(data.totalResults || formatted.length, 10), results: formatted });
  } catch (err) {
    console.error('search error', err.message || err);
    res.status(500).json({ error: 'upstream fetch failed' });
  }
});

app.get('/api/movie', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'missing id parameter' });
  try {
    const data = await fetchFromOmdb({ i: id, plot: 'full' });
    if (data.Response === 'False') return res.status(404).json({ error: data.Error });
    // Pick only useful fields to keep payload compact
    const detail = {
      id: data.imdbID,
      title: data.Title,
      year: data.Year,
      rating: data.imdbRating,
      votes: data.imdbVotes,
      runtime: data.Runtime,
      genre: data.Genre,
      director: data.Director,
      actors: data.Actors,
      plot: data.Plot,
      poster: data.Poster === 'N/A' ? null : data.Poster,
      ratingsSource: data.Ratings
    };
    res.json(detail);
  } catch (err) {
    console.error('details error', err.message || err);
    res.status(500).json({ error: 'upstream fetch failed' });
  }
});

app.listen(SERVER_PORT, () => {
  console.log(`Backend service listening on http://localhost:${SERVER_PORT}`);
});
