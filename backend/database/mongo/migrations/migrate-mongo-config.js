require('dotenv').config();

module.exports = {
  mongodb: {
    url: process.env.MONGO_URI || "mongodb://localhost:27017/helpdesk",
    databaseName: process.env.MONGO_DBNAME || "helpdesk",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },
  migrationsDir: "database/mongo/migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js"
};