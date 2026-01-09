import winston from 'winston';

const { combine, timestamp, json, colorize, simple } = winston.format;

const isProd = process.env.APP_ENV === "prod";

const transports = isProd 
  ? [new winston.transports.File({ filename: "app.log"})]
  : [new winston.transports.Console()];

const format = isProd
  ? combine(timestamp(), json())
  : combine(colorize(), simple());

const logger = winston.createLogger({
  level: "info",
  format, 
  transports
});

export default logger;