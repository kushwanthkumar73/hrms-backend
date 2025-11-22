'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('logs', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      organisation_id: Sequelize.INTEGER,
      user_id: Sequelize.INTEGER,
      action: Sequelize.STRING,
      meta: Sequelize.JSONB,
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('logs');
  }
};
