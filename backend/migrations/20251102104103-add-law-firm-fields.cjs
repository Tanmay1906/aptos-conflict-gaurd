'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add new columns for law firm details
    await queryInterface.addColumn('users', 'firm_address', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'firm_phone', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'license_number', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    });

    await queryInterface.addColumn('users', 'wallet_address', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Update the role enum to include 'law_firm'
    await queryInterface.changeColumn('users', 'role', {
      type: Sequelize.ENUM('user', 'admin', 'law_firm'),
      defaultValue: 'user',
    });
  },

  async down (queryInterface, Sequelize) {
    // Remove the added columns
    await queryInterface.removeColumn('users', 'firm_address');
    await queryInterface.removeColumn('users', 'firm_phone');
    await queryInterface.removeColumn('users', 'license_number');
    await queryInterface.removeColumn('users', 'wallet_address');

    // Revert the role enum
    await queryInterface.changeColumn('users', 'role', {
      type: Sequelize.ENUM('user', 'admin'),
      defaultValue: 'user',
    });
  }
};
