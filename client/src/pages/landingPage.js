import { useEffect } from "react"
import { NavigationBar } from "../components/NavBar"
import { getInstructorSession, getStudentSession } from "../api/apiColections"
import { useNavigate } from "react-router-dom"

export const LandingPage = () =>{
    const navigate = useNavigate()
    //This is for convinience
    //If sessions exist, redirect user to the homepage
    useEffect(()=>{
        getStudentSession()
            .then((result)=>{
                if(result.studentinfo!==null && typeof(result.studentinfo)!=='undefined'){
                    navigate('/studenthomepage')
                    return
                }
                else{
                    getInstructorSession()
                    .then((r)=>{
                        if(r.instructorinfo!==null && typeof(r.instructorinfo)!=='undefined'){
                            navigate('/instructorhomepage')
                            return
                        }
                    })
                }
                
            })
    },[])
    return(
        <div>
            <NavigationBar></NavigationBar>
        </div>
    )
}