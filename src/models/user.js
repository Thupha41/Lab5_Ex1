"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Product, {
        through: "ShoppingCart",
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      address: DataTypes.STRING,
      registrationDate: DataTypes.DATE,
    },
    {
      sequelize: sequelize,
      modelName: "User",
      freezeTableName: true,
      tableName: "User",
    }
  );
  return User;
};
