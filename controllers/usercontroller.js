const router = require('express').Router();
const { models } = require('../models');
// const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const { validateSession, validateAdmin } = require('../middleware')
const User = require('../models/user');

//*Signup
router.post('/signup',async (req, res) => {
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

//*Show user info
//TODO: This works as intended: Need to make it grab the current user id, for now it has to be entered manually
//?Credit for this code format goes to Lars Blide on youtube. Changes were made to fit this code but his rough outline was insturmental
// router.get('/myprofile/:id',  async (req, res) => {
//   User.findByPk(req.params.id)
//   .then(userFound => {
//     if (!userFound) { return res.status(404).end(); }
//     return res.status(200).json(userFound);
//   })
//   .catch( err => next(err));
// })

//!Other Versions
//*This one does display all users in postman: So slight success!!
// router.get('/myprofile/:id', async (req, res) => {
//   let { id } = req.params.id;
//   try{
//     const myProfile = await models.UserModel.findAll();
//     res.status(200).json(myProfile);
//   } catch(err) {
//     res.status(500).json({
//       error: `${err}`
//     })
//   }
// })
//*Orignal code: Getting an undefined for the id 
router.get('/myprofile/:id', async (req, res) => {
  // let { id } = req.params.id;
  const userId = req.params.id
  try{
    const myProfile = await models.UserModel.findOne({
      where: {
        id: userId
      }
    });
    res.status(200).json(myProfile);
  } catch(err) {
    res.status(500).json({
      error: `${err}`
    })
  }
})

//*Edit user
//TODO: This works as intended: Need to make it grab the current user id, for now it has to be entered manually
router.put('/myprofile/update/:id', validateSession, async (req, res) => {
  const { name, birthyear, email, bio } = req.body.user;
  const userId = req.params.id
  
  const query = {
    where: {
      id: userId
    }
  };

  const updatedUser = {
    name: name,
    birthyear: birthyear,
    email: email,
    bio: bio
  };

  try{
    const update = await models.UserModel.update(updatedUser, query);{}
    res.status(200).json(update);
  } catch(err) {
    res.status(500).json({
      error: `Error: ${err} `
    })
  }
});

//*Delete User
//TODO: This works as intended: Need to make it grab the current user id, for now it has to be entered manually
router.delete('/myprofile/delete/:id', validateSession, async (req, res) => {
  const userId = req.params.id;

  try{
    const query = {
      where: {
        id: userId
      }
    };

    await models.UserModel.destroy(query);
    res.status(200).json({
      message: "User Profile Deleted"
    })
  } catch(err) {
    res.status(500).json({
      error: `Error: ${err}`
    })
  }
});


module.exports = router;