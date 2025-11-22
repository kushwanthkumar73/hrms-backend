// backend/models/employee.js
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "Employee",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      organisation_id: {
        type: DataTypes.INTEGER,
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      }
    },
    {
      tableName: "employees",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  Employee.associate = (models) => {
    Employee.belongsTo(models.Organisation, {
      foreignKey: "organisation_id",
    });

    Employee.belongsToMany(models.Team, {
      through: models.EmployeeTeam,
      foreignKey: "employee_id",
      otherKey: "team_id",
    });
  };

  return Employee;
};
