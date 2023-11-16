import { useEffect, useState } from "react"
import { addTask, confirmSubmission, getInstructorSession, getStudentsInThesis, getTasksInThesis, getThesisSession } from "../../api/apiColections"
import { useNavigate } from "react-router-dom"

export const ThesisDetail = () => {
    const navigate = useNavigate()
    const [isLoading, setIsloading] = useState(true)
    const [taskList, setTaskList] = useState([])
    const [thesis, setThesis] = useState()
    const [tasks, setTasks] = useState([])
    const [taskInput, setTaskInput] = useState('')
    const [studentList, setStudentList] = useState([])

    const handleReturn=()=>{
        navigate('/')
    }
    const handleRefresh=()=>{
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
                    getThesisSession()
                        .then((value) => {
                            console.log(value.thesis)
                            setThesis(value.thesis)

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

    }, [])

    if (isLoading) return <div class="d-flex align-items-center">
        <strong role="status">Loading...</strong>
        <div class="spinner-border ms-auto" aria-hidden="true"></div>
    </div>
    return (
        <div style={{ paddingLeft: '25%', paddingRight: '25%', paddingTop: '25px' }}>
            <div class="border border-success p-2 mb-2 border-opacity-75">
                <h3>Project {thesis.name}</h3>
                <h6>Category: {thesis.category}</h6>
                <div class="form-floating mb-3">
                    <input type="email" disabled={true} readonly class="form-control-plaintext" id="floatingPlaintextInput" placeholder="Description" value={thesis.description} />
                    <label disabled={true} for="floatingPlaintextInput">Project description:</label>
                </div>
            </div>
            <div class="border border-success p-2 mb-2 border-opacity-75">
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
            <div class="border border-success p-2 mb-2 border-opacity-75">
                <h3>Task details: </h3>
                <div class="input-group mb-3">
                    <input onChange={handleTaskInputOnChange} type="text" class="form-control" placeholder="New task" aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <button onClick={handleAddNewTask} class="btn btn-outline-secondary" type="button" id="button-addon2">Add new task</button>
                </div>
                {taskList.map((value, key) =>
                    <div class="input-group mb-3">
                        <input disabled={true} value={value} type="text" class="form-control" placeholder="Task" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <button onClick={handleRemoveTask} id={key} class="btn btn-outline-secondary" type="button" >Remove</button>
                    </div>
                )}
                <button onClick={handleAddTask} type="button" class="btn btn-primary">Add tasks</button>
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
            <button onClick={handleReturn} style={{marginRight:'30px'}} type="button" class="btn btn-primary">Return</button>
            <button onClick={handleRefresh} type="button" class="btn btn-primary">Refresh</button>
        </div>
    )
}