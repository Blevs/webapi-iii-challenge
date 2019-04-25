require('dotenv').config();
const express = require('express');
const usersRoutes = require('./users/usersRoutes.js');
const postsRoutes = require('./posts/postsRoutes.js');

const server = express();
server.use(express.json());

server.use('/api/users', usersRoutes);
server.use('/api/posts', postsRoutes);

const port = process.env.PORT || 4000;

server.listen(port, () => console.log(`API running on port ${port}`));
