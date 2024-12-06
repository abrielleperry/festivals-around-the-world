import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { format } from "date-fns";

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    redis: 5,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    verbose: "blue",
    debug: "white",
    redis: "magenta",
  },
};

const logger = winston.createLogger({
  levels: customLevels.levels,
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: () => {
        return new Date().toLocaleString("en-US", {
          timeZone: "America/Chicago",
        });
      },
    }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
      ),
    }),

    new DailyRotateFile({
      filename: "logs/application-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      level: "info",
    }),

    new DailyRotateFile({
      filename: "logs/redis-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "10m",
      maxFiles: "7d",
      level: "redis",
    }),
  ],
});

winston.addColors(customLevels.colors);

export default logger;
