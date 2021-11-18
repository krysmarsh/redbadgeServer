const { DataTypes } = require("sequelize");
const db = require("../db");

    const Music = db.define("music", {
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      artist: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      songs: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      album: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isPublic: {
        type: DataTypes.STRING,
        allowNull: true,
        
      },
      photoURL: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
   module.exports = Music;