🎬 OMDB Movie Explorer
A fast, modern movie search application built with React (Vite) + Node.js/Express.
The backend securely proxies OMDB API requests with caching, while the frontend provides a clean, responsive UI.


🚀 Features
🔍 Instant movie search with title-based lookup
📄 Detailed movie info (plot, director, actors, ratings)
🖼 Poster previews with graceful fallbacks
⚡ Backend caching (TTL + max-size eviction)
🔐 No API key exposed to frontend
📱 Responsive UI with smooth animations

🏗 Architecture
Frontend (React + Vite)
    ↓ API calls
Backend (Node + Express)
    ↓ Proxy requests
OMDB API (with key protection)
Frontend: Pure React, Axios, modular components
Backend: Express server with custom in-memory cache
Cache: Automatic expiry + LRU-like cleanup
⚙ Setup Instructions

1️⃣ Clone Repo
git clone https://github.com/KaustubhSagale/OMDB_Explorer
cd OMDB_Explorer
2️⃣ Backend
cd backend
cp .env.example .env   # add your OMDB KEY
npm install
npm start
Runs at: http://localhost:3000
3️⃣ Frontend
cd ../frontend
cp .env.example .env
npm install
npm run dev
Runs at: http://localhost:5173

🔧 Environment Variables
Backend (.env)
OMDB_KEY=YOUR_OMDB_KEY
PORT=3000
CACHE_LIMIT=120
CACHE_TTL_SECONDS=600
Frontend (.env)
VITE_BACKEND_URL=http://localhost:3000


What This Project Demonstrates
REST API design
Secure external API integration
Frontend → backend communication
In-memory caching
Clean React component design
Professional full-stack structure

