import { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import { getInstructorDefense } from "../../api/apiColections"

export const Defense =()=>{
    const [isLoading,setIsloading] = useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
        getInstructorDefense()
            .then(response => {
                console.log(response)
                setIsloading(false)
            })
    },[])

    if (isLoading) return <div class="d-flex align-items-center">
        <strong role="status">Loading...</strong>
        <div class="spinner-border ms-auto" aria-hidden="true"></div>
    </div>
    return(
        <div>
            
        </div>
    )
}