const { db } = require('../config/firebase');
const { admin } = require('../config/firebase');


class News {
    constructor(data) {
        this.id = data.id;
        this.author = data.author;
        this.title = data.title;
        this.content = data.content;
        this.url = data.url;
        this.urlToImage = data.urlToImage;
        this.publishedAt = data.publishedAt;
        this.source = data.source;
    }


// Create new news
static async create(newsData) {
    const news = new News(newsdata);
    const docRef = await db.collection('news').add({
      ...newsData,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    return {
      id: docRef.id,
      ...news
    };
  }

//find them
    static async findAll() {
    const snapshot = await db.collection('news')
      .orderBy('createdAt', 'desc')
      .get();
    
    const news = [];
    snapshot.forEach(doc => {
      news.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return news;
  }
}
module.exports = News;