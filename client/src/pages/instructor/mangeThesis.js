import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getInstructorSession, getThesisByInstructorID, setThesisSession } from "../../api/apiColections"
import {InstructorNavBar} from '../../components/instructorNavBar.js'

export const ManageThesis = () => {
    const [thesisList, setThesisList] = useState([])
    const [isLoading, setIsloading] = useState(true)
    const [progressBars,setProgressBars]=useState([])
    const navigate = useNavigate()

    const handleReturn =()=>{
        navigate('/')
    }
    const handleThesisSessionOnChange=(ev)=>{
        setThesisSession(ev.target.id)
            .then((value)=>{
                value.status ? navigate('/thesisdetail') : alert("Something went wrong, please try again")
            })
    }
    useEffect(() => {
        getInstructorSession()
            .then((result) => {
                if (!result.status) {
                    navigate('/')
                    return
                }
                else {
                    getThesisByInstructorID(result._id)
                        .then((value) => {
                            console.log(value.thesis)
                            setThesisList(value.thesis)
                            value.thesis.map((thesis)=>{
                                // var total = Object.keys(thesis.jobs).length
                                // var finished = Object.keys(thesis.progressconfirm).length
                                // if(total===0 || finished===0){
                                //     setProgressBars([...progressBars,0])
                                // }
                                // else{
                                //     for(const p of thesis.progressconfirm){
                                //         !p && finished--
                                //     }
                                //     setProgressBars([...progressBars,(Math.round(100*finished/total))])
                                // }
                                // console.log(total)
                                //Do not comment below code/ for async or something does not work as expected
                                // console.log(finished)
                                // (total===0) ? progressBars.push(0) : progressBars.push(Math.round(finished/total))
                            })
                        })
                        
                }
            })
            .finally(()=>setIsloading(false))
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
        <div style={{ paddingLeft: '25%', paddingRight: '25%', paddingTop: '100px' }}>
            {thesisList.map((value, key) => {
                var percentage= value.progress + '%'
                console.log(percentage)
                return (
                    <>
                        <div class="card" style={{ width: '100%', marginBottom: '25px' }}>
                            <div class="card-body">
                                <h5 class="card-title">{value.name}</h5>
                                <h6 class="card-subtitle mb-2 text-body-secondary">{value.category}</h6>
                                <h6 class="card-subtitle mb-2 text-body-secondary">Status: <span style={{color: value.status==='on going' 
                                                                                                            ? '#0EA5E9' 
                                                                                                            : value.status==='Suspended'
                                                                                                                ?'#DC3545'
                                                                                                                :'#38A169'}}>{value.status}</span></h6>
                                <p class="card-text">{value.description}.</p>
                                <a onClick={handleThesisSessionOnChange} class="card-link"><button id={key} className="btn btn-primary fs-6 px-0 col-1 py-1" type="button">Detail</button></a>
                            </div>
                            <h5 class="px-3">Progress</h5>
                            <div class="progress m-2" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                <div class="progress-bar" style={{width: percentage}}>{percentage}</div>
                            </div>
                        </div>
                    </>
                )
            })}
            <button onClick={handleReturn} style={{ marginRight: '30px' }} type="button" class="btn btn-primary mx-3">Return</button>
        </div>
        </>
    )
}