import express from 'express'
import {lessonService} from "../services/lessonService";

const router = express.Router()

router.get('/', async (req, res) => {
    const {courseId} = req.query;

    if (courseId) {
        try {
            const lessons = await lessonService.getAllLessons(courseId.toString())
            res.status(201).send(lessons)
        } catch {
            res.status(500).send({error: 'Server error'})
        }
    } else {
        res.sendStatus(404).send({error: 'Not found'})
    }
})

router.post('/', async (req, res) => {
    const {
        courseTitle,
        title,
        description
    } = req.body;

    try {
        const lesson = await lessonService.createLesson({
            courseTitle,
            title,
            description
        })
        res.status(201).send(lesson)
    } catch {
        res.status(500).send({error: 'Server error'})
    }
})

router.get('/:lessonId', async (req, res) => {
    const {lessonId} = req.params;
    if (lessonId) {
        try {
            const lesson = await lessonService.getLesson(lessonId.toString());
            if (lesson === null) {
                res.sendStatus(404).send({error: 'Not found'})
            } else {
                res.send(lesson)
            }
        } catch {
            res.status(500).send({error: 'Server error'})
        }
    } else {
        res.sendStatus(404).send({error: 'Not found'})
    }
})

router.get('/:lessonId/delete', async (req, res) => {
    const {lessonId} = req.params;

    try {
        const lesson = await lessonService.deleteLesson(lessonId)
        if (lesson === null) {
            res.sendStatus(404).send({error: 'Not found'})
        } else {
            res.send(lesson)
        }
    } catch {
        res.status(500).send({error: 'Server error'})
    }
})

export default router
