import express from 'express'
import {lessonService} from "../services/lessonService";

const router = express.Router()

router.get('/:courseId', async (req, res) => {
    const {courseId} = req.params;
    try {
       const lessons = await lessonService.getAllLessons(courseId)
        res.status(201).send(lessons)
    } catch {
        res.status(500).send({error: 'Server error'})
    }
})

router.post('/', async (req, res) => {
    const {
        courseId,
        title,
        description
    } = req.body;

    try {
        const lesson = await lessonService.createLesson({
            courseId,
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

    try {
        const lesson = await lessonService.getLesson(lessonId);
        if (lesson === null) {
            res.sendStatus(404).send({error: 'Not found'})
        } else {
            res.send(lesson)
        }
    } catch {
        res.status(500).send({error: 'Server error'})
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
