const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const clearRes = data => {
  //destructuramos el objeto "data" y retornamos un nuevo objeto unicamente con
  // los datos requerido para nuestro "desarrollador = dev"
  const { password, __v, createdAt, updatedAt, ...cleanedData } = data
  // {key:"value"}
  return cleanedData
}

router.post("/login", passport.authenticate("local", (error, user, errDetails) => {
  if (error) return res.status(500).json({ message: errDetails })
  if (!user) return res.status(401).json({ message: "Unauthorized" })

  req.login(user, error => {
    if (error) return res.status(500).json({ message: errDetails })
    const usr = clearRes(user.toObject())
    res.status(200).json(usr)
  })
})(req, res, next));


router.post("/signup", (req, res, next) => {
  const { email, password,...resUser } = req.body
  if (email === "" || password === "") {
    res.status(401).json({ message: "Indicate username and password" });
    return;
  }

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.status(402).json({ message: "The email already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      email,
      password: hashPass,
      ...resUser
    });

    newUser.save()
    .then(() => {
      res.status(200).json({ message: "Congrats. User created" });
    })
    .catch(err => {
      res.status(401).json({ message: "Something went wrong" });
    })
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({message: "Logged Out"})
});

module.exports = router;
