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
                if(result.status){
                    navigate('/studenthomepage')
                    return
                }
                getInstructorSession()
                    .then((r)=>{
                        if(r.status){
                            navigate('/instructorhomepage')
                            return
                        }
                    })
            })
    },[])
    return(
        <div>
            <NavigationBar></NavigationBar>
        </div>
    )
}