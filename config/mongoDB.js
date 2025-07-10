import mongoose from "mongoose";



const connectDB= async()=>{
    mongoose.connection.on('connected',()=>{
        console.log("db is connected");
    })

    await mongoose.connect(`${process.env.MONGO_URL}/Authentication`)

}


export default connectDB;