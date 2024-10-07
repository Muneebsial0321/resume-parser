import { Send } from '@mui/icons-material'
import { Button, Chip } from '@mui/material'
import { useEffect, useState } from 'react'
import { API } from '../../enviroment'
import { useLocation } from 'react-router-dom'


const ViewJob = () => {
    const loc=useLocation()
    const d=loc.state.data    
    const [state, setstate] = useState([])

    useEffect(() => {
        console.log({d})
        setstate(d)
    }, [loc.state.data])
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
            <center><Button className='mb-10'>Apply now</Button></center>
        </>
    )
}

export default ViewJob