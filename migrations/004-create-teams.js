'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teams', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      organisation_id: Sequelize.INTEGER,
      name: Sequelize.STRING,
      description: Sequelize.TEXT,
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('teams');
  }
};

