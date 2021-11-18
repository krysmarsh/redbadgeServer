let router = require("express").Router();
const { Music } = require("../models");
const validateSession = require("../middleware/validate-session");
const optionalValidateSession = require('../middleware/optional-validate-session');
//create get request in musiccontroller - include user information as well
const cloudinary = require("cloudinary").v2;
router.post("/test", function (req, res) {
  res.send("It worked");
});

router.post("/create", validateSession, function (req, res) {
  console.log(req.user.id);
  const musicCheckout = {
    category: req.body.music.category,
    artist: req.body.music.artist,
    genre: req.body.music.genre,
    songs: req.body.music.songs,
    album: req.body.music.album,
    isPublic: req.body.music.isPublic,
    photoURL: req.body.music.photoURL,
    userId: req.user.id,
  };
  Music.create(musicCheckout)
    .then((music) => res.status(200).json(music))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/get", validateSession, function
(req, res) {
  const query = {
    where: {userId: req.user.id},
    include: "user",
  };

  Music.findAll(query)
  .then((Music) => res.status(200).json
  (Music))
  .catch((err) => res.status(500).json({ error: err}));
});

//update music by id
router.put('/:musicId', validateSession, (req, res) => {
  let musicId = req.params.musicId;
  const updateMusic = {
    category: req.body.music.category,
    artist: req.body.music.artist,
    genre: req.body.music.genre,
    songs: req.body.music.songs,
    album: req.body.music.album,
    isPublic: req.body.music.isPublic,
    photoURL: req.body.music.photoURL,
    userId: req.user.id,
  };
  const query = { where: { id: musicId, userId: req.user.id } };
  console.log(query);
  Music.update(updateMusic, query)
      .then((music) =>
          res
              .status(200)
              .json({ music, message: 'Music successfully updated' })
      )
      .catch((err) =>
          res
              .status(500)
              .json({ error: err, message: 'Error: Music not updated' })
      );
});

// get all publicly available music
router.get('/', (req, res) => {
  Music.findAll({
      where: { isPublic: true },
     // order: sequelize.random(),
      limit: 100
  })
      .then((music) => res.status(200).json(music))
      .catch((err) =>
          res.status(500).json({
              error: err,
              message: 'Error: No music found',
          })
      );
});







//delete music
router.delete('/:musicId', validateSession, (req, res) => {
  let musicId = req.params.musicId;

  const query = { where: { id: musicId, userId: req.user.id } };

  Music.destroy(query)
      .then(() => res.status(200).json({ message: 'Music Deleted' }))
      .catch((err) =>
          res
              .status(500)
              .json({ error: err, message: 'Error: Music not deleted' })
      );
});

//upload photo

router.get("/photo/cloudsign", validateSession, async (req, res) => {
  try {
    const timestamp = Math.floor(new Date().getTime() / 1000).toString();
    const signature = cloudinary.utils.api_sign_request(
      { timestamp: timestamp, upload_preset: "iheartent_music_pic" },
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