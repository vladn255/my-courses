import express, {ErrorRequestHandler} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user-routes';
import {connectToMongo} from './mongoose';


dotenv.config();
connectToMongo();

const PORT = process.env.PORT || 5050;

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(500).send("Uh oh! An unexpected error occurred.")
};

const app = express();

app.use(cors());

app.use(express.json());
app.use(userRouter);

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
