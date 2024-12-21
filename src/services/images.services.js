import fs from "fs";
import path from "path";

class ImageService {
  static upload(file) {
    if (!file) {
      throw new Error("No file uploaded");
    }

    return {
      message: "Image uploaded successfully",
      filePath: file.path,
    };
  }

  static list() {
    const directoryPath = path.join(__dirname, "../uploads");

    return new Promise((resolve, reject) => {
      fs.readdir(directoryPath, (err, files) => {
        if (err) {
          reject("Unable to scan files.");
        }
        resolve(files);
      });
    });
  }
}

export default ImageService;
