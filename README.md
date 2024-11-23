# Resume Data Extraction App

## Overview

This project is a MERN stack application designed to extract key information from resumes, such as **skills** and **years of experience**. The backend is powered by Node.js, with Python scripts running Spacy methods as child processes to analyze the resumes. The frontend is built with **React**, styled using **MUI** and **TailwindCSS**. **Mongoose** is used to interact with the MongoDB database for storing and retrieving data.

## AI Component - Data Extraction with Spacy

The core functionality of this application revolves around using **Spacy**, a popular Natural Language Processing (NLP) library, to extract relevant information from resumes. Python scripts are executed as child processes within the Node.js backend, processing the resume text and extracting:

- **Skills**: Key skills mentioned in the resume.
- **Years of Experience**: Extracted from the resume to give insights into the applicant's career length.

### Key Features

- **Resume Upload**: Users can upload their resumes (in PDF, DOCX, or plain text format).
- **AI-Powered Extraction**: Using Spacy, the app analyzes the resume's content and extracts the following data:
  - Skills (e.g., Python, React, JavaScript)
  - Years of experience (e.g., 3 years, 5+ years)
  - Additional metadata (e.g., job titles, company names)
- **Data Storage**: Resume data, along with extracted information, is stored in a MongoDB database using **Mongoose**.
- **Data Display**: Extracted data is displayed in a clean, user-friendly interface with the help of **MUI** and **TailwindCSS**.

### Technologies Used

- **Frontend**:
  - React.js (for building the user interface)
  - MUI (Material-UI for component library)
  - TailwindCSS (for styling)
  
- **Backend**:
  - Node.js with Express (for API and server management)
  - Mongoose (for MongoDB database interaction)
  - Child Process (for running Python scripts to handle NLP tasks)
  - Python (for processing and running Spacy methods)
  
- **AI**:
  - Spacy (for NLP tasks like named entity recognition and text processing)
  
- **Database**:
  - MongoDB (for storing resume data and extracted information)
  - Mongoose (for MongoDB schema and database interaction)

### Python Scripts

The backend executes Python scripts as child processes to interact with Spacy and perform the following steps:

1. **Text Extraction**: Extracts raw text from resumes (PDF/DOCX).
2. **Text Processing**: Uses Spacy's **Named Entity Recognition (NER)** and other NLP techniques to identify:
   - **Skills**: Identifying technical and soft skills mentioned in the resume.
   - **Experience**: Extracting years of experience based on contextual analysis.
   
#### Spacy Setup

1. Install dependencies:
   ```bash
   pip install spacy
   python -m spacy download en_core_web_sm


#### Node

1. Install dependencies:
   ```bash
   yarn 
   
