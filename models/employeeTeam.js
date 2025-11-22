// backend/models/employeeTeam.js
module.exports = (sequelize, DataTypes) => {
  const EmployeeTeam = sequelize.define(
    "EmployeeTeam",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employee_id: {
        type: DataTypes.INTEGER,
      },
      team_id: {
        type: DataTypes.INTEGER,
      },
      assigned_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    },
    {
      tableName: "employee_teams",
      timestamps: false,
    }
  );

  return EmployeeTeam;
};

