const express = require('express');
const postDb = require('../data/helpers/postDb.js');
const userDb = require('../data/helpers/userDb.js');

const router = express.Router();

// get users
router.get('/', (req, res) => {
  userDb.get()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({error: "The users information could not be retrieved."}));
});

// post user
router.post('/', (req, res) => {
  const user = req.body;
  if (user.name && user.name !== "") {
    userDb.insert(user)
      .then(user => res.status(201).json(user))
      .catch(err => res.status(500).json({error: "There was an error while saving the user."}))
    ;
  } else {
    res.status(400).json({error: "Please provide name for user"});
  }
});

// get user by id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  userDb.getById(id)
    .then(user => user
          ? res.status(200).json(user)
          : res.status(404).json({error: "The user with the specified ID does not exist."}))
    .catch(err => res.status(404).json({error: "There was an error retrieving the user information."}));
});

// get user by id posts
router.get('/:id/posts', (req, res) => {
  const id = req.params.id;
  userDb.getById(id)
    .then(user => user
          ? userDb.getUserPosts(id)
          .then(posts => res.status(200).json(posts))
          .catch(err => res.status(500).json({
            error: "There was an error retrieving the user's posts."
          }))
          : res.status(404).json({error: "The user with the specified ID does not exist."}))
    .catch(err => res.status(404).json({error: "There was an error retrieving the user information."}));
});
// post user by id post
// delete user by id post by id
// put user by id post by id

module.exports = router;
