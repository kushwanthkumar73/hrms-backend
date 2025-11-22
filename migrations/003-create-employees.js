'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employees', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      organisation_id: { type: Sequelize.INTEGER },
      first_name: Sequelize.STRING,
      last_name: Sequelize.STRING,
      email: Sequelize.STRING,
      phone: Sequelize.STRING,
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employees');
  }
};
