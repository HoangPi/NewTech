import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getStudentSession, getStudentThesis, getTasksInThesis, submit } from "../../api/apiColections"
import { StudentNavBar } from "../../components/studentNavBar"

export const StudentThesis = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [student, setStudent] = useState()
    const [thesis, setThesis] = useState()
    const [tasks, setTasks] = useState([])
    const [taskEdit, setTaskEdit] = useState([])
    const [submissionList,setSubmissionList]=useState([])

    const handleReturn=()=>{
        navigate('/')
    }
    const handleSubmission =async()=>{
        // submit(tasks,submissionList)
        //     .then((value)=>{
        //         value.status===null
        //             ? alert("Something went wrong")
        //             : value.status ? alert("Tasks submitted") : alert("Something went wrong")
        //     })
        for(let i =0;i<Object.keys(tasks).length;i++){
            if(taskEdit[i]===false && submissionList[i]!=='' && submissionList[i]!==null && submissionList[i]!==tasks[i].submission){
                console.log(submissionList[i])
                var result = await submit(tasks[i]._id,submissionList[i])
                if(!result.status){
                    alert("Something went wrong")
                    break
                }
            }
            
        }
        window.location.reload()
    }
    const handleSubmissionOnChange=(ev)=>{
        let index = ev.target.id
        let newvalue=ev.target.value
        setSubmissionList([...submissionList.slice(0,index),newvalue,...submissionList.slice(index+1)])
    }
    const handleEditTask =(ev)=>{
        //Switch whatever value is in that index
        let index = Number(ev.target.value)
        let lastvalue = taskEdit[index]
        setTaskEdit([...taskEdit.slice(0,index),!lastvalue,...taskEdit.slice(index+1)])
        console.log(submissionList)
    }
    useEffect(() => {
        getStudentSession()
            .then(value => {
                value.status == null
                    ? navigate('/')
                    : !value.status && navigate('/')
                // console.log(value.studentinfo)

                setStudent(value.studentinfo)
                getStudentThesis(value.studentinfo.thesisid)
                    .then(result => {
                        setThesis(result.thesis)
                        // console.log(result.thesis)
                        if(typeof(result.thesis)==='undefined' || result.thesis===null){
                            alert("Student does not have an on going thesis right now")
                            navigate('/')
                            return
                        }
                        getTasksInThesis(result.thesis._id)
                            .then(t => {
                                // console.log(t.tasks)
                                setTasks(t.tasks)
                                setTaskEdit(Array(Object.keys(t.tasks).length).fill(false))
                                setSubmissionList(t.tasks.map(r => r.submission))
                            })
                            .finally(() => setIsLoading(false))
                    })
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
        <div style={{ paddingLeft: '15%', paddingRight: '15%', paddingTop: '100px' }}>
                <div class="border border-success p-2 mb-2 border-opacity-75">
                    <h3>Project {thesis.name}</h3>
                    <h6>Category: {thesis.category}</h6>
                    <div class="form-floating mb-3">
                        <input type="email" disabled={true} readonly class="form-control-plaintext" id="floatingPlaintextInput" placeholder="Description" value={thesis.description} />
                        <label disabled={true} for="floatingPlaintextInput">Project description:</label>
                    </div>
                </div>
                <div class="border border-success p-2 mb-2 border-opacity-75">
                    <h3 style={{ paddingBottom: '20px' }}>Unfinished tasks:</h3>
                    {tasks.map((value, key) => (value.confirm === false) && <div>
                        <div class="mb-3">
                            <label for="formGroupExampleInput" class="form-label">{value.job}</label>
                        </div>
                        <div class="input-group mb-3">
                            <input onChange={handleSubmissionOnChange} disabled={!taskEdit[key]} id={key} value={submissionList[key]} type="text" class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                            <button style={{ width: '100px' }} onClick={handleEditTask} class="btn btn-outline-secondary" value={key} type="button" id="button-addon1">{!taskEdit[key] ? "Edit" : "Confirm"}</button>
                        </div>
                    </div>
                    )}
                    <button onClick={handleSubmission} type="button" class="btn btn-success">Submit</button>
                    <h3 class="mt-3">Finished tasks: </h3>
                    {tasks.map(value => (value.confirm === true) && <div>
                        <div class="mb-3">
                            <label for="formGroupExampleInput" class="form-label">{value.job}</label>
                        </div>
                        <div class="input-group mb-3">
                            <input disabled={true} value={value.submission} type="text" class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                        </div>
                    </div>
                    )}
                </div>
                <button onClick={handleReturn}  type="button" class="btn btn-primary float-end m-3">Return</button>
            </div></>
    )
}