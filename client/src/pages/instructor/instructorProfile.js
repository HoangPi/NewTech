import { useEffect, useState } from "react"
import { getInstructorSession } from "../../api/apiColections"
import { useNavigate } from "react-router-dom"

export const InstructorProfile =() =>{
    const [instructor,setInstructor] = useState()
    const [isLoading,setIsLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(()=>{
        getInstructorSession()
            .then((data)=>{
                if(data.status===false){
                    navigate('/')
                    return
                }
                setInstructor(data.instructorinfo)
                setIsLoading(false)
            })
    },[])
    const handlePhoneOnChange=(ev)=>{
        setInstructor(prev=>({
            ...prev,
            phone:ev.target.value,
        }))
    }
    const handleAddressOnChange = (ev) =>{
        setInstructor(prev=>({
            ...prev,
            address:ev.target.value,
        }))
    }
    const editInstructorProfile =()=>{

    }
    if(isLoading) return <h1>Loading</h1>
    return(
        <div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Full name     </span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled={true} value={instructor.fullname}/>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Email    </span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled={true} value={instructor.email}/>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Phone number  </span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={handlePhoneOnChange} value={instructor.phone}/>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Address       </span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={handleAddressOnChange} value={instructor.address}/>
            </div>
            <button type="button" class="btn btn-primary btn-lg" onClick={editInstructorProfile}>Edit</button>
        </div>
    )
}