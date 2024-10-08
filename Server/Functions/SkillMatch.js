const { spawn } = require('child_process');
const path = require('path');

const skillMatch = (eskills,rskills) => { 
    return new Promise((resolve, reject) => {
        const scriptPath = path.join(__dirname, 'Scripts', 'SkillMatch.py');
        const pythonProcess = spawn('python', [scriptPath, eskills,rskills]);
        pythonProcess.stdout.on('data', (data) => {
            try {
                const jsonData = JSON.parse(data.toString());
                // const jsonData = data.toString();
                resolve(jsonData);
            } catch (error) {
                reject(`Error parsing JSON: ${error}`);
            }
        });
        pythonProcess.stderr.on('data', (data) => {
            reject(`Python error: ${data.toString()}`);
        });
        pythonProcess.on('exit', (code) => {
            if (code !== 0) {
                reject(`Python script exited with code ${code}`);
            }
        });
    });
};


// const   = ['python', 'machine learning', 'nlp', 'react', 'tensorflow','wordpress','exel', 'machine learning', 'nlp', 'react', 'tensorflow','html']
const  required_skills = ['python', 'machine learning', 'nlp', 'react', 'tensorflow','wordpress','exel', 'machine learning', 'nlp', 'react', 'tensorflow','html']
// const  = ['python',]
const extracted_skills = ['q']


skillMatch(extracted_skills,required_skills)
    .then((jsonData) => {
        console.log('Received JSON data:', jsonData);
        
    })
    .catch((error) => {
        console.error('Error:', error);
    });

module.exports = skillMatch