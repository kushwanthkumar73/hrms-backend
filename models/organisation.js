module.exports = (sequelize, DataTypes) => {
  const Organisation = sequelize.define(
    "Organisation",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: "organisations", // EXACT small letters
      timestamps: false
    }
  );

  Organisation.associate = (models) => {
    Organisation.hasMany(models.User, {
      foreignKey: "organisation_id"
    });
    Organisation.hasMany(models.Employee, {
      foreignKey: "organisation_id"
    });
    Organisation.hasMany(models.Team, {
      foreignKey: "organisation_id"
    });
  };

  return Organisation;
};


