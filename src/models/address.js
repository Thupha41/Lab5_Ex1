"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.hasOne(models.User, {
        foreignKey: "address_id",
        as: "user",
      });
    }
  }
  Address.init(
    {
      street: DataTypes.STRING,
      suite: DataTypes.STRING,
      city: DataTypes.STRING,
      zipcode: DataTypes.STRING,
      lat: DataTypes.STRING,
      lng: DataTypes.STRING,
    },
    {
      sequelize: sequelize,
      modelName: "Address",
      freezeTableName: true,
      tableName: "Address",
    }
  );
  return Address;
};
