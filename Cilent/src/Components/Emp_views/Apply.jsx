import { Button } from "@mui/material";
import { fromJSON } from "postcss";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";




const Apply = () => {
  const loc=useLocation()  
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please select a file!');
      return;
    }

    useEffect(()=>{
      console.log("logging data")
      console.log(loc.state)
    },[loc.state  ])

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Send the file to the backend (Node.js server)
      const req = await fetch(`http://localhost:5000/resumes/${jobId}`,{
        method:'POST',
        credentials:"include",
        headers:{
          "Content-type":"multipart/form-data"
        },
        body:formData
      })
      const data = await req.json()
      console.log({data})
      alert('File uploaded successfully!');
      console.log('Extracted text:', req);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file.');
    }
  };

  return (
    <div>
      <h2>Upload CV</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <Button type="submit">Upload</Button>
        
      </form>
    </div>
  );
};

export default Apply;
