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
    name: req.body.tvshows.name,
    genre: req.body.tvshows.genre,
    length: req.body.tvshows.length,
    platform: req.body.tvshows.platform,
    isPublic: req.body.tvshows.isPublic,
    photoURL: req.body.tvshows.photoURL,
    userId: req.user.id,
  };
  Tvshows.create(tvshowsCheckout)
    .then((tvshows) => res.status(200).json(tvshows))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/get", validateSession, function
(req, res) {
  const query = {
    where: {userId: req.user.id},
    include: "user",
  };

  Tvshows.findAll(query)
  .then((Tvshows) => res.status(200).json
  (Tvshows))
  .catch((err) => res.status(500).json({ error: err}));
});
//update tvshows by id
router.put('/:tvshowsId', validateSession, (req, res) => {
  let tvshowsId = req.params.tvshowsId;
  const updateTvshows = {
    name: req.body.name,
    genre: req.body.genre,
    length: req.body.length,
    platform: req.body.platform,
    isPublic: req.body.isPublic,
    photoURL: req.body.photoURL,
    userId: req.user.id,
  };
  const query = { where: { id: tvshowsId, userId: req.user.id } };
  console.log(query);
  Tvshows.update(updateTvshows, query)
      .then((tvshows) =>
          res
              .status(200)
              .json({ tvshows, message: 'TV show successfully updated' })
      )
      .catch((err) =>
          res
              .status(500)
              .json({ error: err, message: 'Error: TV Show not updated' })
      );
});

//delete tv shows
router.delete('/:tvshowsId', validateSession, (req, res) => {
  let tvshowsId = req.params.tvshowsId;

  const query = { where: { id: tvshowsId, userId: req.user.id } };

  Tvshows.destroy(query)
      .then(() => res.status(200).json({ message: 'TV Show Deleted' }))
      .catch((err) =>
          res
              .status(500)
              .json({ error: err, message: 'Error: TV Show not deleted' })
      );
});
module.exports = router;