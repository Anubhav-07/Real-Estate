import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js';
dotenv.config();


mongoose.connect("mongodb+srv://User_1:7WNG8MrcnZUeRpXL@mongotube.fkafwkz.mongodb.net/estate?retryWrites=true&w=majority&appName=MongoTube")
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error(err);
    });

const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = 3000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use('/api/listing',listingRouter);
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })

})