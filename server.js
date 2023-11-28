const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes');

const app =express()
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://user:user@music.jlnup7x.mongodb.net/Music?retryWrites=true&w=majority");

app.use('/api', userRoutes);
app.listen(3000, ()=>{
    console.log("server is Running")
})