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

      User.belongsTo(models.Address, {
        through: "Address",
        foreignKey: "address_id",
      });

      User.belongsTo(models.Company, {
        through: "Company",
        foreignKey: "company_id",
      });
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      address: DataTypes.STRING,
      registrationDate: DataTypes.DATE,
      username: DataTypes.STRING,
      address_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Address",
          key: "id",
        },
      },
      phone: DataTypes.STRING,
      website: DataTypes.STRING,
      email: DataTypes.STRING,
      company_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Company",
          key: "id",
        },
      },
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
