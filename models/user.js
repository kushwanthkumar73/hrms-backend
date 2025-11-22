module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      organisation_id: {
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password_hash: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      }
    },
    {
      tableName: "users", // EXACT small letters
      timestamps: false
    }
  );

  User.associate = (models) => {
    User.belongsTo(models.Organisation, {
      foreignKey: "organisation_id",
    });
  };

  return User;
};
