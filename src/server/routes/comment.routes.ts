import express from 'express'
import {commentService} from "../services/commentService";

const router = express.Router()


router.post('/', async (req, res) => {
    const {
        lessonId,
        text
    } = req.body;

    try {
        const comment = commentService.createComment({
            lessonId,
            text,
        });
        res.status(201).send(comment)
    } catch {
        res.status(500).send({error: 'Server error'})
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const comment = await commentService.deleteComment(id)
        if (comment === null) {
            res.sendStatus(404).send({error: 'Not found'})
        } else {
            res.send(comment)
        }
    } catch {
        res.status(500).send({error: 'Server error'})
    }
})



export default router
