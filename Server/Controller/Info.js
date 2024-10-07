const resumeParse= require('../Functions/ResumeDataExtraction')
const predictScore = require('../Functions/PredictScore');
const skillMatch = require('../Functions/SkillMatch');


const  dataExtractions = async(req,res)=>{
    resumeParse(req.body.resume)
    .then((jsonData) => {
        console.log('Received JSON data:', jsonData);
        res.json(jsonData)
    })
    .catch((error) => {
        console.error('Error:', error);
        res.json({error})
    });

}

const scoreCheck=async(req,res)=>{
    const  extracted_skills = ['python', 'machine learning', 'nlp', 'react', 'tensorflow','wordpress','exel', 'machine learning', 'nlp', 'react', 'tensorflow','html']
    const required_skills = ['python',]

    skillMatch(extracted_skills,required_skills)
    .then((jsonData) => {
        console.log('Received JSON data:', jsonData);
        res.json(jsonData)
    })
    .catch((error) => {
        console.error('Error:', error);
        res.json({error})
    });

    
}


const predictProfession=async(req,res)=>{ 
    predictScore(req.body.skills)
    .then((jsonData) => {
        console.log('Received JSON data:', jsonData);
        res.json(jsonData)
    })
    .catch((error) => {
        console.error('Error:', error);
        res.json({error})
    });

}

module.exports = {dataExtractions,predictProfession,scoreCheck}