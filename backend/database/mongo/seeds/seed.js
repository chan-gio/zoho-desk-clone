const { MongoClient } = require('mongodb');
async function seed() {
  const client = await MongoClient.connect('mongodb://localhost:27017');
  const db = client.db('helpdesk');
  await db.collection('articles').insertMany([
    { tenantId: 'demo-tenant', title: 'How to reset password', content: 'Step 1: ...', createdAt: new Date() },
    { tenantId: 'demo-tenant', title: 'How to create a ticket', content: 'Step 1: ...', createdAt: new Date() }
  ]);
  client.close();
}
seed(); 