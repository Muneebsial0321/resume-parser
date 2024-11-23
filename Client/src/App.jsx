import { Button } from "@mui/material"
import Auth from "./Components/Auth/Auth"
import Navbar from "./Components/UI/Navbar"
import PostJob from "./Components/HR_views/PostJob"
import ViewJob from "./Components/Emp_views/ViewJob"
import Jobs from "./Components/Emp_views/Jobs"
import { Routes,Route } from "react-router-dom"
import Apply from "./Components/Emp_views/Apply"


function App() {


  return (
    <>
    <Navbar/>
    {/* <PDFTextExtractor/> */}
    <Routes>
      <Route path={'/auth'} element={<Auth/>}/>
      <Route path={'/postjob'} element={<PostJob/>}/>
      <Route path={'/jobs'} element={<Jobs/>}/>
      <Route path={'/view'} element={<ViewJob/>}/>
      <Route path={'/apply'} element={<Apply/>}/>
   
    </Routes>
    {/* <PostJob/>  */}
    {/* <Jobs/> */}
    {/* <ViewJob/> */}
   {/* <Auth/> */}
    </>
  )
}

export default App
