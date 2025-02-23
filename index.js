import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import noteRoutes from './routes/noteRoutes.js';

const app = express();
app.use(express.json());
dotenv.config();
app.use(bodyParser.json());
app.use(cors());



const MONGO_URL=process.env.MONGO_URL;
const PORT=process.env.PORT || 3000;

mongoose.connect(MONGO_URL).then(()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

})
.catch((error) => console.log(error.message));


app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notes", noteRoutes);


