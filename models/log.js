module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define(
    "Log",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      organisation_id: {
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      action: {
        type: DataTypes.STRING,
      },
      meta: {
        type: DataTypes.JSONB || DataTypes.JSON,
      },
      created_at: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "logs",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    }
  );

  Log.associate = (models) => {
    Log.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "User",
    });

    Log.belongsTo(models.Organisation, {
      foreignKey: "organisation_id",
      as: "Organisation",
    });
  };

  return Log;
};
