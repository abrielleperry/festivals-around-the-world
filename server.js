import dotenv from "dotenv";
import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import logger from "./logger.js";
import { connectRedis, getCache, setCache, redisClient } from "./cache.js";

dotenv.config();

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;

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

    try {
      await connectRedis();
      logger.info("Connected to Redis successfully!");
    } catch (error) {
      logger.error("Failed to connect to Redis:", error.message);
      process.exit(1);
    }

    app.get("/health", async (req, res) => {
      try {
        await dbClient.db().admin().ping();
        const redisPing = await getCache("health-check") || "OK";
        res.status(200).json({ status: "healthy", redis: redisPing });
      } catch (error) {
        logger.error("Health check failed:", error.message);
        res.status(500).json({ status: "unhealthy", error: error.message });
      }
    });

    app.get("/festivals/:id", async (req, res) => {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid festival ID" });
      }

      try {
        const cachedFestival = await getCache(id);
        if (cachedFestival) {
          logger.info(`Cache hit for festival ID: ${id}`);
          return res.status(200).json(JSON.parse(cachedFestival));
        }

        const festival = await festivalsCollection.findOne({ _id: new ObjectId(id) });
        if (!festival) {
          return res.status(404).json({ message: "Festival not found" });
        }

        await setCache(id, festival);
        logger.info(`Cache miss for festival ID: ${id}. Data cached.`);
        res.status(200).json(festival);
      } catch (error) {
        logger.error("Error fetching festival:", error.message);
        res.status(500).json({ message: "Failed to fetch festival" });
      }
    });

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
    });

    process.on("SIGINT", async () => {
      try {
        await redisClient.quit();
        logger.info("Redis connection closed");
      } catch (error) {
        logger.error("Error closing Redis:", error.message);
      }

      try {
        await dbClient.close();
        logger.info("MongoDB connection closed");
        process.exit(0);
      } catch (error) {
        logger.error("Error closing MongoDB:", error.message);
        process.exit(1);
      }
    });
  } catch (err) {
    logger.error("Error connecting to MongoDB:", err.message);
  }
})();
