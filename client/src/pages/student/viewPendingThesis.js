import { useEffect, useState } from "react"
import { cancleRequest, getInstructorOfPendingThesis, joinThesis } from "../../api/apiColections"
import { StudentNavBar } from "../../components/studentNavBar"

export const ViewPendingThesis = () => {
    const [thesis, setThesis] = useState()
    const [instructor, setInstructor] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const handleJoin = ()=>{
        joinThesis(thesis._id)
            .then(response=>{
                console.log(response)
                if(typeof(response.confirm)==='undefined'){
                    alert("Student is having a pending request for this thesis.")
                }
                else if(response.confirm===true){
                    alert("Request sent to instructor.")
                }
                else{
                    alert("Fail to send request, please try again.")
                }
            })
    }
    const handleCancel=()=>{
        cancleRequest(thesis._id)
            .then(response=>{
                console.log(response)
                if(response.confirm===true){
                    alert("Request has been removed.")
                }
                else{
                    alert("Fail to execute, please try again.")
                }
            })
    }
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        console.log(params.get('t'))
        getInstructorOfPendingThesis(params.get('t'))
            .then(response => {
                console.log(response)
                setInstructor(response.instructor)
                setThesis(response.thesis)
                setIsLoading(false)
            })
    }, [])
    
    if (isLoading) return <div class="d-flex align-items-center">
        <strong role="status">Loading...</strong>
        <div class="spinner-border ms-auto" aria-hidden="true"></div>
    </div>
    return (
        <>
        <div>
            <StudentNavBar></StudentNavBar>
        </div>
        <div style={{paddingLeft:'28%', paddingRight:'15%', paddingTop:'100px'}}>
            <div class="card w-75 mb-3">
                <h4 style={{borderBottom:'1px solid black', height:'40px'}}>Instructor</h4>
                <div class="card-body">
                    <h5 class="card-title">{instructor.fullname}</h5>
                    <p class="card-text">Email: {instructor.email}<br/>
                    Phone number: {instructor.phone}</p>
                    
                </div>
            </div>
            <div class="card w-75">
                <h4 style={{borderBottom:'1px solid black', height:'40px'}}>Thesis</h4>
                <div class="card-body">
                    <h5 class="card-title">{thesis.name}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">{thesis.category}</h6>
                    <p class="card-text">{thesis.description}</p>
                    <a onClick={handleJoin} style={{marginRight:'20px'}} class="btn btn-primary">Join</a>
                    <a onClick={handleCancel} class="btn btn-primary">Cancle request</a>
                    <a href="/jointhesis" class="btn btn-primary float-end">Return</a>
                </div>
            </div>
        </div>
        </>
    )
}