"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsToMany(models.User, {
        through: "ShoppingCart",
        foreignKey: "productId",
      });
    }
  }
  Product.init(
    {
      productName: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      manufacturingDate: DataTypes.DATE,
    },
    {
      sequelize: sequelize,
      modelName: "Product",
      freezeTableName: true,
      tableName: "Product",
    }
  );
  return Product;
};
