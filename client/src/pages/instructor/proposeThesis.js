import { useEffect, useState } from "react"
import { addThesis, getCategories, getInstructorSession, proposeThesis } from "../../api/apiColections"
import {InstructorNavBar} from '../../components/instructorNavBar.js'

export const ProposeThesis = () => {
    const [instructor, setInstructor] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [thesisName, setThesisName] = useState('')
    const [categories, setCategories] = useState([])
    const [mainIndex, setMainIndex] = useState(0)
    const [newCategory, setNewCategory] = useState('')
    const [option1, setOption1] = useState(false)
    const [description, setDescription] = useState('')

    const submitHandler=(ev)=>{
        if(thesisName.trim()==='' || description.trim()===''){
            alert("Please fill all the fields")
        }
        else if(option1 && newCategory.trim()===''){
            alert("Please fill all the fields")
        }
        else{
            // console.log([thesisName,option1 ? newCategory : categories[mainIndex].name,description])
            proposeThesis(thesisName,option1 ? newCategory : categories[mainIndex].name,description)
                .then(response=>{
                    console.log(response)
                    alert("Thesis created")
                })
        }
    }
    const handleDescriptionOnChange = (ev) => {
        setDescription(ev.target.value)
    }
    const handelOption1OnChange = (ev) => {
        setOption1(ev.target.checked)
    }
    const handelCategoryOnChange = (ev) => {
        setMainIndex(ev.target.value)
    }
    const handleNewCategoryOnChange = (ev) => {
        setNewCategory(ev.target.value)
    }
    const handleThesisNameOnChange = (ev) => {
        setThesisName(ev.target.value)
    }
    useEffect(() => {
        getInstructorSession()
            .then(respone => {
                getCategories()
                    .then(result => {
                        setCategories(result.categories)
                        setInstructor(respone.instructorinfo)
                        setIsLoading(false)
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
            <InstructorNavBar></InstructorNavBar>
        </div>
        <div style={{ paddingInline: '20%', paddingTop: '100px' }}>
            <div class="input-group mb-3">
                <span class="input-group-text" style={{ width: '15%' }} id="inputGroup-sizing-default">Thesis Name</span>
                <input onChange={handleThesisNameOnChange} value={thesisName} type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />

            </div>
            {!option1
                ? <div class="input-group mb-3">
                    <label class="input-group-text" style={{ width: '15%' }} for="inputGroupSelect01">Category</label>
                    <select onChange={handelCategoryOnChange} class="form-select" id="inputGroupSelect01">
                        {categories.map((value, key) =>
                            <option value={key}>{value.name}</option>
                        )}
                    </select>
                </div>
                : <div class="input-group mb-3">
                    <span class="input-group-text" style={{ width: '15%' }} id="inputGroup-sizing-default">New category</span>
                    <input onChange={handleNewCategoryOnChange} value={newCategory} type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                </div>}
            <div class="form-check" style={{ paddingBottom: '20px' }}>
                <input onChange={handelOption1OnChange} class="form-check-input" type="checkbox" id="flexCheckDefault" />
                <label class="form-check-label" for="flexCheckDefault">
                    Add New Category
                </label>
            </div>
            <div class="input-group" style={{ paddingBottom: '20px' }}>
                <span class="input-group-text " style={{ width: '15%' }}>Description</span>
                <textarea onChange={handleDescriptionOnChange} class="form-control" aria-label="With textarea"></textarea>
            </div>
            <button onClick={submitHandler} type="button" class="btn btn-primary fs-5 ms-2 float-end" style={{ width: '10%' }}>Submit</button>
            <a href="/instructorhomepage"><button type="button" class="btn btn-primary fs-5 ms-2 float-end" style={{ width: '10%' }}>Return</button></a>
        </div>
        </>
    )
}