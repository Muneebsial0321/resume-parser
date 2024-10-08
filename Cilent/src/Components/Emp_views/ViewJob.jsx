import { Send } from '@mui/icons-material'
import { Button, Chip } from '@mui/material'
import { useEffect, useState } from 'react'
import { API } from '../../enviroment'
import { Link, useLocation } from 'react-router-dom'


const ViewJob = () => {
    const loc=useLocation()
    const d=loc.state.data    
    const [state, setstate] = useState([])

    useEffect(() => {
        // console.log({d})
        setstate(d)
    }, [loc.state.data])

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
  
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        // Send the file to the backend (Node.js server)
        const req = await fetch(`http://localhost:5000/resumes/${state._id}`,{
          method:'POST',
          credentials:"include",
          body:formData
        })
        const data = await req.json()
        console.log({data})
        console.log({cookies:document.cookie})
        alert('File uploaded successfully!');
      } catch (error) {
        console.log(error)
        console.error('Error uploading file:', error);
        alert('Failed to upload file.');
      }
    };
    return (
        <>

        <div className='m-auto w-[90%] py-[3rem] flex justify-center items-center'>
            <div className="w-1/2 flex flex-col my-6 px-10">
                <p className='text-lg '>Title :</p>
                <h2 className='text-3xl my-6'>{state && state.title}</h2>
                <p className='text-lg '>Education :</p>
                <p className='text-2xl my-6'>{state && state.edu}</p>
                <p className='text-lg '>Description :</p>
                <p className='text-lg text-gray-500 my-6'>{state && state.desc}</p>

            </div>
            <div className="w-1/2 flex flex-col my-6 pl-20 ">
                <p className='font-mono font-bold my-6  text-4xl'>${state && state.salary}</p>
                <p className='text-lg my-6'>Skills :</p>
                <div className="flex flex-row gap-2 flex-wrap w-[20rem]">

                {state.skills?state.skills.map((e, i) => (
                <Chip
                className="border-solid border-blue-500 border-[2px] px-2 py-4 w-min flex gap-4"
                key={i}
                label={e}
                variant="outlined"
                />
            )):''
            }
            </div>
            <p className='text-lg my-4'>Experience :</p>
                <p>{state && state.exp}</p>
       
            </div>
        </div>
        <div className="upload CV flex justify-center items-center flex-col gap-6">
        <div>
      <h2>Upload CV</h2>
      <form >
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <Button onClick={handleSubmit} >Upload</Button>
        
      </form>
    </div>
        </div>
            {/* <center><Link state={{id:state}} to='/apply'><Button className='mb-10'>Apply now</Button></Link></center> */}
        </>
    )
}

export default ViewJob