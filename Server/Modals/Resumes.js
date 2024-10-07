const mongoose = require('mongoose')

const resumesSchema = new mongoose.Schema({
userId:String,
title:String,
desc:String,
skills:[String],
exp:String,
edu:String,


},{ timestamps: true })

const Resumes = mongoose.model('Resumes',resumesSchema)
module.exports = Resumes