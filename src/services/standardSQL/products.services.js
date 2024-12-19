import { connection } from "../../configs/config.mysql";

class ProductServiceStandardSQL {
  static getAll = async () => {
    const [rows] = await connection.query("SELECT * FROM Product");
    return rows;
  };

  static create = async (data) => {
    const { productName, price, manufacturingDate } = data;
    const [result] = await connection.query(
      "INSERT INTO Product (productName, price, manufacturingDate) VALUES (?, ?, ?)",
      [productName, price, manufacturingDate]
    );
    return result;
  };

  static async update(data) {
    const { id, productName, price, manufacturingDate } = data;

    // Correct SQL query
    const [result] = await connection.query(
      "UPDATE Product SET productName = ?, price = ?, manufacturingDate = ? WHERE id = ?",
      [productName, price, manufacturingDate, id]
    );

    if (result.affectedRows === 0) {
      throw new Error("Product not found");
    }

    return { id, productName, price, manufacturingDate };
  }

  static async delete(id) {
    const [result] = await connection.query(
      "DELETE FROM Product WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      throw new Error("Product not found");
    }
    return result;
  }
}

export default ProductServiceStandardSQL;
