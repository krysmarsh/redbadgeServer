const User = require("./user");
const Movies = require("./movies");
const Music = require("./music");
const Tvshows = require("./tvshows");

User.hasMany(Movies);
Movies.belongsTo(User);

User.hasMany(Music);
Music.belongsTo(User);

User.hasMany(Tvshows);
Tvshows.belongsTo(User);

module.exports = {
  User,
  Movies,
  Music,
  Tvshows,
};
