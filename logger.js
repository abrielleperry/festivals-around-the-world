import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
    format: () => new Date().toISOString(),
  }),
    winston.format.prettyPrint(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" })
  ]
});

export default logger;