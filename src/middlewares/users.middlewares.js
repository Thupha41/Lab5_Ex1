import { checkSchema } from "express-validator";
import { USERS_MESSAGES } from "../constants/messages";
import { validate } from "../utils/validations";
import db from "../models";
export const createUserValidator = validate(
  checkSchema(
    {
      fullName: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.NAME_IS_REQUIRED,
        },
        isString: {
          errorMessage: USERS_MESSAGES.NAME_MUST_BE_A_STRING,
        },
        trim: true,

        isLength: {
          options: {
            min: 1,
            max: 100,
          },
          errorMessage: USERS_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100,
        },
      },
      address: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.ADDRESS_IS_REQUIRED,
        },
        isString: {
          errorMessage: USERS_MESSAGES.ADDRESS_MUST_BE_A_STRING,
        },
        trim: true,
      },
      registrationDate: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.REGISTRATION_DATE_IS_REQUIRED,
        },
        isISO8601: {
          errorMessage: USERS_MESSAGES.REGISTRATION_DATE_MUST_BE_ISO8601,
        },
        toDate: true,
      },
    },
    ["body"]
  )
);

export const updateUserValidator = validate(
  checkSchema(
    {
      id: {
        in: ["params"], // Validate `id` in the path params
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
      fullName: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.NAME_IS_REQUIRED,
        },
        isString: {
          errorMessage: USERS_MESSAGES.NAME_MUST_BE_A_STRING,
        },
        isLength: {
          options: {
            min: 1,
            max: 100,
          },
          errorMessage: USERS_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100,
        },
        trim: true,
      },
      address: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.ADDRESS_IS_REQUIRED,
        },
        isString: {
          errorMessage: USERS_MESSAGES.ADDRESS_MUST_BE_A_STRING,
        },
        trim: true,
      },
      registrationDate: {
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

export const deleteUserValidator = validate(
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
            const user = await db.User.findByPk(value);
            if (!user) {
              return Promise.reject(USERS_MESSAGES.USER_NOT_FOUND);
            }
          },
        },
      },
    },
    ["params"]
  )
);
