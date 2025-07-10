import express from 'express'
import dotenv from 'dotenv/config'
import connectDB from './config/mongoDB.js';
import authRoutes from './routes/auth.js'
import postRoutes from './routes/post.js'




const app= express();
app.use(express.json())
const port = process.env.PORT|| 4000
connectDB();

app.use("/api/user",authRoutes )
app.use("/api/post",postRoutes)

app.listen(port,()=>{
    console.log(`server is the running on the port${port}`);
})

