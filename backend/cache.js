import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redisClient.on("error", (err) => console.error("Redis Client Error:", err));

redisClient.on("end", async () => {
  console.error("Redis connection lost. Attempting to reconnect...");
  setTimeout(() => {
    redisClient.connect().catch((err) =>
      console.error("Failed to reconnect to Redis:", err)
    );
  }, 1000);
});

const connectRedis = async () => {
  try {
    console.log("Attempting to connect to Redis...");
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (error) {
    console.error("Failed to connect to Redis:", error.message);
    throw error;
  }
};


const validateKey = (key) => {
  if (typeof key !== "string" || key.trim() === "") {
    throw new Error("Invalid key: Keys must be non-empty strings.");
  }
};

const validateValue = (value) => {
  if (value === undefined || value === null) {
    throw new Error("Invalid value: Cannot cache null or undefined.");
  }
};

const setCache = async (key, value, ttl = 3600) => {
  console.log(`Attempting to cache: Key = ${key}, Value = ${JSON.stringify(value)}, TTL = ${ttl}`);
  try {
    await redisClient.setEx(key, ttl, JSON.stringify(value));
    console.log(`Cache set successfully for key: ${key}`);
  } catch (error) {
    console.error(`Error in setCache for key: ${key}`, error);
  }
};



const getCache = async (key) => {
  validateKey(key);
  try {
    console.log(`Fetching key from cache: ${key}`);
    const cachedValue = await redisClient.get(key);
    if (cachedValue) {
      console.log(`Cache hit for key: ${key}`);
    } else {
      console.log(`Cache miss for key: ${key}`);
    }
    return cachedValue ? JSON.parse(cachedValue) : null;
  } catch (error) {
    console.error("Error getting cache:", error.message);
    return null;
  }
};


export { connectRedis, getCache, setCache, redisClient };
