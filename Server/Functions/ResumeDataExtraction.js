const { spawn } = require('child_process');
const path = require('path');


const resume = `Profile : 
Muneeb ur Rehman Sial 
MERN stack Developer 
msial0321@gmail.com | +923266186598 | https://github.com/muneebsial0321 
I have a proven track record of successfully completing various self-initiated React and MERN 
Stack projects, demonstrating not only my technical abilities and creative problem-solving skills but 
also my adaptability and capacity for rapid learning. In this era of AI, I am always eager for 
learning and improvement,with over 10 years plus experience consistently seeking new challenges to further develop my skill set. 
Education : 
degree of BsCS
Bachelor of Computer Science, Islamia University of Bahawalpur  (Expected June  2026) 
Skills : 
 JavaScript 
 React JS 
 Tailwind CSS 
 Material UI 
Projects : 
 Node JS 
 Express JS 
 MongoDB 
 MySQL 
 Git & Github 
 Jsonwebtoken 
 Python (Int.) 
 Java(Int.)
 MERN Authentication system :   
A complete MERN stack authentication system based on jsonwebtoken and cookies. Show casing 
my ability to handle protected routes, user authentication and REST API calls in a typical MERN 
stack website. Link to the project https://github.com/muneebsial0321/auth-template 
Ecommerce Database :  
It was an academic MySQL project in which I had to make a complete database design of an 
Ecommerce store. The database was very well normalized.  
Jenni.ai UI clone :    
Do checkout my Github repo that shows case my dozens of frontend React projects like Jenni.ai 
UI clone and Scavy project and other dozens of pure HTML CSS JS Projects are there on my 
Github repository. Link to the Jenni project https://muneebsial0321.github.io/jenni 
Work experience : 
Upwork and Freelancing: 
I have a very simple amount of freelancing experience. Like converting Figma designs to HTML 
CSS and JS website. Some Other Work including maintaining a website, converting email 
templates to MJML skeleton, making Wordpress websites etc.`




const resumeParse = (text) => {
    return new Promise((resolve, reject) => {
        const scriptPath = path.join(__dirname, 'Scripts', 'Utils.py');
        console.log({scriptPath})
        const pythonProcess = spawn('python', [scriptPath, text]);
        // const pythonProcess = spawn('python', ['/Scripts/Utils.py', text]);

        // Listen for data output from the Python script
        pythonProcess.stdout.on('data', (data) => {
            try {
                const jsonData = JSON.parse(data.toString());
                resolve(jsonData); // Resolve the promise with parsed JSON data
            } catch (error) {
                reject(`Error parsing JSON: ${error}`);
            }
        });

        // Listen for errors
        pythonProcess.stderr.on('data', (data) => {
            reject(`Python error: ${data.toString()}`);
        });

        // Handle process exit
        pythonProcess.on('exit', (code) => {
            if (code !== 0) {
                reject(`Python script exited with code ${code}`);
            }
        });
    });
};



// Using the resumeParse function
// resumeParse(resume)
//     .then((jsonData) => {
//         console.log('Received JSON data:', jsonData);
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });

module.exports = resumeParse