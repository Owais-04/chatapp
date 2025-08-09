import mongoose from "mongoose";

//function to connect to the database
export const connectDB = async () => {
    try{
        mongoose.connection.on('connected', () => console.log('database connected'));
        console.log('Connected to MongoDB');
        await mongoose.connect(`${process.env.MONGO_URI || 'mongodb://localhost:27017/quickchat'}`);
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}