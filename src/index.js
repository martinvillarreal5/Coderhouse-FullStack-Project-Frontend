import logger from './utils/logger.js';
import { AppError, errorHandler } from './utils/errorHandler.js';
import { startWebServer } from './api/server.js';

async function start() {
  // Array of entry point is being used to support more entry-points kinds like message queue, scheduled job,
  return Promise.all([startWebServer()]);
}

start()
  .then((startResponses) => {
    logger.info(`The app has started successfully`, startResponses);
  })
  .catch((error) => {
    errorHandler.handleError(
      new AppError('startup-failure', error.message, 500, false, error)
    );
  });