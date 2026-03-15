import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        let uri = process.env.MONGOURI;
        const dbName = process.env.DB_NAME;
        
        // Properly insert database name into URI if it has query parameters
        if (uri.includes('?')) {
            const [base, query] = uri.split('?');
            uri = base.endsWith('/') ? `${base}${dbName}?${query}` : `${base}/${dbName}?${query}`;
        } else {
            uri = uri.endsWith('/') ? `${uri}${dbName}` : `${uri}/${dbName}`;
        }

        await mongoose.connect(uri);
        console.log("MongoDB connected successfully");
        
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
}

export default connectDB;