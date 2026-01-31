// controllers/worldController.js
const World = require('../models/World');
const claudeService = require('../services/claudeService');

// @desc    Generate new fantasy world
// @route   POST /api/worlds/generate
// @access  Public
exports.generateWorld = async (req, res) => {
  try {
    console.log('Generating new world...');
    
    const worldData = await claudeService.generateWorld();
    const world = await World.create(worldData);
    
    res.status(201).json({
      success: true,
      data: world
    });
  } catch (error) {
    console.error('Error generating world:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get all saved worlds
// @route   GET /api/worlds
// @access  Public
exports.getWorlds = async (req, res) => {
  try {
    const worlds = await World.findAll();
    
    res.status(200).json({
      success: true,
      count: worlds.length,
      data: worlds
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single world by ID
// @route   GET /api/worlds/:id
// @access  Public
exports.getWorld = async (req, res) => {
  try {
    const world = await World.findById(req.params.id);
    
    if (!world) {
      return res.status(404).json({
        success: false,
        error: 'World not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: world
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete world
// @route   DELETE /api/worlds/:id
// @access  Public
exports.deleteWorld = async (req, res) => {
  try {
    const world = await World.findById(req.params.id);
    
    if (!world) {
      return res.status(404).json({
        success: false,
        error: 'World not found'
      });
    }
    
    await World.delete(req.params.id);
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};