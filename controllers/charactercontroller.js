const router = require('express').Router();
const { models } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const validateSession = require('../middleware/validate-session')
// const User = require('../models/user');

//*Test Endpoint
//*Successful on 09/24/2021
router.get('/test', (req, res) => {
  res.send('This is a test endpoint for character')
});

//*Create Enpoint
//TODO: This works as intended: Need to make it grab the current user id, it is the table as null
router.post('/create', validateSession, async (req, res) => {
  const { name, village, gender, jutsu, affiliation, bio } = req.body.character
  const { id } = req.user.id;
  const newCharacter = {
    name,
    village,
    gender,
    jutsu,
    affiliation,
    bio,
    creator: id
  }
  try{
    const characterCreation = await models.CharacterModel.create(newCharacter);
    res.status(200).json(characterCreation);
  } catch (err) {
    res.status(500).json({
      error: `Error ${err}`
    });
    models.CharacterModel.create(newCharacter)
  }
});

module.exports = router;