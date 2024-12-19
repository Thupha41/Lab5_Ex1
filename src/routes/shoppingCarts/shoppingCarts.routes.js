import { Router } from "express";
import { wrapRequestHandler } from "../../utils/handlers";
import shoppingCartController from "../../controllers/shoppingCarts.controllers";
import {
  createShoppingCartValidator,
  updateShoppingCartValidator,
  deleteShoppingCartValidator,
} from "../../middlewares/shoppingCarts.middlewares";
const shoppingCartsRouter = Router();

/**
 * Description: Get list shopping cart
 * Path: /read
 * method: GET
 */

shoppingCartsRouter.get(
  "/read",
  wrapRequestHandler(shoppingCartController.getListShoppingCart)
);
/**
 * Description: Create a new shopping cart
 * Path: /create
 * method: POST
 * Body: {userId: int, productId: int, quantity: int}
 */
shoppingCartsRouter.post(
  "/create",
  createShoppingCartValidator,
  wrapRequestHandler(shoppingCartController.createShoppingCart)
);

/**
 * Description: Update a shopping cart
 * Path: /update
 * method: PUT
 * Params: {id: int}
 * Body: {userId: int, productId: int, quantity: int}
 */
shoppingCartsRouter.put(
  "/update/:id",
  updateShoppingCartValidator,
  wrapRequestHandler(shoppingCartController.updateShoppingCart)
);

/**
 * Description: Delete a shopping cart
 * Path: /delete
 * method: DELETE
 * Params: {id: int}
 */
shoppingCartsRouter.delete(
  "/delete/:id",
  deleteShoppingCartValidator,
  wrapRequestHandler(shoppingCartController.deleteShoppingCart)
);

export default shoppingCartsRouter;
