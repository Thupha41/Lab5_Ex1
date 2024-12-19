import db from "../../models/index";

class UserServiceORM {
  static getAll = async () => {
    let users = await db.User.findAll({
      raw: true,
      nest: true,
    });
    return users;
  };

  static create = async (data) => {
    const users = await db.User.create(data);
    return users;
  };

  static update = async (data) => {
    const [updatedRowsCount] = await db.User.update(data, {
      where: { id: data.id },
    });
    if (updatedRowsCount === 0) {
      throw new Error("Failed to update user");
    }

    const updatedUser = await db.User.findOne({
      where: { id: data.id },
    });

    return updatedUser;
  };

  static delete = async (id) => {
    const result = await db.User.destroy({
      where: { id },
    });
    return result;
  };
}

export default UserServiceORM;
