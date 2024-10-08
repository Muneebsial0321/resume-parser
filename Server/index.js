require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const cookie = require("cookie-parser")
const db = require('./db/db')
const multer = require("multer")
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');
const cookieParser = require("cookie-parser")
db()


// decalrations end

// middleware
app.use(express.json())
app.use(cookieParser())
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

const upload = multer({ dest: 'uploads/' });

// Upload endpoint to handle file upload
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const filePath = path.join(__dirname, req.file.path);

    // Read the uploaded PDF file
    const dataBuffer = fs.readFileSync(filePath);

    // Extract text from the PDF using pdf-parse
    const data = await pdfParse(dataBuffer);

    // Send the extracted text back to the client
    res.json({ text: data.text });
  } catch (error) {
    console.error('Error processing PDF:', error);
    res.status(500).send('Error processing file');
  } finally {
    // Optionally, clean up the file after processing
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path); // Delete the file
    }
  }
});


//server
app.listen(process.env.PORT,()=>{
    console.log("working",process.env.PORT)
})