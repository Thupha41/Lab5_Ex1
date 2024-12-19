import db from "../../models/index";

class ProductServiceORM {
  static getAll = async () => {
    let products = await db.Product.findAll({
      raw: true,
      nest: true,
    });
    return products;
  };

  static create = async (data) => {
    const products = await db.Product.create(data);
    return products;
  };

  static update = async (data) => {
    const [updatedRowsCount] = await db.Product.update(data, {
      where: { id: data.id },
    });
    if (updatedRowsCount === 0) {
      throw new Error("Failed to update product");
    }

    const updatedProduct = await db.Product.findOne({
      where: { id: data.id },
    });

    return updatedProduct;
  };

  static delete = async (id) => {
    const result = await db.Product.destroy({
      where: { id },
    });
    return result;
  };
}

export default ProductServiceORM;
