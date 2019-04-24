const express = require('express');
const postDb = require('../data/helpers/postDb.js');
const userDb = require('../data/helpers/userDb.js');

const router = express.Router();

router.get('/', (req, res) => {
  postDb.get()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.staus(500).json({error: "The posts information could not be retrieved."}));
});

// post post
router.post('/', (req, res) => {
  const post = req.body;
  if (post.text && post.user_id) {
    userDb.getById(post.user_id)
      .then(user => user
            ? postDb.insert(post)
            .then(({id}) =>
                  postDb.getById(id)
                  .then(post => post
                        ? res.status(201).json(post)
                        : (void 0).throwError())
                  .catch(err => res.status(500).json({
                    error: "The post was created, but could not be retrieved.",
                    id: id
                  })))
            .catch(err => console.log(err) || res.status(500).json({
              error: "There was an error while saving the post to the database."
            }))
            : res.status(404).json({error: "The user_id was not valid."}))
      .catch(err => res.status(500).json({error: "There was an error while verifying the user_id."}));
  } else {
    res.status(400).json({error: "Please provide text and user_id for the post."});
  }
});

// get post by id
router.get('/:id', (req, res) => {
  postDb.getById(req.params.id)
    .then((post) => post
          ? res.status(201).json(post)
          : res.status(404).json({error: "The post with the specified ID does not exist."}))
    .catch(err => res.status(500).json({error: "The post information could not be retrieved."}));
});

// delete post by id
router.delete('/:id', (req, res) => {
  postDb.getById(req.params.id)
    .then((post) => post
          ? postDb.remove(req.params.id)
          .then(deleted => deleted
                ? res.status(200).json(post)
                : (void 0).throwError())
          .catch(err => res.status(500).json({error: "The post could not be removed."}))
          : res.status(404).json({error: "The post with the specified ID does not exist."}))
    .catch(err => res.status(500).json({error: "The post information could not be retrieved."}));
});

// put post by id


module.exports = router;
