import express from 'express'

import {IUser} from '../models/user.model'
import {userService} from "../services/userService";

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const users: IUser[] = await userService.getAllUsers();
        res.send(users)
    } catch {
        res.status(500).send({error: 'Server error'})
    }
})

router.post('/', async (req, res) => {
    const {name} = req.body;
    try {
        const user = await userService.createUser(name)
        res.status(201).send(user)
    } catch {
        res.status(500).send({error: 'Server error'})
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const user = await userService.getUser(id)
        if (user === null) {
            res.sendStatus(404).send({error: 'Not found'})
        } else {
            res.send(user)
        }
    } catch {
        res.status(500).send({error: 'Server error'})
    }
})

export default router
