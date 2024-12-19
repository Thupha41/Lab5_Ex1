import { checkSchema } from "express-validator";
import { USERS_MESSAGES } from "../constants/messages";
import { validate } from "../utils/validations";
import db from "../models";
export const createShoppingCartValidator = validate(
  checkSchema(
    {
      userId: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.USER_ID_IS_REQUIRED,
        },
        isInt: {
          errorMessage: USERS_MESSAGES.USER_ID_MUST_BE_INTEGER,
        },
        custom: {
          options: async (value) => {
            const user = await db.User.findByPk(value);
            if (!user) {
              return Promise.reject(USERS_MESSAGES.USER_NOT_FOUND);
            }
          },
        },
      },
      productId: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.PRODUCT_ID_IS_REQUIRED,
        },
        isInt: {
          errorMessage: USERS_MESSAGES.PRODUCT_ID_MUST_BE_INTEGER,
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
      quantity: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.QUANTITY_IS_REQUIRED,
        },
        isInt: {
          options: { min: 1 },
          errorMessage: USERS_MESSAGES.QUANTITY_MUST_BE_POSITIVE_INTEGER,
        },
      },
    },
    ["body"]
  )
);

export const updateShoppingCartValidator = validate(
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
      },
      userId: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.PRODUCT_ID_IS_REQUIRED,
        },
        isInt: {
          errorMessage: USERS_MESSAGES.USER_ID_MUST_BE_INTEGER,
        },
        custom: {
          options: async (value) => {
            const user = await db.User.findByPk(value);
            if (!user) {
              return Promise.reject(USERS_MESSAGES.USER_NOT_FOUND);
            }
          },
        },
      },
      productId: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.PRODUCT_ID_IS_REQUIRED,
        },
        isInt: {
          errorMessage: USERS_MESSAGES.PRODUCT_ID_MUST_BE_INTEGER,
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
      quantity: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.QUANTITY_IS_REQUIRED,
        },
        isInt: {
          options: { min: 1 },
          errorMessage: USERS_MESSAGES.QUANTITY_MUST_BE_POSITIVE_INTEGER,
        },
      },
    },
    ["body"]
  )
);

export const deleteShoppingCartValidator = validate(
  checkSchema(
    {
      id: {
        in: ["params"],
        notEmpty: {
          errorMessage: USERS_MESSAGES.ID_IS_REQUIRED,
        },
        isInt: {
          errorMessage: USERS_MESSAGES.ID_MUST_BE_INTEGER,
        },
      },
    },
    ["params"]
  )
);
