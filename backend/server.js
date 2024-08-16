//const express = require('express);

//to use this method change the package.json - add - "type": "module"
import express from 'express';
import dotenv from "dotenv"; // this is to access the file .env to get the databse uri
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";

dotenv.config(); 

const app= express();
app.use(express.json()); //allows us to accept json data in the req.body

const PORT = process.env.PORT || 5000;

app.use("/api/products",productRoutes);

//to automatically show the chnages - chnage the package.json
//remove test attribute and add - "dev":"nodemon backend/server.js"
//install npm i nodoman -D
//to run the backend code- npm run dev

console.log(process.env.MONGO_URI);

app.listen(PORT, ()=>{
    connectDB();
    console.log("server started at http://localhost:"+PORT);
})

