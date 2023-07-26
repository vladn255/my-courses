import express from 'express'
import {courseService} from "../services/courseService";

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const courses = await courseService.getAllCourses();
        res.send(courses)
    } catch {
        res.status(500).send({error: 'Server error'})
    }
})

router.post('/', async (req, res) => {
    const {
        authorName,
        title,
        description
    } = req.body;

    try {
        const course = await courseService.createCourse({
            authorName,
            title,
            description
        })
        res.status(201).send(course)
    } catch {
        res.status(500).send({error: 'Server error'})
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const course = await courseService.getCourse(id);
        if (course === null) {
            res.sendStatus(404).send({error: 'Not found'})
        } else {
            res.send(course)
        }
    } catch {
        res.status(500).send({error: 'Server error'})
    }
})

router.get('/:id/delete', async (req, res) => {
    const {id} = req.params;

    try {
        const course = await courseService.deleteCourse(id)
        if (course === null) {
            res.sendStatus(404).send({error: 'Not found'})
        } else {
            res.send(course)
        }
    } catch {
        res.status(500).send({error: 'Server error'})
    }
})

export default router
