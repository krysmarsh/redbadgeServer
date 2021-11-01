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
    title: req.body.movies.title,
    genre: req.body.movies.genre,
    rating: req.body.movies.rating,
    platform: req.body.movies.platform,
    review: req.body.movies.review,
    isPublic: req.body.movies.isPublic,
    photoURL: req.body.movies.photoURL,
    userId: req.user.id,
  };
  Movies.create(moviesCheckout)
    .then((movies) => res.status(200).json(movies))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/get", validateSession, function
(req, res) {
  const query = {
    where: {userId: req.user.id},
    include: "user",
  };

  Movies.findAll(query)
  .then((Movies) => res.status(200).json
  (Movies))
  .catch((err) => res.status(500).json({ error: err}));
});
//update movies by id
router.put('/:moviesId', validateSession, (req, res) => {
  let moviesId = req.params.moviesId;
  const updateMovies = {
    title: req.body.movies.title,
    genre: req.body.movies.genre,
    rating: req.body.movies.rating,
    platform: req.body.movies.platform,
    review: req.body.movies.review,
    isPublic: req.body.movies.isPublic,
    photoURL: req.body.movies.photoURL,
    userId: req.user.id,
  };
  const query = { where: { id: moviesId, userId: req.user.id } };
  console.log(query);
  Movies.update(updateMovies, query)
      .then((movies) => res.status(200)
              .json({ movies, message: 'Movie successfully updated' })
      )
      .catch((err) =>
          res
              .status(500)
              .json({ error: err, message: 'Error: Movie not updated' })
      );
});

//delete movie
router.delete('/:moviesId', validateSession, (req, res) => {
  let moviesId = req.params.moviesId;

  const query = { where: { id: moviesId, userId: req.user.id } };

  Movies.destroy(query)
      .then(() => res.status(200).json({ message: 'Movie Deleted' }))
      .catch((err) =>
          res
              .status(500)
              .json({ error: err, message: 'Error: Movie not deleted' })
      );
});

module.exports = router;