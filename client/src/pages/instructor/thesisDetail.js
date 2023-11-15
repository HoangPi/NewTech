import { useEffect, useState } from "react"
import { getInstructorSession, getStudentsInThesis, getThesisSession } from "../../api/apiColections"
import { useNavigate } from "react-router-dom"

export const ThesisDetail = () => {
    const navigate = useNavigate()
    const [isLoading, setIsloading] = useState(true)
    const [thesis, setThesis] = useState()
    const [studentList, setStudentList] = useState([])
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
                                })
                                .finally(() => setIsloading(false))


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
                <div class="input-group">
                    <input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                    <span class="input-group-text">
                        <span class="material-symbols-outlined">
                            check
                        </span>
                    </span>
                    <a href="whathappens" target="_blank">
                        <span class="input-group-text">Access</span>
                    </a>
                </div>
                
            </div>
        </div>
    )
}