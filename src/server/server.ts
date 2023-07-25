import express, {type ErrorRequestHandler} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {connectToMongo} from './mongoose'
import {userRouter, courseRoutes, lessonRoutes, commentRoutes} from "./routes";

dotenv.config()
connectToMongo()

const PORT = process.env.PORT || 5050

const errorHandler: ErrorRequestHandler = (err, req, res) => {
    res.status(500).send('Uh oh! An unexpected error occurred.')
}

const app = express()

app.use(cors())

app.use(express.json())
app.use('/api/user', userRouter)
app.use('/api/course', courseRoutes)
app.use('/api/lesson', lessonRoutes)
app.use('/api/comment', commentRoutes)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
