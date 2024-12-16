import express from "express";
import bodyParser from "body-parser";
import router from "./routes/app";
import cors from "cors";
import { Response, Request } from "express";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import Logger from "./utils/logger";
import config from "./config";
import { connect_now } from "./startup/connection";

// Database connection
connect_now(config.conn).catch(err => {
  Logger.error("Failed to connect to database:", err);
  process.exit(1);
});

const app = express();

const corsOptions = {
  origin: '*',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
};

const corsMiddleware = cors(corsOptions);

// Enable Helmet middleware for security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "example.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
}));

// Enable CORS for all routes
app.use(corsMiddleware);

// Enable request body parsing
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable Express Mongo Sanitize middleware to prevent MongoDB injection
app.use(mongoSanitize());

// Enable rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.set("trust proxy", "loopback"); // specify a single subnet

app.get("/", (req: Request, res: Response) => {
  res.json("Hello World");
});

// Set up your routes
app.use("/youthFellowship/v1", router());

const port = config.port || 2300;
console.log("port", port);
app.listen(port, () => console.log("The application is running on port", port));

// Graceful shutdown
process.on('SIGTERM', () => {
  Logger.info('SIGTERM signal received: closing HTTP server');
  app.listen().close(() => {
    Logger.info('HTTP server closed');
  });
});
