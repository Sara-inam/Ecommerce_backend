import winston from "winston";
import path from "path";
import os from "os";
import fs from "fs";

// Determine log directory
const isProduction = process.env.NODE_ENV === "production";
const logDir = isProduction
  ? path.join(os.tmpdir(), "logs") // temp folder in Vercel
  : path.join(process.cwd(), "logs"); // local

// Create folder if it doesn't exist (only for local)
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Get today's date string
const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    // Console logs
    new winston.transports.Console({
      format: winston.format.colorize({ all: true }),
    }),

    // File logs with date in filename
    new winston.transports.File({
      filename: path.join(logDir, `app-${today}.log`),
      level: "info",
    }),
    new winston.transports.File({
      filename: path.join(logDir, `error-${today}.log`),
      level: "error",
    }),
  ],
});

Object.freeze(logger);

export default logger;
