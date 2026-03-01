# Fantasy Markets Backend

A Node.js/Express API that generates fantasy worlds and simulates market cycles using real financial data and Claude AI. Real-world stock prices and news are fetched, translated into fantasy equivalents, and used to predict commodity price movements within a unique fantasy economy.

## Tech Stack

- **Runtime:** Node.js + Express
- **Database:** Firebase Firestore
- **AI:** Anthropic Claude API
- **Market Data:** Alpha Vantage API
- **News:** NewsAPI

## Getting Started

### Prerequisites

- Node.js v14+
- Firebase project with Firestore enabled
- API keys for Anthropic, Alpha Vantage, and NewsAPI

### Installation

```bash
npm install
```

### Configuration

1. Create a `.env` file in the project root:

```env
ANTHROPIC_API_KEY=your_anthropic_key
NEWS_API_KEY=your_newsapi_key
ALPHA_VANTAGE_KEY=your_alpha_vantage_key
PORT=3000
```

2. Add your Firebase service account credentials as `serviceAccountKey.json` in the project root.

### Running

```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

Server starts at `http://localhost:3000`.

## API Endpoints

### Worlds

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/worlds/generate` | Generate a new fantasy world via Claude AI |
| GET | `/api/worlds` | Get all worlds |
| GET | `/api/worlds/:id` | Get a world by ID |
| DELETE | `/api/worlds/:id` | Delete a world |

### Cycles

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/cycles/run` | Run a full market cycle simulation |
| GET | `/api/cycles` | Get all cycles |
| GET | `/api/cycles/:id` | Get a cycle by ID |

### Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Check API and database status |

## How a Cycle Works

1. **Fetch Market Data** — Live prices for SPY, Gold, Bitcoin, Oil, and NVIDIA from Alpha Vantage
2. **Translate Markets** — Claude AI maps real commodities to fantasy equivalents (e.g., Gold → Mithril Ore)
3. **Fetch News** — A real financial news article from NewsAPI
4. **Translate News** — Claude AI rewrites the article as a fantasy world narrative with in-world dates and expert quotes
5. **Predict Prices** — Claude AI analyzes the fantasy news and market data to predict commodity price movements with confidence levels
6. **Save** — The full cycle (mappings, news, predictions) is stored in Firestore

## Project Structure

```
Fantasy-Markets-Backend/
├── config/
│   └── firebase.js            # Firestore initialization
├── controllers/
│   ├── worldController.js     # World CRUD logic
│   └── cycleController.js     # Cycle simulation logic
├── models/
│   ├── world.js               # World data model
│   ├── cycle.js               # Cycle data model
│   ├── market.js              # Market snapshot model
│   └── news.js                # News snapshot model
├── routes/
│   ├── worldRoutes.js         # World endpoints
│   └── cycleRoutes.js         # Cycle endpoints
├── services/
│   ├── claudeService.js       # Claude AI integration
│   ├── marketDataService.js   # Alpha Vantage API client
│   └── newsService.js         # NewsAPI client
├── middleware/
│   └── errorHandler.js        # Express error handler
├── server.js                  # Entry point
└── package.json
```

## Data Models

### World

```json
{
  "name": "Aelthermoor",
  "genre": "High Fantasy",
  "factions": [{ "name": "Kingdom of Valoris", "description": "..." }],
  "resources": ["Mithril", "Enchanted Crystals", "Phoenix Feathers"],
  "situation": "...",
  "history": "..."
}
```

### Cycle

```json
{
  "worldId": "world_id",
  "mappings": [
    { "realName": "S&P 500", "fantasyName": "Index of Realms", "description": "..." }
  ],
  "realNews": { "headline": "...", "summary": "..." },
  "fantasyNews": {
    "headline": "Royal Treasury Vault Overflows",
    "article": "...",
    "date": "3rd of Astrion, Year 1427",
    "expertQuote": { "quote": "...", "attribution": "..." }
  },
  "predictions": [
    {
      "commodity": "Mithril Ore",
      "current_price": 4500.00,
      "predicted_price": 4612.50,
      "direction": "up",
      "predicted_change_percent": 2.5,
      "confidence": "high",
      "reasoning": "..."
    }
  ]
}
```

## API Keys

| Key | Source |
|-----|--------|
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com/) |
| `NEWS_API_KEY` | [newsapi.org](https://newsapi.org/) |
| `ALPHA_VANTAGE_KEY` | [alphavantage.co](https://www.alphavantage.co/) |
