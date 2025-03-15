import winston from 'winston';

const logger = winston.createLogger({
    level: 'info', // Levels: error, warn, info, debug
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(), // Logs in the console
        new winston.transports.File({ filename: 'logs/test.log' }) // Save logs to file
    ],
});

export default logger;
