import logger from './logger.js';
import {errorHandler} from './errorHandler.js';

const handleRouteErrors = (error, req, res, next) => { // Not implented
    logger.error(error.message);

    if (error.name === 'CastError') {
        //return res.status(400).send({ error: 'malformatted id' });
        error.HTTPStatus = 400;
        error.isTrusted = true;
        error.cause = "Malformated Id";

    } else if (error.name === 'ValidationError') { // failed mongoose validation
        //return res.status(400).json({ error: error.message });
        error.HTTPStatus = 400;
        error.isTrusted = true;
        error.cause = "Failed Validation";
    } 

    if (error && typeof error === 'object') {
        if (error.isTrusted === undefined || error.isTrusted === null) {
          error.isTrusted = true;
          // Error during a specific req is usually not fatal and should not lead to process exit
          // Can still catch programmer errors? should those be not trusted?
        };
      };
      //  Pass all error to a centralized error handler so they get treated equally
      errorHandler.handleError(error);
      res.status(error?.HTTPStatus || 500).end();

   // next(error) // moves to the default Express error handler
}

export default handleRouteErrors;


