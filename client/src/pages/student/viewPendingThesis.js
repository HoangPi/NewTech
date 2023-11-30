import { useEffect, useState } from "react"
import { getInstructorOfPendingThesis } from "../../api/apiColections"

export const ViewPendingThesis = () => {
    const [thesis, setThesis] = useState()
    const [instructor, setInstructor] = useState()
    const [isLoading, setIsLoading] = useState(true)
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
        <div>
            <div class="card w-75 mb-3">
                <h4 style={{borderBottom:'1px solid black', height:'40px'}}>Thesis</h4>
                <div class="card-body">
                    <h5 class="card-title">{thesis.name}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">{thesis.category}</h6>
                    <p class="card-text">{thesis.description}</p>
                    <a href="#" class="btn btn-primary">Button</a>
                </div>
            </div>

            <div class="card w-75">
                <h4 style={{borderBottom:'1px solid black', height:'40px'}}>Instructor</h4>
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" class="btn btn-primary">Button</a>
                </div>
            </div>
        </div>
    )
}