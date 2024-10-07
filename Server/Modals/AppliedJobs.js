const mongoose = require('mongoose')

const applied = new mongoose.Schema({
jobId:String,
resumeId:String,
},{ timestamps: true })

const appliedJob = mongoose.model('AppliedJobs',applied)
module.exports = appliedJob