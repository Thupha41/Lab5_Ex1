"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn("User", "username", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn("User", "phone", {
        type: Sequelize.DOUBLE,
        allowNull: true,
      }),
      queryInterface.addColumn("User", "website", {
        type: Sequelize.DOUBLE,
        allowNull: true,
      }),
      queryInterface.addColumn("User", "email", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn("User", "address_id", {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.addColumn("User", "company_id", {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn("User", "username"),
      queryInterface.removeColumn("User", "phone"),
      queryInterface.removeColumn("User", "website"),
      queryInterface.removeColumn("User", "email"),
      queryInterface.removeColumn("User", "address_id"),
      queryInterface.removeColumn("User", "company_id"),
    ]);
  },
};
