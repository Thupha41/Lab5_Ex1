import { checkSchema } from "express-validator";
import { USERS_MESSAGES } from "../constants/messages";
import { validate } from "../utils/validations";
import db from "../models";
export const createProductValidator = validate(
  checkSchema(
    {
      productName: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.PRODUCT_NAME_IS_REQUIRED,
        },
        isString: {
          errorMessage: USERS_MESSAGES.PRODUCT_NAME_MUST_BE_A_STRING,
        },
        trim: true,

        isLength: {
          options: {
            min: 1,
            max: 100,
          },
          errorMessage:
            USERS_MESSAGES.PRODUCT_NAME_LENGTH_MUST_BE_FROM_1_TO_100,
        },
      },
      price: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.PRICE_IS_REQUIRED,
        },
        isNumeric: {
          options: { min: 1 },
          errorMessage: USERS_MESSAGES.PRICE_MUST_BE_NUMBER,
        },
        trim: true,
      },
      manufacturingDate: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.DATE_IS_REQUIRED,
        },
        isISO8601: {
          errorMessage: USERS_MESSAGES.DATE_MUST_BE_ISO8601,
        },
        toDate: true,
      },
    },
    ["body"]
  )
);

export const updateProductValidator = validate(
  checkSchema(
    {
      id: {
        in: ["params"], // Validate `id` in the path params
        notEmpty: {
          errorMessage: USERS_MESSAGES.ID_IS_REQUIRED,
        },
        isInt: {
          errorMessage: USERS_MESSAGES.ID_MUST_BE_INTEGER,
        },
        custom: {
          options: async (value) => {
            const product = await db.Product.findByPk(value);
            if (!product) {
              return Promise.reject(USERS_MESSAGES.PRODUCT_NOT_FOUND);
            }
          },
        },
      },
      productName: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.PRODUCT_NAME_IS_REQUIRED,
        },
        isString: {
          errorMessage: USERS_MESSAGES.PRODUCT_NAME_MUST_BE_A_STRING,
        },
        trim: true,

        isLength: {
          options: {
            min: 1,
            max: 100,
          },
          errorMessage:
            USERS_MESSAGES.PRODUCT_NAME_LENGTH_MUST_BE_FROM_1_TO_100,
        },
      },
      price: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.PRICE_IS_REQUIRED,
        },
        isNumeric: {
          options: { min: 1 },
          errorMessage: USERS_MESSAGES.PRICE_MUST_BE_NUMBER,
        },
        trim: true,
      },
      manufacturingDate: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.DATE_IS_REQUIRED,
        },
        isISO8601: {
          errorMessage: USERS_MESSAGES.DATE_MUST_BE_ISO8601,
        },
        toDate: true,
      },
    },
    ["body"]
  )
);

export const deleteProductValidator = validate(
  checkSchema(
    {
      id: {
        in: ["params"], // Validate `id` in the path params
        notEmpty: {
          errorMessage: USERS_MESSAGES.ID_IS_REQUIRED,
        },
        isInt: {
          errorMessage: USERS_MESSAGES.ID_MUST_BE_INTEGER,
        },
        custom: {
          options: async (value) => {
            const product = await db.Product.findByPk(value);
            if (!product) {
              return Promise.reject(USERS_MESSAGES.PRODUCT_NOT_FOUND);
            }
          },
        },
      },
    },
    ["params"]
  )
);
