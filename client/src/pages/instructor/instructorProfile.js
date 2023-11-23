import { useEffect, useState } from "react"
import { editInstructorProfile, getInstructorSession } from "../../api/apiColections"
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
    const handleReturn=()=>{
        navigate('/')
    }
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
    const handleEditProfile =()=>{
        if(instructor.address==='' || instructor.phone===''){
            alert('Please fill all the fields')
            return
        }
        else if(instructor.phone.length <6 || instructor.phone.length>13){
            alert("Phone number's length must be in between 6 and 13")
            return
        }
        else{
            for(let i = 0;i<instructor.phone.length;i++){
                if(instructor.phone.charCodeAt(i) < 48 || instructor.phone.charCodeAt(i) > 57){
                    alert('Phone number must be nummeric')
                    return
                }
            }
        }
        editInstructorProfile(instructor.phone,instructor.address)
            .then(respone=>{
                alert('Profile updated')
                setInstructor(respone.instructorinfo)
                console.log(respone)
            })
    }
    if(isLoading) return <h1>Loading</h1>
    return(
        <div style={{paddingInline:'20%', paddingTop:'50px'}}>
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
            <button type="button" class="btn btn-primary btn-lg" onClick={handleEditProfile}>Edit</button>
            <button style={{marginLeft:'20px'}} type="button" class="btn btn-primary btn-lg" onClick={handleReturn}>Return</button>
        </div>
    )
}