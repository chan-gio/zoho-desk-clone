module.exports = {
  async up(db, client) {
    // Create KnowledgeArticles collection (NO "default" fields)
    await db.createCollection("KnowledgeArticles", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["title", "created_at", "updated_at"],
          properties: {
            tenant_id: { bsonType: "string" },
            title: { bsonType: "string" },
            content: { bsonType: "string" },
            tags: {
              bsonType: "array",
              items: { bsonType: "string" }
            },
            category: { bsonType: "string" },
            views: { bsonType: "int" },
            created_at: { bsonType: "date" },
            updated_at: { bsonType: "date" }
          }
        }
      }
    });

    await db.collection("KnowledgeArticles").createIndex({ tenant_id: 1 });
    await db.collection("KnowledgeArticles").createIndex({ title: "text", content: "text", tags: "text" });

    // Create Logs collection
    await db.createCollection("Logs", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["event_type", "timestamp", "data", "tenant_id"],
          properties: {
            event_type: { bsonType: "string" },
            timestamp: { bsonType: "date" },
            data: {}, // Mixed type
            tenant_id: { bsonType: "string" }
          }
        }
      }
    });

    await db.collection("Logs").createIndex({ tenant_id: 1, timestamp: -1 });
  },

  async down(db, client) {
    await db.collection("KnowledgeArticles").drop();
    await db.collection("Logs").drop();
  }
};
