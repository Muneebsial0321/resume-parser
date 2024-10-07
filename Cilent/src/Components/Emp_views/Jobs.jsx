import { Send } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { API } from '../../enviroment'
import { Link } from 'react-router-dom'



const Jobs = () => {
  const [state, setstate] = useState([1,2,3,5])
  
  
      const getAllJobs=async()=>{
          const req = await fetch(`${API}/jobs`)
          const data = await req.json()
          setstate(data)
      }
  useEffect(() => {
 getAllJobs()
  }, [])
    return (
      <div className='w-full h-full flex flex-col justify-center items-center'>
  
      { state && state.map((e,i)=>(<div key={i} className="flex w-[50rem] my-3 hover:shadow-2xl shadow-lg outline transition-all outline-gray-200 rounded-3xl flex-row items-center justify-between p-6">
              <h2 >{e.title}</h2>
              <p>${e.salary}</p>
              <Link to={'/view'} state={{data:e}}>
              <Button
               className='rounded-3xl'
               ><Send/></Button>
              </Link>
          </div>))}
      </div>
    )
  }

export default Jobs