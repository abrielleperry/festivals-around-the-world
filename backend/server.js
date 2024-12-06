import dotenv from "dotenv";
import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import logger from "./logger.js";
import { connectRedis, getCache, setCache, redisClient } from "./cache.js";
import createSearchRoutes from "./searchRoutes.js";

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

    app.use("/api", createSearchRoutes(festivalsCollection));

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
        const redisPing = (await getCache("health-check")) || "OK";
        res.status(200).json({ status: "healthy", redis: redisPing });
      } catch (error) {
        logger.error("Health check failed:", error.message);
        res.status(500).json({ status: "unhealthy", error: error.message });
      }
    });


    /* example usage:
    http://localhost:5001/festivals/674f38206160cd3d943298e0
    */
    app.get("/festivals/:id", async (req, res) => {
      const { id } = req.params;

      console.log(`Request received for festival ID: ${id}`);
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid festival ID" });
      }

      try {
        const cachedFestival = await getCache(id);
        if (cachedFestival) {
          console.log(`Cache hit for festival ID: ${id}`);
          return res.status(200).json(cachedFestival);
        }

        console.log(`Cache miss for festival ID: ${id}, fetching from database...`);
        const festival = await festivalsCollection.findOne({ _id: new ObjectId(id) });
        if (!festival) {
          return res.status(404).json({ message: "Festival not found" });
        }

        await setCache(id, festival, 3600);
        console.log(`Data cached for festival ID: ${id}`);
        res.status(200).json(festival);
      } catch (error) {
        console.error(`Error in /festivals/:id for ID: ${id}`, error);
        res.status(500).json({ message: "Failed to fetch festival" });
      }
    });


    /* example usage:
    http://localhost:5001/festivals?page=1&limit=5
    http://localhost:5001/festivals
    */
// backend/server.js
    app.get("/festivals", async (req, res) => {
      const { page = 1, limit = 10 } = req.query;

      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);

      if (isNaN(pageNum) || isNaN(limitNum) || pageNum <= 0 || limitNum <= 0) {
        logger.warn("Invalid page or limit values provided.");
        return res.status(400).json({ message: "Invalid page or limit values" });
      }

      try {
        const festivals = await festivalsCollection
          .find({})
          .skip((pageNum - 1) * limitNum)
          .limit(limitNum)
          .toArray();

        console.log(festivals); // Debugging line to check festival objects

        const total = await festivalsCollection.countDocuments();

        logger.info(
          `Fetched ${festivals.length} festivals for page ${pageNum} with limit ${limitNum}`
        );

        res.status(200).json({
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum),
          totalItems: total,
          data: festivals,
        });
      } catch (error) {
        logger.error("Error fetching paginated festivals:", error.message);
        res.status(500).json({ message: "Failed to fetch festivals" });
      }
    });



    /* example usage:
    http://localhost:5001/performers?page=2&limit=10
    http://localhost:5001/performers
    */
    app.get("/performers", async (req, res) => {
      const { page = 1, limit = 10 } = req.query;

      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);

      if (isNaN(pageNum) || isNaN(limitNum) || pageNum <= 0 || limitNum <= 0) {
        logger.warn("Invalid page or limit values provided for performers.");
        return res.status(400).json({ message: "Invalid page or limit values" });
      }

      try {
        const performers = await performersCollection
          .find({})
          .skip((pageNum - 1) * limitNum)
          .limit(limitNum)
          .toArray();

        const total = await performersCollection.countDocuments();

        logger.info(
          `Fetched ${performers.length} performers for page ${pageNum} with limit ${limitNum}`
        );

        res.status(200).json({
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum),
          totalItems: total,
          data: performers,
        });
      } catch (error) {
        logger.error("Error fetching paginated performers:", error.message);

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
