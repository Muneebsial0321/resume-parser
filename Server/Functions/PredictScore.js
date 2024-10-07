const { spawn } = require('child_process');
const path = require('path');

const predictScore = (text) => { 
    return new Promise((resolve, reject) => {
        const scriptPath = path.join(__dirname, 'Scripts', 'predictScore.py');
        // console.log({scriptPath})
        const pythonProcess = spawn('python', [scriptPath, text]);
        // Listen for data output from the Python script
        pythonProcess.stdout.on('data', (data) => {
            try {
                // const jsonData = data.toString();
                const jsonData = JSON.parse(data.toString());
                resolve(jsonData); // Resolve the promise with parsed JSON data
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


module.exports = predictScore