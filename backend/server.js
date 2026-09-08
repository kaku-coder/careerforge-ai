import "./src/config/env.js";

// Entry point: Initialize and start HTTP server and database connection
import app from "./src/app.js";
import connectDatabase from "./src/config/connectDb.js";
import "./src/config/redis.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    await connectDatabase();
    console.log(`Server is running on port ${PORT}`);
});
