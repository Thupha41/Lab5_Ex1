import { Router } from "express";
import usersRouter from "./users/users.routes";
import productsRouter from "./products/product.routes";
import shoppingCartsRouter from "./shoppingCarts/shoppingCarts.routes";
const router = Router();

const initApiRoute = (app) => {
  //users
  router.use("/users", usersRouter);
  //products
  router.use("/products", productsRouter);
  //shoppingCarts
  router.use("/shopping-carts", shoppingCartsRouter);
  //api/v1 router
  return app.use("/api", router);
};
export default initApiRoute;
