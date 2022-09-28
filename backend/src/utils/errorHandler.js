import logger from './logger.js';

let httpServerRef;

const errorHandler = {
  handleError: (errorToHandle) => {
    try {
      const appError = normalizeError(errorToHandle);
      logger.error(appError); //check
      // crash when an unknown error (non-trusted) is being thrown
      if (!appError.isTrusted) {
        logger.info('not trusted error catched')
        terminateHttpServerAndExit();
      }
    } catch (handlingError) {
      // Not using the logger here because it might have failed
      process.stdout.write(
        'The error handler failed, here are the handler failure and then the origin error that it tried to handle'
      );
      process.stdout.write(JSON.stringify(handlingError));
      process.stdout.write(JSON.stringify(errorToHandle));
    }
  },
};

const terminateHttpServerAndExit = async () => {
  // maybe implement more complex logic here (like using 'http-terminator' library)
  if (httpServerRef) {
    await httpServerRef.close();
  }
  process.exit();
};

// The input might won't be 'AppError' or even 'Error' instance, the output of this function will be - AppError.
const normalizeError = (errorToHandle) => {
  if (errorToHandle instanceof AppError) {
    return errorToHandle;
  }
  if (errorToHandle instanceof Error) {
    const appError = new AppError(
        errorToHandle.name, 
        errorToHandle.message, 
        errorToHandle.HTTPStatus || errorToHandle.status, //check, 
        errorToHandle.isTrusted,
        errorToHandle.cause);
        appError.stack = errorToHandle.stack;
    return appError;
  }
  // meaning it could be any type,
  const inputType = typeof errorToHandle;
  return new AppError(
    'general-error',
    `Error Handler received a none error instance with type - ${inputType}, value - ${util.inspect(
      errorToHandle
    )}`
  );
};

class AppError extends Error {
  constructor(
    name,
    message,
    HTTPStatus = 500,
    isTrusted = false,
    cause = "unknow cause"
  ) {
    super(message);
    this.name = name;
    this.HTTPStatus = HTTPStatus;
    this.isTrusted = isTrusted;
    this.cause = cause
  }
}

export {errorHandler, AppError};

