// implement your API here
const express = require('express');
const server = express();
const db = require('./data/db');

server.use(express.json());

server.get('/api/users', (req, res) => {
    db.find()
        .then(data => {
            res.status(200).json({
                result: data
            })
        })
        .catch(error => {
            res.status(404).json({
                message: 'error retrieving data'
            })
        });
});

server.listen(3000, () => {
    console.log('** Listening on port 3K **');
});