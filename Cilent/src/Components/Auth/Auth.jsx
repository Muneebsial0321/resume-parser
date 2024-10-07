import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Button, IconButton, InputAdornment, TextField } from "@mui/material"
import { useState } from "react"



const Auth = () => {
    const [state, setstate] = useState({})
    const [auth, setauth] = useState('login')
    const [passState, setPassState] = useState('password')
    const _onchange_=(e)=>{
        setstate((prev)=>{
            return {
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }
    const _onSubmit_=()=>{
        console.log({state})
    }
    const _passToggle_=()=>{
        console.log({passState})
        passState=='password'?setPassState('text'):setPassState('password')
    }
  return (
    <>
    <div className="h-[100vh] gap-10 w-[100vw] flex flex-col justify-center items-center">


        {/* auth state button */}
        <div className="w-[25rem] gap-2 py-6 flex justify-center">
            <Button variant={auth=='login'?'contained':'outlined'} onClick={()=>setauth('login')} className="text-xl py-2 px-7">Login</Button>
            <Button variant={auth=='signup'?'contained':'outlined'} onClick={()=>setauth('signup')} className="text-xl py-2 px-7">Sign Up</Button>
        </div>
        {/* email */}
        <TextField
         onChange={_onchange_}
         label="Email"
         name="email"
         variant="outlined"
         placeholder="some@gmail.com"
         className="w-[25rem] text-4xl"
         size="medium"
         ad   
        />
        {/* password */}
        <TextField
         onChange={_onchange_}
         type={passState}
         name="password"
         label="Password"
         variant="outlined"
         placeholder="************"
         className="w-[25rem] text-4xl"
         size="medium"
         slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">
              <IconButton
              onClick={_passToggle_}
               className="cursor-pointer">
              {passState!='password'?<Visibility/>:<VisibilityOff/>}
              </IconButton>
              </InputAdornment>,
            },
          }}   
        />
        
        {/* button */}
        <Button
        onClick={_onSubmit_}
        variant="contained"
        className="py-2 w-[25rem] text-2xl normal-case"
        >{auth=='login'?'Login':'Sign up'}</Button>
        <p className="text-base mt-7 font-bold text-gray-500" ><i>Powered by SuperAuth</i></p>
    </div>
    </>
  )
}

export default Auth