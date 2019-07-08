// implement your API here
const express = require('express');
const server = express();
const db = require('./data/db');

server.use(express.json());

server.get('/api/users', (req, res) => {
    db.find()
        .then(user => {
            res.status(200).json({
                result: user
            })
        })
        .catch(error => {
            res.status(404).json({
                message: 'error retrieving users'
            })
        });
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
        .then(user => {
            if(user) {
                res.status(200).json({
                    result: user
                });
            } else {
                res.status(404).json({
                    message: 'User Id not found'
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'error retrieving the user'
            });
        });
});

server.post('/api/users', (req, res) => {
    const newUser = req.body;

    db.insert(newUser)
        .then(user => {
            res.status(201).json({
                result: user
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'error creating new user'
            })
        });
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then(deleted => {
            if(deleted) {
                res.status(204).end();
            } else {
                res.status(404).json({
                    message: 'User Id not found'
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'error deleting user'
            })
        });
});

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db.update(id, changes)
        .then(updated => {
            if(updated) {
                res.status(200).json({
                    result: updated
                });
            } else {
                res.status(404).json({
                    message: 'User Id not found'
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'error updating user'
            });
        });
});

server.listen(3000, () => {
    console.log('** Listening on port 3K **');
});