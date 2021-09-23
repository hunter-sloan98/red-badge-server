const router = require('express').Router();
const { models } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize/lib/errors');

router.post('/signup', async (req, res) => {
  const { username, password } = req.body.user;
  try {
    await models.UserModel.create({
      username: username,
      password: bcrypt.hashSync(password, 10)
    })
      .then(
        user => {
          let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
          res.status(201).json({
            user: user,
            message: 'user created',
            sessionToken: `Bearer ${token}`
          });
        }
      )
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({
        message: 'Username already in use'
      });
    } else {
      res.status(500).json({
        error: `Failed to register user: ${err}`
      });
    };
  };
});


//*Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body.user;

  try {
    await models.UserModel.findOne({
      where: {
        username: username
      }
    })
      .then(
        user => {
          if (user) {
            bcrypt.compare(password, user.password, (err, matches) => {
              if (matches) {
                let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })
                res.json({
                  user: user,
                  message: 'Login Successful',
                  sessionToken: `Bearer ${token}`
                })
              } else {
                res.status(502).send({
                  error: 'Bad Gateway'
                })
              }
            })
          } else {
            res.status(500).send({
              error: 'Failed to Authenticate'
            })
          }
        }
      )
  } catch (err) {
    res.status(501).send({
      error: 'Not Supported'
    })
  }
})

module.exports = router;