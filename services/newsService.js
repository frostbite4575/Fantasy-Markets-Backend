//services/newsService.js
const axios = require('axios');

async function getCurrentNews (query = "business news") {

try {
  const response = await axios.get (`https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`);
 
  const articles =response.data.articles;

  if(!articles || articles.length === 0) {
    throw new Error('No news found');
  }

  const article = articles[Math.floor(Math.random() * articles.length)];

  return {
    headline: article.title,
    summary: article.description,
    url: article.url
  };
} catch (error) {
  console.error(error);
  throw new Error('Failed to fetch news');
}};

module.exports = { getCurrentNews };