import ProductServiceORM from "../services/ORM/products.services";
import ProductServiceStandardSQL from "../services/standardSQL/products.services";
import { USERS_MESSAGES } from "../constants/messages";
import dotenv from "dotenv";
dotenv.config();

const useORM = process.env.useORM === "true";
const getListProduct = async (req, res) => {
  const result = useORM
    ? await ProductServiceORM.getAll()
    : await ProductServiceStandardSQL.getAll();
  res.json({
    message: USERS_MESSAGES.GET_PRODUCT_SUCCESS,
    result,
  });
};

const createProduct = async (req, res) => {
  const result = useORM
    ? await ProductServiceORM.create(req.body)
    : await ProductServiceStandardSQL.create(req.body);
  res.json({
    message: USERS_MESSAGES.CREATE_PRODUCT_SUCCESS,
    result,
  });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  const data = {
    id,
    ...req.body,
  };

  let result = useORM
    ? await ProductServiceORM.update(data)
    : await ProductServiceStandardSQL.update(data);

  res.json({
    message: USERS_MESSAGES.UPDATE_PRODUCT_SUCCESS,
    result,
  });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  let result = useORM
    ? await ProductServiceORM.delete(id)
    : await ProductServiceStandardSQL.delete(id);

  res.json({
    message: USERS_MESSAGES.DELETE_PRODUCT_SUCCESS,
    result,
  });
};

module.exports = {
  getListProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
