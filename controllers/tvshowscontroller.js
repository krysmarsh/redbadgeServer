let router = require("express").Router();
const { Tvshows } = require("../models");
const validateSession = require("../middleware/validate-session");
const optionalValidateSession = require('../middleware/optional-validate-session');
const cloudinary = require("cloudinary").v2;
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
    name: req.body.tvshows.name,
    genre: req.body.tvshows.genre,
    length: req.body.tvshows.length,
    platform: req.body.tvshows.platform,
    isPublic: req.body.tvshows.isPublic,
    photoURL: req.body.tvshows.photoURL,
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

//upload photo

router.get("/photo/cloudsign", validateSession, async (req, res) => {
  try {
    const timestamp = Math.floor(new Date().getTime() / 1000).toString();
    const signature = cloudinary.utils.api_sign_request(
      { timestamp: timestamp, upload_preset: "iheartent_tvshows_pic" },
      process.env.CLOUDINARY_SECRET
    );

    res.status(200).json({ signature, timestamp });
  } catch (err) {
    res.status(500).json({
      message: "failed to sign",
    });
  }
});

module.exports = router;