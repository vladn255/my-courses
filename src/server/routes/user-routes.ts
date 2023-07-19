import express from 'express';

const router = express.Router();

import {User} from '../models/userModel';

router.get('/api/user', (req, res) => {
    User.find()
        .then((users: User[]) => {res.send(users);
    })
        .catch(() => {
        res.status(500).send({error: 'Server error'});
    });
});

router.post('/api/user', (req, res) => {
    const user = new User({
        name: req.body.name
    });

    user.save()
        .then(() => {
            res.status(201).send(user);
        })
        .catch((err) => {
        res.status(500).send({error: 'Server error'})
    });
});

router.get('/api/user/:id', (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
                if (!user) res.sendStatus(404).send({error: 'Not found'});
                else res.send(user);
            })
            .catch(() => {
                res.status(500).send({error: 'Server error'});
            })
});

export default router;
