import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import morganMiddleware from "./logger/morgan.logger.js";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

const app = express();

// global middlewares
app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN === "*"
        ? "*" // This might give CORS error for some origins due to credentials set to true
        : process.env.CORS_ORIGIN?.split(","), // For multiple cors origin for production. Refer https://github.com/hiteshchoudhary/apihub/blob/a846abd7a0795054f48c7eb3e71f3af36478fa96/.env.sample#L12C1-L12C12
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); // configure static file to save images locally

app.use(morganMiddleware);

//Define all API's needed for the APP here
import eventRouter from "./routes/event.routes.js";

app.use("/api/allevents", eventRouter);

// Default home page route
app.use("/", (req, res) => {
  res.send(`
          <div>
            <div>Welcome to event managment app</div>
            <span>For API endpoints refer routes defined on app.js</span>
          </div>
          `);
});

//Establishing connect to DB

connectDB()
  .then(() => {
    // startServer();
    app.listen(process.env.PORT || 8080, () => {
      console.log("⚙️  Server is running on port: " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("Mongo db connect error: ", err);
  });
