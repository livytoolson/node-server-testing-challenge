const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const CandyRouter = require('./candy-router');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use('/api/candy', CandyRouter);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'API is running' })
})

module.exports = server;