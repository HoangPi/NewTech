import { useEffect, useState } from 'react'
import {InstructorNavBar} from '../../components/instructorNavBar.js'
import { getInstructorSession } from '../../api/apiColections.js'
import { useNavigate } from 'react-router-dom'

export const InstructorPage =()=>{
    const navigate = useNavigate()
    const [isLoading,setIsLoading] = useState(true)
    useEffect(()=>{
        getInstructorSession()
            .then((data)=>{
                if(data.status===false){
                    navigate('/')
                    return
                }
                setIsLoading(false)
            })
    },[])
    if(isLoading) return <h1>Loading</h1>
    return(
        <div>
            <InstructorNavBar></InstructorNavBar>
        </div>
    )
}