// implement your API here
const express = require('express');
const cors = require('cors');
const server = express();
const db = require('./data/db');

server.use(express.json());
server.use(cors());

server.get('/api/users', (req, res) => {
    db.find()
        .then(user => {
            res.status(200).json({
                result: user
            })
        })
        .catch(error => {
            res.status(404).json({
                message: 'The users information could not be retrieved.'
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
                    message: 'The user with the specified ID does not exist.'
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'The user information could not be retrieved.'
            });
        });
});

server.post('/api/users', (req, res) => {
    const newUser = req.body;

    if(newUser.name === undefined) {
        res.status(400).send({
            errorMessage: "Please provide name for the user." 
        });
    } else if(newUser.bio === undefined){
        res.status(400).send({
            errorMessage: "Please provide bio for the user." 
        });
    } else {
        db.insert(newUser)
            .then(user => {
                res.status(201).json({
                    result: user
                })
            })
            .catch(error => {  
                res.status(500).json({
                    message: 'There was an error while saving the user to the database',
                    error: error
                })
            });
    }
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then(deleted => {
            if(deleted) {
                res.status(204).end();
            } else {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist.'
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'The user could not be removed'
            })
        });
});

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    if(changes.name === undefined) {
        res.status(400).send({
            errorMessage: "Please provide name for the user." 
        });
    } else if(changes.bio === undefined){
        res.status(400).send({
            errorMessage: "Please provide bio for the user." 
        });
    } else {
        db.update(id, changes)
            .then(updated => {
                if(updated) {
                    res.status(200).json({
                        result: updated
                    });
                } else {
                    res.status(404).json({
                        message: 'The user with the specified ID does not exist.'
                    });
                }
            })
            .catch(error => {
                res.status(500).json({
                    message: 'The user information could not be modified.'
                });
            });
    }
});

server.listen(3000, () => {
    console.log('** Listening on port 3K **');
});