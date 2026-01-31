// models/Cycle.js
const { db } = require('../config/firebase');
const { admin } = require('../config/firebase');

class Cycle {
  constructor(data) {
    this.worldId = data.worldId;
    this.mappings = data.mappings || [];
    this.realNews = data.realNews || {};
    this.fantasyNews = data.fantasyNews || {};
    this.predictions = data.predictions || [];
    this.createdAt = data.createdAt || new Date();
  }

  // Create new cycle
  static async create(cycleData) {
    const cycle = new Cycle(cycleData);
    const docRef = await db.collection('cycles').add({
      ...cycle,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    return {
      id: docRef.id,
      ...cycle
    };
  }

  // Get all cycles with world data
  static async findAll() {
    const snapshot = await db.collection('cycles')
      .orderBy('createdAt', 'desc')
      .get();
    
    const cycles = [];
    
    for (const doc of snapshot.docs) {
      const cycleData = doc.data();
      
      // Get associated world
      let world = null;
      if (cycleData.worldId) {
        const worldDoc = await db.collection('worlds').doc(cycleData.worldId).get();
        if (worldDoc.exists) {
          world = {
            id: worldDoc.id,
            ...worldDoc.data()
          };
        }
      }
      
      cycles.push({
        id: doc.id,
        ...cycleData,
        world
      });
    }
    
    return cycles;
  }

  // Get cycle by ID
  static async findById(id) {
    const doc = await db.collection('cycles').doc(id).get();
    
    if (!doc.exists) {
      return null;
    }
    
    const cycleData = doc.data();
    
    // Get associated world
    let world = null;
    if (cycleData.worldId) {
      const worldDoc = await db.collection('worlds').doc(cycleData.worldId).get();
      if (worldDoc.exists) {
        world = {
          id: worldDoc.id,
          ...worldDoc.data()
        };
      }
    }
    
    return {
      id: doc.id,
      ...cycleData,
      world
    };
  }

  // Delete cycle
  static async delete(id) {
    await db.collection('cycles').doc(id).delete();
    return true;
  }
}

module.exports = Cycle;