'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employee_teams', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      employee_id: Sequelize.INTEGER,
      team_id: Sequelize.INTEGER,
      assigned_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employee_teams');
  }
};
