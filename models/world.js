// models/World.js
const {admin, db } = require('../config/firebase');

class World {
  constructor(data) {
    this.name = data.name;
    this.genre = data.genre;
    this.factions = data.factions || [];
    this.resources = data.resources || [];
    this.situation = data.situation;
    this.history = data.history;
    this.createdAt = data.createdAt || new Date();
  }

  // Create new world
  static async create(worldData) {
    const world = new World(worldData);
    const docRef = await db.collection('worlds').add({
      ...world,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    return {
      id: docRef.id,
      ...world
    };
  }

  // Get all worlds
  static async findAll() {
    const snapshot = await db.collection('worlds')
      .orderBy('createdAt', 'desc')
      .get();
    
    const worlds = [];
    snapshot.forEach(doc => {
      worlds.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return worlds;
  }

  // Get world by ID
  static async findById(id) {
    const doc = await db.collection('worlds').doc(id).get();
    
    if (!doc.exists) {
      return null;
    }
    
    return {
      id: doc.id,
      ...doc.data()
    };
  }

  // Delete world
  static async delete(id) {
    await db.collection('worlds').doc(id).delete();
    return true;
  }
}

module.exports = World;