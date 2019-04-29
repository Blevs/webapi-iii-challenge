// code away!
const express = require('express');
const usersRoutes = require('./users/usersRoutes.js');
const postsRoutes = require('./posts/postsRoutes.js');

const server = express();
server.use(express.json());

server.use('/api/users', usersRoutes);
server.use('/api/posts', postsRoutes);

server.listen(4000, () => console.log('API running on port 4000'));
