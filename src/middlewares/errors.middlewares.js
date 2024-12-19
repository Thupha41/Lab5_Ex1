import { omit } from "lodash";
import HTTP_STATUS from "../constants/httpStatus";
import { ErrorWithStatus } from "../utils/Error";
import { formatResponse } from "../utils/response";
const defaultErrorHandler = (err, req, res, next) => {
  try {
    const action = req.method;

    if (err instanceof ErrorWithStatus) {
      res.status(err.status).json(
        formatResponse(action, "errors", {
          message: err.message,
          errors: err.errors || {},
        })
      );
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
      action,
      status: "errors",
      "User/Product/ShoppingCart": {
        message: finalError.message || "Internal server error",
        errors: omit(finalError, ["stack"]),
      },
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      action: req.method,
      status: "error",
      "User/Product/ShoppingCart": {
        message: "Internal server error",
        errors: {},
      },
    });
  }
};

export default defaultErrorHandler;
