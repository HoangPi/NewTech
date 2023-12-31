import {useEffect, useState} from "react"
import { getAllPendingThesis, getStudentSession } from "../../api/apiColections"
import { useNavigate } from "react-router-dom"
import { StudentNavBar } from "../../components/studentNavBar"

export const JoinThesis=()=>{
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [student,setStudent] = useState()
    const [theses,setTheses] = useState([])

    useEffect(()=>{
        getStudentSession()
            .then(response=>{
                if(typeof(response.studentinfo)==='undefined'){
                    navigate('/')
                }
                else{
                    setStudent(response.studentinfo)
                    if(response.studentinfo.thesisid!==''){
                        alert("Student is currently attending an on going thesis")
                        navigate('/')
                    }
                    else{
                        getAllPendingThesis()
                            .then(result=>{
                                console.log(result.theses)
                                if(Object.keys(result.theses).length<=1){
                                    setTheses(result.theses)
                                }
                                else{
                                    setTheses(result.theses)
                                }
                                setIsLoading(false)
                            })
                    }
                }
            })
    },[])
    if (isLoading) return <div class="d-flex align-items-center">
        <strong role="status">Loading...</strong>
        <div class="spinner-border ms-auto" aria-hidden="true"></div>
    </div>
    return(
        <><div>
            <StudentNavBar></StudentNavBar>
        </div>
        <div style={{ paddingInline: '20%', paddingTop: '100px' }}>
                {console.log(theses)}
                {theses.map((value, map) => <div class="card mb-3" style={{ width: "18rem;" }}>
                    <div class="card-body ">
                        <h5 class="card-title">{value.name}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">{value.category}</h6>
                        <p class="card-text">{value.description}</p>
                        <a href={"/pendingthesis?t=" + value._id}><button className="btn btn-primary fs-6 px-0 col-1 py-1" type="button">Detail</button></a>
                        
                    </div>
                </div>
                )}
            </div></>
    )
}