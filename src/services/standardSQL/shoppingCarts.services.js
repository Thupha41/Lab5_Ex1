import { connection } from "../../configs/config.mysql";

class ShoppingCartServiceStandardSQL {
  static getAll = async () => {
    const [rows] = await connection.query("SELECT * FROM ShoppingCart");
    return rows;
  };

  static create = async (data) => {
    const { userId, productId, quantity } = data;
    const [result] = await connection.query(
      "INSERT INTO ShoppingCart (userId, productId, quantity) VALUES (?, ?, ?)",
      [userId, productId, quantity]
    );
    return result;
  };

  static async update(data) {
    const { id, userId, productId, quantity } = data;

    // Correct SQL query
    const [result] = await connection.query(
      "UPDATE ShoppingCart SET userId = ?, productId = ?, quantity = ? WHERE id = ?",
      [userId, productId, quantity, id]
    );

    if (result.affectedRows === 0) {
      throw new Error("Shopping Cart not found");
    }

    return { id, userId, productId, quantity };
  }

  static async delete(id) {
    const [result] = await connection.query(
      "DELETE FROM ShoppingCart WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      throw new Error("Shopping Cart not found");
    }
    return result;
  }
}

export default ShoppingCartServiceStandardSQL;
