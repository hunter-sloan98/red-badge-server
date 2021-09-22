const router = require('express').Router();
const { models } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize/lib/errors');

router.post('/signup', async (req, res) => {
  const { username, password } = req.body.user;
  try{
    let User = await UsserModel.create({
      username,
      password: bcrypt.hashSync(password, 10)
    });

    let token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, {expiresIn: '1d'});

    res.status(201).json({
      message: 'User Created',
      user: User,
      sessionToken: token
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError){
      res.status(409).json({
        message: "Try another username"
      });
    } else {
      res.status(500).json({
        message: "Signup failed"
      });
    }
  }
});

module.exports = router;