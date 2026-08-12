import "./env.js";
import Redis from "ioredis";

const redisUri = process.env.REDIS_URI;

const redisOptions = {
    maxRetriesPerRequest: null,
    enableReadyCheck: true
};

const redis = redisUri
    ? new Redis(redisUri, redisOptions)
    : new Redis({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD,
        ...redisOptions
    });

redis.on("ready", () => {
    console.log("Redis Connected Successfully");
});

redis.on("error", (err) => {
    console.error("Redis Connection Error:", err.message || err);
});

export default redis;
