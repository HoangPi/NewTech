import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import * as api from '../../api/apiColections.js'

export const EditStudentProfile = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [student, setStudent] = useState()

    const handleReturn=()=>{
        navigate('/')
    }
    const handleEditButton = (ev) => {
        if(student.phone===''||student.address===''){
            alert("Please fill all the fields")
            return
        }
        else if(student.phone.length<6||student.phone.length>13){
            alert("Phone number's length must be in between 6 and 13")
            return
        }
        else{
            for(let i = 0; i<student.phone.length;i++){
                if(student.phone.charCodeAt(i) < 48 || student.phone.charCodeAt(i) > 57){
                    alert('Phone number must be nummeric')
                    return
                }
            }
        }
        api.editStudentInfo(ev, student)
            .then(response=>{
                alert('Profile updated')
                // console.log(response)
                // setStudent(response.studentinfo)

            })
    }
    const handlePhoneOnChange = (ev) => {
        setStudent(prev => ({
            ...prev,
            phone: ev.target.value,
        }))
    }
    const handleAddressOnChange = (ev) => {
        setStudent(prev => ({
            ...prev,
            address: ev.target.value,
        }))
    }
    useEffect(() => {
        api.getStudentSession()
            .then(data => {
                if (data.status === false) {
                    navigate('/')
                    return
                }
                console.log(data)
                setStudent(data.studentinfo)
                setIsLoading(false)
            })
    }, [])
    if (isLoading) return <div class="d-flex align-items-center">
        <strong role="status">Loading...</strong>
        <div class="spinner-border ms-auto" aria-hidden="true"></div>
    </div>
    return (
        <div style={{paddingInline:'20%', paddingTop:'50px'}}>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Full name     </span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled={true} value={student.fullname} />
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Student ID    </span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled={true} value={student.id} />
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">class         </span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled={true} value={student.classid} />
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Phone number  </span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={handlePhoneOnChange} value={student.phone} />
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Address       </span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={handleAddressOnChange} value={student.address} />
            </div>
            <button type="button" class="btn btn-primary btn-lg" onClick={handleEditButton}>Edit</button>
            <button type="button" style={{marginLeft:'20px'}} class="btn btn-primary btn-lg" onClick={handleReturn}>Return</button>
        </div>
    )
}