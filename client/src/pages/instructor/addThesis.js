import { useEffect, useState } from "react"
import { addThesis, get1StudentByID, getCategories, getInstructorSession } from "../../api/apiColections"
import { useNavigate } from 'react-router-dom'

export const AddThesis = () => {
    const [categories, setCategories] = useState([])
    const [mainIndex, setMainIndex] = useState(0)
    const [newCategory, setNewCategory] = useState('')
    const [option1, setOption1] = useState(false)
    const [thesisName, setThesisName] = useState('')
    const navigate = useNavigate()
    const [studentID, setStudentID] = useState()
    const [studentList, setStudentList] = useState([])
    const [description,setDescription]=useState('')

    const handleDescriptionOnChange=(ev)=>{
        setDescription(ev.target.value)
    }
    const submitHandler=()=>{
        var temp=''
        if(option1) temp=newCategory
        else temp=categories[mainIndex].name
        if(temp==='' || thesisName==='' || description===''){
            alert("Please fill all the fields")
            return
        }
        if(Object.keys(studentList).length<=0){
            alert("Thesis must have at least 1 participant")
            return
        }
        else if(Object.keys(studentList).length>4){
            alert("Thesis must have at most 4 participants")
            return
        }
        addThesis(studentList,thesisName,temp,description)
            .then(result=>{
                console.log(result.status)
                result.status===null 
                ? alert("Student is attending an on going thesis") 
                : result.status ? alert("Thesis added") : alert("Fail to add thesis")
            })
    }
    const handelThesisNameOnChange = (ev) => {
        setThesisName(ev.target.value)
    }
    const handleNewCategoryOnChange = (ev) => {
        setNewCategory(ev.target.value)
    }
    const handelStudentIDChange = (ev) => {
        setStudentID(ev.target.value)
    }
    const handelRemoveStudent = (ev) => {
        const temp = Number(ev.target.id)
        setStudentList([...studentList.slice(0, temp), ...studentList.slice(temp + 1)])
    }
    const handelCategoryOnChange = (ev) => {
        setMainIndex(ev.target.value)
    }
    const handelOption1OnChange = (ev) => {
        setOption1(ev.target.checked)
    }
    const findStudent = (ev) => {
        var flag = false
        studentList.map((value) => {
            if (value.id === studentID) {
                flag = true
                return
            }
        })
        if (flag) {
            alert("Student Existed")
            return
        }
        get1StudentByID(ev, studentID)
            .then((result) => {
                if (result.studentinfo === null) {
                    alert("Student not found")
                    return
                }
                setStudentList([...studentList, result.studentinfo])
                console.log(studentList)
            })
    }
    useEffect(() => {
        getInstructorSession()
            .then((data) => {
                if (data.status === false || data.instructorinfo === null || typeof (data.instructorinfo) === 'undefined') {
                    navigate('/')
                    return
                }
                getCategories()
                    .then((result) => {

                        // result.categories.map((value) => {
                        //     console.log(value._id)
                        // })
                        // console.log(result.categories)
                        setCategories(result.categories)
                        // console.log(categories)
                        // console.log(result)
                    })
            })

    }, [])
    return (
        <div style={{ paddingInline:'20%', paddingTop: '50px' }}>
            <div class="input-group mb-3">
                <input onChange={handelStudentIDChange} type="text" class="form-control" placeholder="Student ID" aria-label="Recipient's username" aria-describedby="button-addon2" />
                <button onClick={findStudent} class="btn btn-outline-secondary" type="button" id="button-addon2">Find</button>
            </div>
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
                            <button id={key} onClick={handelRemoveStudent} class="btn btn-outline-secondary" type="button" >Remove</button>
                        </div>
                    </div>
                </form>
            )}
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Thesis Name</span>
                <input onChange={handelThesisNameOnChange} value={thesisName} type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
            </div>
            {!option1
                ? <div class="input-group mb-3">
                    <label class="input-group-text" for="inputGroupSelect01">Category</label>
                    <select onChange={handelCategoryOnChange} class="form-select" id="inputGroupSelect01">
                        {categories.map((value, key) =>
                            <option value={key}>{value.name}</option>
                        )}
                    </select>
                </div>
                : <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">New category</span>
                    <input onChange={handleNewCategoryOnChange} value={newCategory} type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                </div>}

            <div class="form-check" style={{paddingBottom:'20px'}}>
                <input onChange={handelOption1OnChange} class="form-check-input" type="checkbox" id="flexCheckDefault" />
                <label class="form-check-label" for="flexCheckDefault">
                    Add New Category
                </label>
            </div>
            <div class="input-group" style={{paddingBottom:'20px'}}>
                <span class="input-group-text">Description</span>
                <textarea onChange={handleDescriptionOnChange} class="form-control" aria-label="With textarea"></textarea>
            </div>
            <button onClick={submitHandler} style={{marginRight:'20px'}} type="button" class="btn btn-primary">Submit</button>
            <a href="/instructorhomepage">
                <button type="button" class="btn btn-primary">Return</button>
            </a>
            

        </div>
    )
}