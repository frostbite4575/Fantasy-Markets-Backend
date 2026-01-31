// services/marketDataService.js
const axios = require('axios');

class MarketDataService {
  async getSPYData() {
  
    try {
      const response = await axios.get(`https://www.alphavantage.co/query?function=Global_QUOTE&symbol=SPY&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch market data');
    }
  }
    async getGoldData() {
  
      try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=GLD&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`);
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch market data');
      }
  }
    async getBitcoinData() {
  
      try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=BTC&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`);
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch market data');
      }
  }
    async getCrudeOilData() {
  
      try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=USO&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`);
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch market data');
      }
  }
    async getNvidiaData() {
  
      try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=NVDA&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`);
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch market data');
      }}
      async getCurrentMarketData() {
      const [spy, gold, bitcoin, oil, nvidia] = await Promise.all([
        this.getSPYData(),
        this.getGoldData(),
        this.getBitcoinData(),
        this.getCrudeOilData(),
        this.getNvidiaData()
      ]);
    
    return {
        'S&P 500': parseFloat(spy['Global Quote']?.['05. price']),
        'Gold': parseFloat(gold['Global Quote']?.['05. price']),
        'Bitcoin': parseFloat(bitcoin['Global Quote']?.['05. price']),
        'Crude Oil': parseFloat(oil['Global Quote']?.['05. price']),
        'NVIDIA': parseFloat(nvidia['Global Quote']?.['05. price']),
      }
    }catch (error) {
      console.error(error);
      throw new Error('Failed to fetch current market data');
    }
}
    

     //  'S&P 500'
     // 'Gold'
     // 'Bitcoin'
    //  'Crude Oil'
    //  'NVIDIA'

 


module.exports = new MarketDataService();