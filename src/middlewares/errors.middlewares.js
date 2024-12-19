import { omit } from "lodash";
import HTTP_STATUS from "../constants/httpStatus";
import { ErrorWithStatus } from "../utils/Error";

const defaultErrorHandler = (err, req, res, next) => {
  try {
    if (err instanceof ErrorWithStatus) {
      res.status(err.status).json(omit(err, ["status"]));
      return;
    }

    const finalError = {};
    Object.getOwnPropertyNames(err).forEach((key) => {
      const descriptor = Object.getOwnPropertyDescriptor(err, key);
      if (!descriptor?.configurable || !descriptor?.writable) {
        return;
      }
      finalError[key] = err[key];
    });

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: finalError.message,
      errorInfo: omit(finalError, ["stack"]),
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      errorInfo: omit(error, ["stack"]),
    });
  }
};

module.exports = defaultErrorHandler;
