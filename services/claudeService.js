require('dotenv').config();

const Anthropic = require('@anthropic-ai/sdk');

class ClaudeService {
  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });
  }

  async generateWorld() {
    const prompt = `Generate a unique fantasy world. Randomly choose from these genres:
- High Fantasy (dragons, elves, magic kingdoms)
- Cyberpunk (megacorporations, hackers, neon cities)
- Space Opera (alien empires, galactic trade, star fleets)
- Steampunk (Victorian era, steam technology, airships)
- Post-Apocalyptic (wasteland survivors, mutants, scarce resources)

Create a detailed world with:
1. World name (creative and fitting)
2. Genre/setting
3. 3-5 major factions/nations (with names and brief descriptions)
4. 5-7 key economic resources or commodities
5. Current political/economic situation (1-2 sentences)
6. Brief world history (2-3 sentences)

CRITICAL: Return ONLY the raw JSON object. Do NOT wrap it in markdown code blocks or backticks.
Just return the JSON starting with { and ending with }

Return this exact structure:
{
  "name": "world name",
  "genre": "genre type",
  "factions": [
    {"name": "faction name", "description": "brief description"}
  ],
  "resources": ["resource1", "resource2"],
  "situation": "current situation",
  "history": "brief history"
}`;

    const response = await this.client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    let responseText = response.content[0].text;
    responseText = responseText.replace(/```json\s*/g, '');
    responseText = responseText.replace(/```\s*/g, '');
    responseText = responseText.trim();

    console.log('Cleaned response:', responseText.substring(0, 100) + '...');

    return JSON.parse(responseText);
  }

  async translateMarketData(world, marketData) {
    const prompt = `You are translating real-world financial instruments into this fantasy world:

WORLD CONTEXT:
${JSON.stringify(world, null, 2)}

REAL MARKET DATA TO TRANSLATE:
${JSON.stringify(marketData, null, 2)}

Create fantasy equivalents for each real-world instrument.

CRITICAL: Return ONLY the raw JSON object. Do NOT wrap it in markdown code blocks.
Return this exact structure:
{
  "mappings": {
    "S&P 500": "Fantasy Equivalent Name",
    "Gold": "Fantasy Equivalent Name"
  },
  "descriptions": {
    "Fantasy Equivalent Name": "What this represents in-world"
  }
}`;

    const response = await this.client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    let responseText = response.content[0].text;
    responseText = responseText.replace(/```json\s*/g, '');
    responseText = responseText.replace(/```\s*/g, '');
    responseText = responseText.trim();

    return JSON.parse(responseText);
  }

  async translateNews(world, realNews) {
    const prompt = `You are a news writer in this fantasy world:

WORLD CONTEXT:
${JSON.stringify(world, null, 2)}

REAL-WORLD NEWS EVENT:
Headline: ${realNews.headline}
Summary: ${realNews.summary}

Rewrite this as fantasy world news.

CRITICAL: Return ONLY the raw JSON object. Do NOT wrap it in markdown code blocks.
Return this exact structure:
{
  "headline": "fantasy headline",
  "article": "full article text",
  "date": "in-world date",
  "expert_quote": {
    "quote": "the quote",
    "attribution": "who said it"
  }
}`;

    const response = await this.client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    let responseText = response.content[0].text;
    responseText = responseText.replace(/```json\s*/g, '');
    responseText = responseText.replace(/```\s*/g, '');
    responseText = responseText.trim();

    return JSON.parse(responseText);
  }

  async predictPrices(world, fantasyNews, currentPrices, mappings) {
    const prompt = `You are a market analyst in this fantasy world:

WORLD CONTEXT:
${JSON.stringify(world, null, 2)}

BREAKING NEWS:
${fantasyNews.article}

CURRENT PRICES:
${JSON.stringify(currentPrices, null, 2)}

COMMODITY DESCRIPTIONS:
${JSON.stringify(mappings.descriptions, null, 2)}

Predict price movements for next 24 hours.

CRITICAL: Return ONLY the raw JSON array. Do NOT wrap it in markdown code blocks.
Return this exact structure:
[
  {
    "commodity": "Fantasy Name",
    "current_price": 4500.00,
    "direction": "up",
    "predicted_change_percent": 2.5,
    "confidence": "high",
    "reasoning": "explanation"
  }
]`;

    const response = await this.client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    let responseText = response.content[0].text;
    responseText = responseText.replace(/```json\s*/g, '');
    responseText = responseText.replace(/```\s*/g, '');
    responseText = responseText.trim();
    
    const predictions = JSON.parse(responseText);
    
    // Calculate predicted prices
    predictions.forEach(pred => {
      const change = pred.current_price * (pred.predicted_change_percent / 100);
      pred.predicted_price = +(pred.current_price + change).toFixed(2);
    });

    return predictions;
  }
}

module.exports = new ClaudeService();