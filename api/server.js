const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

server.get('/api/jokes/', (req, res) => {
    const requestOptions = {
      headers: { accept: 'application/json' },
    };
  
    axios
      .get('https://icanhazdadjoke.com/search', requestOptions)
      .then(response => {
        res.status(200).json(response.data.results);
      })
      .catch(err => {
        res.status(500).json({ message: 'Error Fetching Jokes', error: err });
      });
  });
  
module.exports = server;
