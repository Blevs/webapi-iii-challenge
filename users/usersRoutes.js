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

// get user by id posts
// post user by id post
// delete user by id post by id
// put user by id post by id

module.exports = router;
