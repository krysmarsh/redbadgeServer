let router = require("express").Router();
const { Movies } = require("../models");
const validateSession = require("../middleware/validate-session");
//create get request in moviescontroller - include user information as well

router.post("/test", function (req, res) {
  res.send("It worked");
});

router.post("/create", validateSession, function (req, res) {
  console.log(req.user.id);
  const moviesCheckout = {
    title: req.body.title,
    genre: req.body.genre,
    rating: req.body.rating,
    platform: req.body.platform,
    review: req.body.review,
    isPublic: req.body.isPublic,
    photoURL: req.body.photoURL,
    userId: req.user.id,
  };
  Book.create(moviesCheckout)
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