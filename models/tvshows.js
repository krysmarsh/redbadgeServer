module.exports = (sequelize, DataTypes) => {
    const Tvshows = sequelize.define("tvshows", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      length: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      platform: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      photoURL: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
    return Tvshows;
  };
  