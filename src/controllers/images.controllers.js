import ImageService from "../services/images.services";
import { formatResponse } from "../utils/response";
import { USERS_MESSAGES } from "../constants/messages";
const uploadImage = async (req, res) => {
  const result = ImageService.upload(req.file);
  res.json(
    formatResponse(req.method, res.statusCode, {
      message: USERS_MESSAGES.UPLOAD_IMAGE_SUCCESS,
      data: result,
    })
  );
};

const listImages = async (req, res) => {
  const files = await ImageService.list();
  res.json(
    formatResponse(req.method, res.statusCode, {
      message: USERS_MESSAGES.GET_LIST_IMAGES_SUCCESS,
      data: files,
    })
  );
};

module.exports = {
  uploadImage,
  listImages,
};
