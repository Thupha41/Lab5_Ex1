import UserServiceORM from "../services/ORM/users.services";
import UserServiceStandardSQL from "../services/standardSQL/users.services";
import { USERS_MESSAGES } from "../constants/messages";
import dotenv from "dotenv";
import { formatResponse } from "../utils/response";
dotenv.config();

const useORM = process.env.useORM === "true";
const getListUser = async (req, res) => {
  const result = useORM
    ? await UserServiceORM.getAll()
    : await UserServiceStandardSQL.getAll();
  res.json(
    formatResponse(req.method, res.statusCode, {
      message: USERS_MESSAGES.GET_USER_SUCCESS,
      data: result,
    })
  );
};

const createUser = async (req, res) => {
  const result = useORM
    ? await UserServiceORM.create(req.body)
    : await UserServiceStandardSQL.create(req.body);
  res.json(
    formatResponse(req.method, res.statusCode, {
      message: USERS_MESSAGES.CREATE_USER_SUCCESS,
      data: result,
    })
  );
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = { id, ...req.body };

  let result = useORM
    ? await UserServiceORM.update(data)
    : await UserServiceStandardSQL.update(data);

  res.json(
    formatResponse(req.method, res.statusCode, {
      message: USERS_MESSAGES.UPDATE_USER_SUCCESS,
      data: result,
    })
  );
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  let result = useORM
    ? await UserServiceORM.delete(id)
    : await UserServiceStandardSQL.delete(id);

  res.json(
    formatResponse(req.method, res.statusCode, {
      message: USERS_MESSAGES.DELETE_USER_SUCCESS,
      data: result,
    })
  );
};

module.exports = {
  getListUser,
  createUser,
  updateUser,
  deleteUser,
};
