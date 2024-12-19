import db from "../../models/index";

class ShoppingCartServiceORM {
  static getAll = async () => {
    let carts = await db.ShoppingCart.findAll({
      raw: true,
      nest: true,
    });
    return carts;
  };

  static create = async (data) => {
    const cart = await db.ShoppingCart.create(data);
    return cart;
  };

  static update = async (data) => {
    const [updatedRowsCount] = await db.ShoppingCart.update(data, {
      where: { id: data.id },
    });
    console.log(updatedRowsCount);
    if (updatedRowsCount === 0) {
      throw new Error("Failed to update shopping cart");
    }

    const updatedCart = await db.ShoppingCart.findOne({
      where: { id: data.id },
    });
    console.log(updatedCart);
    return updatedCart;
  };

  static delete = async (id) => {
    const result = await db.ShoppingCart.destroy({
      where: { id },
    });
    return result;
  };
}

export default ShoppingCartServiceORM;
