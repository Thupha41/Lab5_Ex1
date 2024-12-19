import { connection } from "../../configs/config.mysql";

class UserServiceStandardSQL {
  static getAll = async () => {
    const [rows] = await connection.query("SELECT * FROM User");
    return rows;
  };

  static create = async (data) => {
    const { fullName, address, registrationDate } = data;
    const [result] = await connection.query(
      "INSERT INTO User (fullName, address, registrationDate) VALUES (?, ?, ?)",
      [fullName, address, registrationDate]
    );
    return result;
  };

  static async update(data) {
    const { id, fullName, address, registrationDate } = data;

    // Correct SQL query
    const [result] = await connection.query(
      "UPDATE User SET fullName = ?, address = ?, registrationDate = ? WHERE id = ?",
      [fullName, address, registrationDate, id]
    );

    if (result.affectedRows === 0) {
      throw new Error("User not found");
    }

    return { id, fullName, address, registrationDate };
  }

  static async delete(id) {
    const [result] = await connection.query("DELETE FROM User WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0) {
      throw new Error("User not found");
    }
    return result;
  }
}

export default UserServiceStandardSQL;
