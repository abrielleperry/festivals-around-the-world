import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redisClient.on("error", (err) => console.error("Redis Client Error:", err));

const connectRedis = async () => {
  await redisClient.connect();
  console.log("Connected to Redis");
};

const getCache = async (key) => await redisClient.get(key);
const setCache = async (key, value, ttl = 3600) =>
  await redisClient.setEx(key, ttl, JSON.stringify(value));

export { connectRedis, getCache, setCache, redisClient };
