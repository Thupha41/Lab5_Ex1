import { Router } from "express";
import {
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
} from "../../middlewares/users.middlewares";
import { wrapRequestHandler } from "../../utils/handlers";
import userController from "../../controllers/users.controllers";
const usersRouter = Router();
/**
 * Description: Get list user
 * Path: /read
 * method: GET
 */

usersRouter.get("/read", wrapRequestHandler(userController.getListUser));
/**
 * Description: Create a new user
 * Path: /create
 * method: POST
 * Body: {fullName: string, address: string, registrationDate: Datetime}
 */

usersRouter.post(
  "/create",
  createUserValidator,
  wrapRequestHandler(userController.createUser)
);

/**
 * Description: Update a user
 * Path: /update
 * method: PUT
 * Params: {id: int}
 * Body: {fullName: string, address: string, registrationDate: Datetime}
 */
usersRouter.put(
  "/update/:id",
  updateUserValidator,
  wrapRequestHandler(userController.updateUser)
);

/**
 * Description: Delete a user
 * Path: /delete
 * method: DELETE
 * Params: {id: int}
 */
usersRouter.delete(
  "/delete/:id",
  deleteUserValidator,
  wrapRequestHandler(userController.deleteUser)
);
export default usersRouter;
