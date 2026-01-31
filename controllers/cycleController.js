// controllers/cycleController.js
const Cycle = require('../models/cycle');
const World = require('../models/world');
const claudeService = require('../services/claudeService');
const marketDataService = require('../services/marketDataService');
const newsService = require('../services/newsService');

// @desc    Run complete fantasy market cycle
// @route   POST /api/cycles/run
// @access  Public
exports.runCycle = async (req, res) => {
  try {
    const { worldId } = req.body;
    
    console.log('Starting cycle...');
    
    // Get or generate world
    let world;
    if (worldId) {
      world = await World.findById(worldId);
      if (!world) {
        return res.status(404).json({
          success: false,
          error: 'World not found'
        });
      }
    } else {
      const worldData = await claudeService.generateWorld();
      world = await World.create(worldData);
    }
    
    console.log('World ready:', world.name);
    
    // Get current market data
    console.log('Fetching market data...');
    const marketData = await marketDataService.getCurrentMarketData();
    
    // Translate market data
    console.log('Translating market data...');
    const translation = await claudeService.translateMarketData(world, marketData);
    
    // Get current news
    console.log('Fetching news...');
   

    const realNews = await newsService.getCurrentNews();
  console.log('Real news fetched:', realNews); 
    
    // Translate news
    console.log('Translating news...');
    const fantasyNews = await claudeService.translateNews(world, realNews);
    
    // Predict prices
    console.log('Predicting prices...');
    const predictions = await claudeService.predictPrices(
      world,
      fantasyNews,
      marketData,
      translation
    );
    
    // Create mappings array
    const mappings = Object.keys(translation.mappings).map(realName => ({
      realName,
      fantasyName: translation.mappings[realName],
      description: translation.descriptions[translation.mappings[realName]]
    }));
    
    // Save cycle to Firebase
    const cycle = await Cycle.create({
      worldId: world.id,
      mappings,
      realNews: {
        headline: realNews.headline,
        summary: realNews.summary
      },
      fantasyNews: {
        headline: fantasyNews.headline,
        article: fantasyNews.article,
        date: fantasyNews.date,
        expertQuote: fantasyNews.expert_quote
      },
      predictions
    });
    
    // Attach world data to response
    cycle.world = world;
    
    console.log('Cycle complete!');
    
    res.status(201).json({
      success: true,
      data: cycle
    });
    
  } catch (error) {
    console.error('Error running cycle:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get all cycles
// @route   GET /api/cycles
// @access  Public
exports.getCycles = async (req, res) => {
  try {
    const cycles = await Cycle.findAll();
    
    res.status(200).json({
      success: true,
      count: cycles.length,
      data: cycles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single cycle
// @route   GET /api/cycles/:id
// @access  Public
exports.getCycle = async (req, res) => {
  try {
    const cycle = await Cycle.findById(req.params.id);
    
    if (!cycle) {
      return res.status(404).json({
        success: false,
        error: 'Cycle not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: cycle
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};