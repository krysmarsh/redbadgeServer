let router = require("express").Router();
const { Tvshows } = require("../models");
const validateSession = require("../middleware/validate-session");
//create get request in musiccontroller - include user information as well

router.post("/test", function (req, res) {
  res.send("It worked");
});

router.post("/create", validateSession, function (req, res) {
  console.log(req.user.id);
  const tvshowsCheckout = {
    name: req.body.name,
    genre: req.body.genre,
    length: req.body.length,
    platform: req.body.platform,
    isPublic: req.body.isPublic,
    photoURL: req.body.photoURL,
    userId: req.user.id,
  };
  Book.create(tvshowsCheckout)
    .then((book) => res.status(200).json(book))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/get", validateSession, function
(req, res) {
  const query = {
    where: {userId: req.user.id},
    include: "user",
  };

  Movies.findAll(query)
  .then((Book) => res.status(200).json
  (Book))
  .catch((err) => res.status(500).json({ error: err}));
});

module.exports = router;