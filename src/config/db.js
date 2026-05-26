import mongoose from "mongoose";

export const DB_connect = async () => {
    try { 
      await mongoose.connect(process.env.MONGO_URI);
        console.log("Database is connected");
    } catch (error) {
        console.log("Database is connected");
    }
    
}