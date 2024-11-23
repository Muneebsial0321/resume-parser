import { Button, Chip, CircularProgress, InputLabel, TextField } from "@mui/material"
import { useState } from "react"
import { API } from "../../enviroment"


const InputArray = [{ name: "title", label: "Title" },
{ name: "edu", label: "Education" },
{ name: "exp", label: "Experience (in years)" },
{ name: "salary", label: "MAX Salary in $" },
{ name: "desc", label: "Description" },
]

const PostJob = () => {
  const [state, setState] = useState({})
  const [loading, setLoading] = useState(false)
  const [skills, setSkills] = useState([])

  const enter = (e) => {
    if (e.key == 'Enter') {
      let val = new Set([...skills, e.target.value])
      setSkills(() => [...val])
      setState((prev) => {
        return {
          ...prev, skills
        }
      })
      e.target.value = ''
    }

  }

  const __onchange__ = (e) => {
    setState((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })

  }

  const __onSubmit__ = async() => {
      setLoading(()=>true)
      const req = await fetch(`${API}/jobs`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },body:JSON.stringify(state)
      })
      const data = await req.json()
      data.msg=='success'?setLoading(()=>false):""
 
    console.log({data})

  }

  const removeSkill = (n) => {
    let val = skills
    val = val.filter((e) => e !== n)
    setSkills(val)
    setState((prev) => {
      return {
        ...prev, skills
      }
    })
  }
  return (
    <>
      <div className="w-[100vw] py-[5rem] flex-col  flex justify-center items-center">


        {InputArray.map((e, i) => <div key={i} className="Input div my-3">
          {/* <InputLabel
            className="my-1 text-xl"
            htmlFor={e.name}>{e.label}</InputLabel> */}
          <TextField
            label={e.label}
            multiline
            minRows={e.name == 'desc' ? 10 : 1}
            name={e.name}
            id={e.name}
            onChange={__onchange__}
            className={`w-[30rem]`}
          />
        </div>)}

        <div className="SKills">


          <TextField
            label="Skills"
            id="skills"
            placeholder="Enter your skill and then press enter to add it"
            className="w-[30rem] my-4"
            onKeyDown={(e) => enter(e)}
          />
          <div className="w-[30rem] flex flex-row gap-2 flex-wrap bg-slate-100">

            {skills && skills.map((e, i) => (
              <Chip
                className="border-solid border-blue-500 border-[2px] px-2 py-4 w-min flex gap-4"
                key={i}
                label={e}
                variant="outlined"
                onDelete={() => removeSkill(e)} />
            ))
            }
          </div>
        </div>

        <Button
        className="w-[6rem]"
        variant="contained"
          onClick={__onSubmit__}

        >{!loading?"Button":<CircularProgress className="text-white" size={'20px'}/>}</Button>
        
      </div>
    </>


  )
}

export default PostJob