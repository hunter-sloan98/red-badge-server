const router = require('express').Router();
const { models } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const { validateSession, validateAdmin } = require('../middleware');
// const User = require('../models/user');

//*Test Endpoint
//*Successful on 09/24/2021
router.get('/test', (req, res) => {
  res.send('This is a test endpoint for character')
});

//*Create Enpoint
//TODO: This works as intended: Need to make it grab the current user id, it is in the table as null 09/24/2021
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

//*Display Characters
//*Functions as intended: Completed on 09/27/2021
router.get('/all', async (req, res) => {
  try {
    const allCharacters = await models.CharacterModel.findAll();
    res.status(200).json(allCharacters);
  } catch(err) {
    res.status(500).json ({
      error: `${err}`
    })
  }
});

//*Edit Endpoint
//TODO: This works as intended: Need to make it grab the current user id and the characterId 09/27/2021
router.put('/update/:characterId', validateSession, async (req, res) => {
  const { name, village, gender, jutsu, affiliation, bio } = req.body.character
  const characterId = req.params.characterId;
  const userId = req.user.id;

  const query = {
    where: {
      id: characterId,
      // creator: userId //! Does Not Update with this code in place LOOK INTO!!!
    }
  };

  const updatedCharacter = {
    name: name,
    village: village,
    gender: gender,
    jutsu: jutsu,
    affiliation: affiliation,
    bio: bio
  };

  try {
    const update = await models.CharacterModel.update(updatedCharacter, query);{}
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ error: `${err}`})
  }
});

//*Delete Character
//TODO: This works as intended: Need to make it grab the current user id and the characterId 09/27/2021
router.delete('/delete/:characterId', validateSession, async (req, res) => {
  const characterId = req.params.characterId;
  const userId = req.user.id;

  try {
    const query = {
      where: {
        id: characterId,
        // creator: userId
      }
    };
    await models.CharacterModel.destroy(query);
    res.status(200).json({
      message: "Character Deleted"
    })
  } catch (err) {
    res.status(500).json({
      error: `${err}`
    })
  }
});

module.exports = router;