import { Router } from "express";
import { wrapRequestHandler } from "../../utils/handlers";
import {
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} from "../../middlewares/products.middlewares";
import productController from "../../controllers/products.controllers";
const productsRouter = Router();
/**
 * Description: Get list product
 * Path: /read
 * method: GET
 */

productsRouter.get(
  "/read",
  wrapRequestHandler(productController.getListProduct)
);
/**
 * Description: Create a new product
 * Path: /create
 * method: POST
 * Body: {productName: string, price: double, manufacturingDate: Datetime}
 */
productsRouter.post(
  "/create",
  createProductValidator,
  wrapRequestHandler(productController.createProduct)
);

/**
 * Description: Update a product
 * Path: /update
 * method: PUT
 * Params: {id: int}
 * Body: {productName: string, price: double, manufacturingDate: Datetime}
 */
productsRouter.put(
  "/update/:id",
  updateProductValidator,
  wrapRequestHandler(productController.updateProduct)
);

/**
 * Description: Delete a product
 * Path: /delete
 * method: DELETE
 * Params: {id: int}
 */
productsRouter.delete(
  "/delete/:id",
  deleteProductValidator,
  wrapRequestHandler(productController.deleteProduct)
);
export default productsRouter;
