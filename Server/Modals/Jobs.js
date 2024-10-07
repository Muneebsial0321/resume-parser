const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
title:String,
desc:String,
skills:[String],
exp:String,
edu:String,
salary:Number,


},{ timestamps: true })

const Job = mongoose.model('Jobs',jobSchema)
module.exports = Job