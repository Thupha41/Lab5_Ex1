import { Router } from "express";
import upload from "../../middlewares/multer.middlewares";
import imagesController from "../../controllers/images.controllers";

const imagesRouter = Router();
/**
 * Description: Upload an image
 * Path: /upload
 * Method: POST
 * Body: Multipart/form-data with the field "image" containing the file
 * Response:
 *  {
 *    message: string,
 *    filePath: string
 *  }
 */
imagesRouter.post(
  "/upload",
  upload.single("image"),
  imagesController.uploadImage
);
/**
 * Description: Get a list of stored images
 * Path: /list
 * Method: GET
 * Response:
 *  {
 *    files: string[] // List of file names in the uploads directory
 *  }
 */
imagesRouter.get("/list", imagesController.listImages);

export default imagesRouter;
