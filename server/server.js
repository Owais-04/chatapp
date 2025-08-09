import express from 'express';
import "dotenv/config";
import cors from 'cors';
import http from 'http';
import {connectDB} from './lib/db.js';

//create express app and http server
const app=express();
const server=http.createServer(app);

//middleware setup
//cors url to connect 
app.use(express.json({limit:"4mb"}));
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use("/api/status",(req,res)=>res.send("Server is running"));

//connect to the database
await connectDB();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});