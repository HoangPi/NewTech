import { useState } from "react"
import { useEffect } from "react"
import * as api from '../../api/apiColections.js'

export const EditStudentProfile = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [student, setStudent]=useState()
    const handleEditButton=(ev)=>{
        api.editStudentInfo(ev,student)
    }
    const handlePhoneOnChange = (ev)=>{
        setStudent(prev=>({
            ...prev,
            phone:ev.target.value,
        }))
    }
    const handleAddressOnChange = (ev) =>{
        setStudent(prev=>({
            ...prev,
            address:ev.target.value,
        }))
    }
    useEffect(() => {
        api.getStudentSession()
            .then(data=>{
                console.log(data)
                setStudent(data.studentinfo)
                setIsLoading(false)
            })
    }, [])
    if (isLoading) return <h1>Loading<img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif" /></h1>
    return (
        <div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Full name     </span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled={true} value={student.fullname}/>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Student ID    </span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled={true} value={student.id}/>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">class         </span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled={true} value={student.classid}/>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Phone number  </span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={handlePhoneOnChange} value={student.phone}/>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Address       </span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={handleAddressOnChange} value={student.address}/>
            </div>
            <button type="button" class="btn btn-primary btn-lg" onClick={handleEditButton}>Edit</button>
        </div>
    )
}