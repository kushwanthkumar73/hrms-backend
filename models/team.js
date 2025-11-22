// backend/models/team.js
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define(
    "Team",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      organisation_id: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      }
    },
    {
      tableName: "teams",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  Team.associate = (models) => {
    Team.belongsTo(models.Organisation, {
      foreignKey: "organisation_id",
    });

    Team.belongsToMany(models.Employee, {
      through: models.EmployeeTeam,
      foreignKey: "team_id",
      otherKey: "employee_id",
    });
  };

  return Team;
};

