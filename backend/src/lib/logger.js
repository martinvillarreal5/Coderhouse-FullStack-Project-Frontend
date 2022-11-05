import pino from "pino";
import "dotenv/config";

const logger = pino({
  level: process.env.NODE_ENV === "production" ? "error" : "debug",
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
});

// https://stackoverflow.com/questions/49306264/what-are-the-use-cases-of-identifying-process-id-of-a-log-message#:~:text=if%20you%20have%20multiple%20processes,pid%20to%20group%20them%20together

/*
logger.fatal('fatal');
logger.error('error');
logger.warn('warn');
logger.info('info');
logger.debug('debug');
logger.trace('trace');
*/

export default logger;
