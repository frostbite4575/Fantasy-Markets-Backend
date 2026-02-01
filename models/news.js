const { db } = require('../config/firebase');
const { admin } = require('../config/firebase');

//spy oil gold bitcoin nvidia
class News {
    constructor(data) {
        this.id = data.id;
        this.spy = data.spy;
        this.gold = data.gold;
        this.bitcoin = data.bitcoin;
        this.oil = data.oil;
        this.nvidia = data.nvidia;
    }


// Create new market
static async create(marketData) {
    const market = new Market(marketData);
    const docRef = await db.collection('market').add({
      ...marketData,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    return {
      id: docRef.id,
      ...market
    };
  }

//find them
    static async findAll() {
    const snapshot = await db.collection('market')
      .orderBy('createdAt', 'desc')
      .get();
    
    const market = [];
    snapshot.forEach(doc => {
      market.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return market;
  }
}
module.exports = Market;