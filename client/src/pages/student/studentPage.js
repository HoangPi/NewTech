import { StudentNavBar } from "../../components/studentNavBar"
import { useEffect, useState } from "react"
import * as api from '../../api/apiColections.js'
import { useNavigate } from 'react-router-dom'
// import { EditStudentProfile } from "./editStudentProfile.js"

export const StudentPage = (props) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    // const [student,SetStudent] = useState()
    useEffect(() => {
        // try {
        //     fetch('/getstudent', {
        //         method: "POST",
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({ id: '20110432' }),
        //     })
        //         .then((respone) => {
        //             console.log(respone)
        //             respone.json()
        //                 .then((data) => {
        //                     console.log(data.studentinfo)
        //                     setIsLoading(false)
        //                     props.setStudent(data.studentinfo)
        //                 })
        //         })
        // }
        // catch (err) {
        //     console.log(err)
        // }
        api.getStudentSession()
            .then((response)=>{
                if(response.status===false){
                    navigate('/')
                    return
                }
                console.log(response)
                setIsLoading(false)
                // response.json()
                //     .then((data)=>{
                //         console.log(data)
                //         setIsLoading(false)
                //     })
            })
    }, [])
    if (isLoading) return <h1>Loading</h1>
    console.log(props.s)
    return (
        <div>
            <StudentNavBar></StudentNavBar>
        </div>
    )
}