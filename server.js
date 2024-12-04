import dotenv from "dotenv";
import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import logger from "./logger.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const DATABASE_NAME = process.env.DATABASE_NAME;
const PORT = process.env.PORT || 5001;

(async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  let dbClient;

  try {
    dbClient = new MongoClient(MONGO_URI);
    await dbClient.connect();
    logger.info("Connected to MongoDB successfully!");

    const database = dbClient.db(DATABASE_NAME);
    const festivalsCollection = database.collection("festivals");
    const performersCollection = database.collection("performers");

    // all routes ↓

    // get all of data from the festivals collection
    app.get("/festivals", async (req, res) => {
      try {
        const festivals = await festivalsCollection.find({}).toArray();
        logger.info(`Fetched ${festivals.length} festivals`);
        res.status(200).json(festivals);
      } catch (error) {
        logger.error("Error fetching festivals:", error.message);
        res.status(500).json({ message: "Failed to fetch festivals" });
      }
    });

    // get all of data from the performers collection
    app.get("/performers", async (req, res) => {
      try {
        const performers = await performersCollection.find({}).toArray();
        logger.info(`Fetched ${performers.length} performers`);
        res.status(200).json(performers);
      } catch (error) {
        logger.error("Error fetching performers:", error.message);
        res.status(500).json({ message: "Failed to fetch performers" });
      }
    });

    app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
      logger.info("Server ready to handle requests");
    });

    process.on("SIGINT", async () => {
      await dbClient.close();
      logger.info("MongoDB connection closed");
      process.exit(0);
    });
  } catch (err) {
    logger.error("Error connecting to MongoDB:", err.message);
  }
})();
