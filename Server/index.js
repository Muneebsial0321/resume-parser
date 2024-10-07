require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const cookie = require("cookie-parser")
const db = require('./db/db')
db()


// decalrations end

// middleware
app.use(express.json())
app.use(cookie())
app.use(cors({
    origin: process.env.FRONT_URL, // Your frontend URL
    credentials: true
}));
// middleware end

// routes  //
app.use('/user',require('./Routes/Users'))
app.use('/applied',require('./Routes/AppliedJobs'))
app.use('/jobs',require('./Routes/Jobs'))
app.use('/resumes',require('./Routes/Resumes'))
app.use('/pri',require('./Routes/private'))
app.use('/info',require('./Routes/Info'))

// routes end //

//server
app.listen(process.env.PORT,()=>{
    console.log("working",process.env.PORT)
})