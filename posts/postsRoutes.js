const express = require('express');
const postDb = require('../data/helpers/postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
  postDb.get()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.staus(500).json({error: "The posts information could not be retrieved."}));
});


// post post

// get post by id
// put post by id
// delete post by id


module.exports = router;
