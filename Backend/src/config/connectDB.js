import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGOURI}/${process.env.DB_NAME}`, {  
        });
        console.log("MongoDB connected successfully");
        
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
}

export default connectDB;