import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getInstructorDefense } from "../../api/apiColections"

export const Defense = () => {
    const [isLoading, setIsloading] = useState(true)
    const [defense, setDefense] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getInstructorDefense()
            .then(response => {
                setDefense(response.defense)
                setIsloading(false)
            })
    }, [])

    if (isLoading) return <div class="d-flex align-items-center">
        <strong role="status">Loading...</strong>
        <div class="spinner-border ms-auto" aria-hidden="true"></div>
    </div>
    return (
        <div>
            <div class="container text-center">
                <div class="row">
                    <div class="col">
                        <strong>Instructor</strong>
                    </div>
                    <div class="col">
                        <strong>Thesis</strong>
                    </div>
                    <div class="col">
                        <strong>Date</strong>
                        
                    </div>
                </div>
                {defense.map((value, key) => {
                    const date = new Date(value.date)
                    console.log(date)
                    return (
                        <div class="row">
                            <div class="col">
                                {value.instructor.fullname}
                            </div>
                            <div class="col">
                                {value.thesis.name}
                            </div>
                            <div class="col">
                                {/* Because month return from 0 to 11 */}
                                {date.getDate()}-{date.getMonth()+1}-{date.getFullYear()}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}