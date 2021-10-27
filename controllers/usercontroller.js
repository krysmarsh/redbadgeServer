const router = require('express').Router();
//const { Router } = require("express");
const { User } = require("../models");
//const User = require('../db')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const validateSession = require("../middleware/validate-session");

/* **********USER REGISTRATION******
************************ */

router.post("/signup", function  (req, res) {
    User.create({
      email: req.body.user.email,
      username: req.body.user.username,
      passwordhash: bcrypt.hashSync(req.body.user.passwordhash, 13),
      roles: req.body.user.roles,
    })
      .then(function createSuccess(user) {
        let token = jwt.sign({ id: user.id, username: user.username }, "test", {
          expiresIn: 60 * 60 * 24,
        });
        res.json({
          user: user,
          message: "User Successfully Created",
          sessionToken: token,
        });
      })
      .catch(function (err) {
        res.status(500).json({ error: err });
      });
  });
  
  router.post("/login", function (req, res) {
    User.findOne({
      where: {
        firstName: req.body.firstName,
      },
    })
      .then(function loginSuccess(user) {
        if (user) {
          bcrypt.compare(req.body.passwordhash, user.passwordhash, function (
            err,
            matches
          ) {
            if (matches) {
              let token = jwt.sign(
                { id: user.id, username: user.username },
                "test",
                {
                  expiresIn: 60 * 60 * 24,
                }
              );
              res.status(200).json({
                user: user,
                message: "User Successfully Logged in!",
                sessionToken: token,
              });
            } else {
              res.status(502).send({ error: "Login Failed" });
            }
          });
        } else {
          res.status(500).json({ error: "User does not exist" });
        }
      })
      .catch((err) => res.status(500).json({ error: err }));
  });
module.exports = router;