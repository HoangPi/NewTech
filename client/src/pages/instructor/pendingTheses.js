import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { confirmRequest, getInstructorPendingTheses, getInstructorSession, removePropose } from "../../api/apiColections"
import {InstructorNavBar} from '../../components/instructorNavBar.js'

export const PendingTheses = () => {
    const navigate = useNavigate()
    const [theses, setTheses] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [students,setStudents] = useState([])

    const handleCacel =(ev) =>{
        removePropose(theses[Number(ev.target.getAttribute('k'))]._id)
            .then(response =>{
                if(response.confirm){
                    alert("Success")
                    window.location.reload()
                }
                else{
                    alert("Fail")
                }
            })
    }
    const handleDeny =(ev)=>{
        // console.log(ev.target.getAttribute('info'))
        let temp = ev.target.getAttribute('info')
        temp = temp.split(',')
        // console.log(Number(temp[0]))
        // console.log(Number(temp[1]))
        let index0 = Number(temp[0])
        let batch = students[Number(temp[0])]
        let index1 = Number(temp[1])
        batch = [...batch.splice(0,index1),...batch.splice(index1+1)]
        setStudents([...students.splice(0,index0),batch,...students.splice(index0+1)])
        console.log(batch)
    }
    const handleConfirm=(ev)=>{
        const i = Number(ev.target.getAttribute('k'))
        let s = []
        students[i].map(value=>{
            s.push([value.studentid.id,value.studentid._id])
        })
        if(s.length <= 0 || s.length > 4){
            alert("Number of students must be in between 1 and 4")
        }
        else{
            confirmRequest(s,theses[i])
                .then(response => {
                    if(response.confirm){
                        alert("Success")
                        window.location.reload()
                    }
                    else{
                        alert("System failed, please try again")
                    }
                })
        }
    }
    useEffect(() => {
        getInstructorPendingTheses()
            .then(response => {
                if (typeof (response.confirm) === 'undefined') {
                    alert("Session timed out")
                    navigate('/')
                }
                else {
                    // console.log(...(response.theses))
                    // console.log(response.students)
                    setTheses([...(response.theses)])
                    setStudents([...response.students])
                    setIsLoading(false)
                }

            })
    }, [])
    if (isLoading) return <div class="d-flex align-items-center">
        <strong role="status">Loading...</strong>
        <div class="spinner-border ms-auto" aria-hidden="true"></div>
    </div>
    return (
        <>
        <div>
            <InstructorNavBar></InstructorNavBar>
        </div>
        <div style={{ paddingLeft: '20%',paddingTop:'100px' }}>
            {theses.map((value,key) => <>

                <div style={{ marginBottom: '50px' }} class="card w-75 shadow">
                    <h4 style={{ borderBottom: '2px solid black', height: '40px' }} class="ps-3 pt-1">Students</h4>
                    <div style={{ borderBottom: '1px solid black', paddingBottom:'20px'}} class="container text-center">
                        <div class="row">
                            <div style={{textAlign:'left'}} class="col">
                                <h6>Name</h6>
                            </div>
                            <div style={{textAlign:'left'}} class="col">
                                <h6>ID</h6>
                            </div>
                            <div style={{textAlign:'left'}} class="col">
                                <h6>Class</h6>
                            </div>
                            <div class="col"></div>
                        </div>
                        {students[key].map((s,k) => {
                            return(
                                <div style={{height:'50px'}} class="row">
                                    <div style={{textAlign:'left'}} class='col'>{s.studentid.fullname}</div>
                                    <div style={{textAlign:'left'}} class='col'>{s.studentid.id}</div>
                                    <div style={{textAlign:'left'}} class='col'>{s.studentid.classid}</div>
                                    <div style={{textAlign:'left'}} class='col'>
                                        <button info={[key,k]} onClick={handleDeny} style={{height:'25px'}} type="button" class="btn btn-outline-danger pt-0">Deny</button>
                                    </div>
                                </div>
                            )
                        })}
                            
                    </div>
                    <h4 style={{ borderBottom: '1px solid black', height: '40px' }} class="ps-3 pt-1">Thesis</h4>
                    <div class="card-body">
                        <h5 class="card-title">{value.name}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">{value.category}</h6>
                        <p class="card-text">{value.description}</p>
                        <a k={key} onClick={handleConfirm} style={{ marginRight: '20px' }} class="btn btn-primary">Confirm</a>
                        <a k={key} onClick={handleCacel} class="btn btn-primary">Cancel request</a>
                    </div>
                </div>
            </>
            )}

        </div>
        </>
    )
}