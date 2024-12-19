import ShoppingCartServiceORM from "../services/ORM/shoppingCarts.services";
import ShoppingCartServiceStandardSQL from "../services/standardSQL/shoppingCarts.services";
import { USERS_MESSAGES } from "../constants/messages";
import { formatResponse } from "../utils/response";
import dotenv from "dotenv";
dotenv.config();

const useORM = process.env.useORM === "true";

const getListShoppingCart = async (req, res) => {
  const result = useORM
    ? await ShoppingCartServiceORM.getAll()
    : await ShoppingCartServiceStandardSQL.getAll();

  res.json(
    formatResponse(req.method, res.statusCode, {
      message: USERS_MESSAGES.GET_SHOPPING_CART_SUCCESS,
      data: result,
    })
  );
};

const createShoppingCart = async (req, res) => {
  const result = useORM
    ? await ShoppingCartServiceORM.create(req.body)
    : await ShoppingCartServiceStandardSQL.create(req.body);

  res.json(
    formatResponse(req.method, res.statusCode, {
      message: USERS_MESSAGES.CREATE_SHOPPING_CART_SUCCESS,
      data: result,
    })
  );
};

const updateShoppingCart = async (req, res) => {
  const { id } = req.params;
  const data = { id, ...req.body };

  let result = useORM
    ? await ShoppingCartServiceORM.update(data)
    : await ShoppingCartServiceStandardSQL.update(data);

  res.json(
    formatResponse(req.method, res.statusCode, {
      message: USERS_MESSAGES.UPDATE_SHOPPING_CART_SUCCESS,
      data: result,
    })
  );
};

const deleteShoppingCart = async (req, res) => {
  const { id } = req.params;
  let result = useORM
    ? await ShoppingCartServiceORM.delete(id)
    : await ShoppingCartServiceStandardSQL.delete(id);

  res.json(
    formatResponse(req.method, res.statusCode, {
      message: USERS_MESSAGES.DELETE_SHOPPING_CART_SUCCESS,
      data: result,
    })
  );
};

module.exports = {
  getListShoppingCart,
  createShoppingCart,
  updateShoppingCart,
  deleteShoppingCart,
};
