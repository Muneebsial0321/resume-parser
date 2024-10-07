const mongoose = require('mongoose')

const mongoUrl =  process.env.MONGODB_URI

const dbConnection = async()=>{
    let con = await mongoose.connect(mongoUrl)
    console.log("connection succesful")
   
}

module.exports = dbConnection

