const router = require('express').Router();
const { models } = require('../models');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { UniqueConstraintError } = require('sequelize/lib/errors');
const { validateSession, validateAdmin } = require('../middleware');
// const User = require('../models/user');


//*Test Endpoint
//*Successful on 09/27/2021
router.get('/test', async (req, res) => {
  res.send('This is a test of the blog endpoint')
});

//*Create Endpoint
//TODO: This works as intended: Need to make it grab the current user id, it is in the table as null 09/27/2021
router.post('/create', validateSession, async (req, res) => {
  const { title, date, episode, rating, post, reccomend } = req.body.blog
  const userId = req.user.username
  const blogPost = {
    title,
    date,
    episode,
    rating,
    post,
    reccomend,
    creator: userId
  }
  try {
    const newBlog = await models.BlogModel.create(blogPost);
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(500).json({
      error: `${err}`
    });
    models.BlogModel.create(blogPost)
  }
});

//*Display All Blogs Endpoint
//TODO: This works as intended: Completed on 09/27/2021
router.get('/all',  async (req, res) => {
  try{
    const allBlogs = await models.BlogModel.findAll();
    res.status(200).json(allBlogs);
  } catch (err) {
    res.status(500).json({
      error: `${err}`
    })
  }
});

//*Display My Blogs
//TODO: Tables DO NOT HAVE values for creators, once fixed function should work
router.get('/mine/:userId', validateSession, async (req, res) => {
  const userId = req.params.userId;
  try{
    const userBlogs = await models.BlogModel.findAll({
      where: {
        creator: userId
      }
    });
    res.status(200).json(userBlogs);
  } catch (err) {
    res.status(500).json({
      error: `${err}`
    })
  }
});

//*Edit Endpoint
//TODO: This works as intended: Need to make it grab the current user id and the blogId 09/27/2021
router.put('/update/:id', validateSession, async (req, res) => {
  const { title, date, episode, rating, post, reccomend } = req.body.blog;
  const blogId = req.params.id
  const userId = req.user.id;
  
  const query = {
    where: {
      id: blogId,
      creator: userId 
    }
  };

  const updatedBlog = {
    title: title,
    date: date,
    episode: episode,
    rating: rating,
    post: post,
    reccomend: reccomend,
  };

  try {
    const update = await models.BlogModel.update(updatedBlog, query);{}
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({
      error: `${err}`
    })
  }
});

//*Delete Endpoint
//TODO: This works as intended: Need to make it grab the current user id and the blogId 09/27/2021
router.delete('/delete/:blogId', validateSession, async (req, res) => {
  const blogId = req.params.blogId;
  const userId = req.user.id;

  try {
    const query = {
      where: {
        id: blogId,
        // creator: userId
      }
    };

    await models.BlogModel.destroy(query);
    res.status(200).json({
      message: "Blog Deleted"
    })
  } catch (err) {
    res.status(500).json({
      error: `${err}`
    })
  }
});

module.exports = router;