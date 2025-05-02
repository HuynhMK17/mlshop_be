// import Redis from "ioredis";

// const redisClient = new Redis({
//   host: process.env.REDIS_HOST || "localhost", // Fallback to localhost
//   port: parseInt(process.env.REDIS_PORT || "6379", 10),
//   // password: process.env.REDIS_PASSWORD, // Uncomment if using password
//   maxRetriesPerRequest: 3, // Optional: retry settings
// });

// redisClient.on("connect", () => {
//   console.log(
//     `[Redis] Connected successfully to ${redisClient.options.host}:${redisClient.options.port}`
//   );
// });

// redisClient.on("error", (err) => {
//   console.error("[Redis] Connection error:", err);
//   // Consider implementing more robust error handling/reconnection logic
// });

// export default redisClient;
