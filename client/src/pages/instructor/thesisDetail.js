import { useEffect, useState } from "react"
import { addScore, addTask, confirmSubmission, getAllInstructor, getAllRelatedToScore, getDefenseDate, getInstructorSession, getStudentsInThesis, getTasksInThesis, getThesisSession, setDefendDate, suspendThesis } from "../../api/apiColections"
import { useNavigate } from "react-router-dom"
import { DatePicker, Space } from 'antd';

export const ThesisDetail = () => {
    const navigate = useNavigate()
    const [isLoading, setIsloading] = useState(true)
    const [taskList, setTaskList] = useState([])
    const [thesis, setThesis] = useState()
    const [tasks, setTasks] = useState([])
    const [taskInput, setTaskInput] = useState('')
    const [studentList, setStudentList] = useState([])
    const [score, setScore] = useState()
    const [instructorList, setInstructorList] = useState([])
    const [defender, setDefender] = useState('')
    const [date,setDate] = useState(Date.now())
    const [instructor,setInstructor] = useState()
    const [defense,setDefense] = useState()

    const handleDefend =() =>{
        if(defender._id===instructor._id){
            alert("Thesis committee cannot be yourself")
            return
        }
        // 86400000 = 24 * 60 * 60 * 24
        if((date - Date.now())/(86400000)<7){
            alert("Defense date must be at least 7 days after current date")
            return
        }
        if(typeof(defense) === 'undefined'){
            setDefendDate(defender._id,thesis._id,date)
                .then(response => {
                    if(response.confirm){
                        alert('Thesis defend date is set')
                        window.location.reload()
                    }
                    else{
                        alert("Internal error")
                    }
                })
        }
        else{
            alert("This thesis already has a defense appointment")
        }
        
    }
    const onChange = (date, dateString) => {
        setDate(date)
        console.log(date)
      };
    const handleDefenderOnChange = (ev) => {
        setDefender(instructorList[Number(ev.target.value)])
        // console.log(ev.target.value)
    }
    const handleSuspend = (ev) => {
        suspendThesis(thesis._id)
            .then(respone => {
                respone.status ? alert('Thesis suspended') : alert('Internal error')
            })
    }
    const handleScoring = () => {
        if(typeof(defense) ==='undefined'){
            alert("Thesis has not had a defense date yet")
            return
        }
        let temp = new Date(defense.date)
        temp = temp.getTime()

        if((temp - Date.now()) > 0){
            alert("Please wait for the defense date to evaluate this thesis")
            return
        }
        if(score==='' || typeof(score) === 'undefined'){
            alert("Score must not be empty")
            return
        }
        addScore(thesis._id, score)
            .then(result => {
                result ? alert("sucess") : alert("fail")
            })
    }
    const handleScoreOnChange = (ev) => {
        const temp = Number(ev.target.value)
        if (temp > 10) {
            setScore(10)
        }
        else if (temp < 0) {
            setScore(0)
        }
        else setScore(temp)
    }
    const handleReturn = () => {
        navigate('/')
    }
    const handleRefresh = () => {
        window.location.reload()
    }
    const handleTaskInputOnChange = (ev) => {
        setTaskInput(ev.target.value)
    }
    const handleConfirm = (ev) => {
        confirmSubmission(tasks[Number(ev.target.id)])
            .then((result) => {
                result.status
                    ? alert("Task confirmed")
                    : alert("Something went wrong")
            })
    }
    //this is for updating the useState
    const handleAddNewTask = (ev) => {
        setTaskList([...taskList, taskInput])
    }
    //this is for updating the database
    const handleAddTask = (ev) => {
        addTask(thesis._id, taskList)
            .then((result) => {
                result.status === null
                    ? alert("Fail to add task")
                    : result.status ? alert("Tasks added") : alert("Fail to add task")
            })
    }
    const handleRemoveTask = (ev) => {
        const temp = Number(ev.target.id)
        // console.log(temp)
        setTaskList([...taskList.slice(0, temp), ...taskList.slice(temp + 1)])
    }
    useEffect(() => {
        getInstructorSession()
            .then((instructor) => {
                if (!instructor.status) {
                    navigate('/')
                    return
                }
                else {
                    setInstructor(instructor.instructorinfo)
                    getThesisSession()
                        .then(async (value) => {
                            console.log(value.thesis)
                            setThesis(value.thesis)
                            let temp = await getDefenseDate(value.thesis._id)
                            if(temp.defense){
                                setDefense(temp.defense)
                                setDate(temp.defense.date)
                            }
                            if (value.thesis.status === "Finished") {
                                getAllRelatedToScore(value.thesis._id)
                                    .then(respone => {
                                        // console.log(respone)
                                        setStudentList(respone.studentList)
                                        setScore(respone.scores[0].score)
                                        setIsloading(false)
                                    })
                            }
                            else {
                                getAllInstructor()
                                    .then(i => {
                                        console.log(i.instructors[0])
                                        setDefender(i.instructors[0])
                                        setInstructorList(i.instructors)
                                        getStudentsInThesis(value.thesis._id)
                                            .then((s) => {
                                                console.log(s)
                                                setStudentList(s.studentList)
                                                getTasksInThesis(value.thesis._id)
                                                    .then((tasks) => {
                                                        console.log(tasks.tasks)
                                                        setTasks(tasks.tasks)
                                                    })
                                                    .finally(() => setIsloading(false))
                                            })
                                    })

                            }

                        })
                }
            })

    }, [])

    if (isLoading) return <div class="d-flex align-items-center">
        <strong role="status">Loading...</strong>
        <div class="spinner-border ms-auto" aria-hidden="true"></div>
    </div>
    return (
        <div style={{ paddingInline: '25%', paddingTop: '25px' }}>
            <div style={{ backgroundColor: '#FFFFFF' }} class="border border-success p-2 mb-2 border-opacity-75">
                <h3>Project {thesis.name}</h3>
                <h6>Category: {thesis.category}</h6>
                <div class="form-floating mb-3">
                    <input type="email" disabled={true} readonly class="form-control-plaintext" id="floatingPlaintextInput" placeholder="Description" value={thesis.description} />
                    <label disabled={true} for="floatingPlaintextInput">Project description:</label>
                </div>
            </div>
            <div style={{ backgroundColor: '#FFFFFF' }} class="border border-success p-2 mb-2 border-opacity-75">
                <h3>Participants: </h3>
                <form class="row g-3">
                    <div class="col-md-2">
                        <label for="inputZip" class="form-label">Class</label>

                    </div>
                    <div class="col-md-4">
                        <label for="inputCity" class="form-label">Student ID</label>
                    </div>
                    <div class="col-md-6">
                        <label for="inputName" class="form-label">Name</label>
                    </div>
                </form>
                {studentList.map((value, key) =>
                    <form class="row g-3">
                        <div class="col-md-2">
                            <input disabled={true} type="text" placeholder={value.classid} class="form-control" id="inputZip" aria-describedby="button-addon2" />
                        </div>
                        <div class="col-md-4">
                            <input disabled={true} type="text" placeholder={value.id} class="form-control" id="inputCity" />
                        </div>
                        <div class="col-md-6">
                            <div id="inputName" class="input-group mb-3">
                                <input disabled={true} type="text" placeholder={value.fullname} class="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                {/* <button id={key} class="btn btn-outline-secondary" type="button" >Remove</button> */}
                            </div>
                        </div>
                    </form>)}
            </div>
            <div style={{ backgroundColor: '#FFFFFF' }} class="border border-success p-2 mb-2 border-opacity-75">
                <h3>Task details: </h3>
                <div class="input-group mb-3">
                    <input disabled={thesis.status === 'Finished' || thesis.status === 'Suspended'} onChange={handleTaskInputOnChange} type="text" class="form-control" placeholder="New task" aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <button disabled={thesis.status === 'Finished' || thesis.status === 'Suspended'} onClick={handleAddNewTask} class="btn btn-outline-secondary" type="button" id="button-addon2">Add new task</button>
                </div>
                {taskList.map((value, key) =>
                    <div class="input-group mb-3">
                        <input disabled={true} value={value} type="text" class="form-control" placeholder="Task" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <button disabled={thesis.status === 'Finished' || thesis.status === 'Suspended'} onClick={handleRemoveTask} id={key} class="btn btn-outline-secondary" type="button" >Remove</button>
                    </div>
                )}
                <button disabled={thesis.status === 'Finished' || thesis.status === 'Suspended'} onClick={handleAddTask} type="button" class="btn btn-primary">Add tasks</button>
                <h3>Pending tasks: </h3>
                {tasks.map((value, key) =>
                    (value.confirm === false) &&
                    <div class="input-group">
                        <input disabled={true} type="text" class="form-control" placeholder={value.job} aria-label="Recipient's username with two button addons" />
                        <a href={value.submission} target="_blank">
                            <button class="btn btn-outline-secondary" type="button">Access</button>
                        </a>
                        <button id={key} onClick={handleConfirm} class="btn btn-outline-secondary" type="button">Confirm</button>
                    </div>
                )}
                <h3>Finished tasks: </h3>
                {tasks.map(value =>
                    value.confirm === true &&
                    <div>
                        <div class="input-group">
                            <input disabled={true} type="text" class="form-control" placeholder={value.job} aria-label="Recipient's username with two button addons" />
                            <a href={value.submission} target="_blank">
                                <button class="btn btn-outline-secondary" type="button">Access</button>
                            </a>
                        </div>
                    </div>
                )}
            </div>
            <div style={{ backgroundColor: '#FFFFFF' }} class="border border-success p-2 mb-2 border-opacity-75">
                <h3>Set defend date </h3>
                <DatePicker onChange={onChange} />
                <div class="input-group mb-3">
                    <label class="input-group-text" for="inputGroupSelect01">Defender</label>
                    <select onChange={handleDefenderOnChange} class="form-select" id="inputGroupSelect01">
                        {instructorList.map((value, key) => {
                            return <option value={key}>{value.fullname}</option>
                        })}
                    </select>
                </div>
                <button disabled={thesis.status === 'Finished' || thesis.status === 'Suspended'} onClick={handleDefend} style={{ marginRight: '30px' }} type="button" class="btn btn-primary">Set</button>
            </div>
            <div style={{ backgroundColor: '#FFFFFF' }} class="border border-success p-2 mb-2 border-opacity-75">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">Score</span>
                    <input disabled={thesis.status === 'Finished' || thesis.status === 'Suspended'} onChange={handleScoreOnChange} value={score} type="number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                    <button disabled={thesis.status === 'Finished' || thesis.status === 'Suspended'} onClick={handleScoring} type="button" class="btn btn-primary">Confirm</button>
                </div>
            </div>
            <button onClick={handleReturn} style={{ marginRight: '30px' }} type="button" class="btn btn-primary">Return</button>
            <button onClick={handleRefresh} style={{ marginRight: '30px' }} type="button" class="btn btn-primary">Refresh</button>
            <button onClick={handleSuspend} disabled={thesis.status === 'Finished' || thesis.status === 'Suspended'} type="button" class="btn btn-danger">Suspend</button>
        </div>
    )
}