import { StudentNavBar } from "../../components/studentNavBar"
import { useEffect, useState } from "react"
// import { EditStudentProfile } from "./editStudentProfile.js"

export const StudentPage = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [student,SetStudent] = useState()
    useEffect(() => {
        try {
            // const respone = async () => fetch('/getstudent',{
            //     method:"POST",
            //     headers:{
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({id:'20110432'}),
            // })
            // const data = respone.json()
            // console.log(data)
            // setIsLoading(false)
            fetch('/getstudent', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: '20110432' }),
            })
                .then((respone) => {
                    console.log(respone)
                    respone.json()
                        .then((data) => {
                            console.log(data.studentinfo)
                            setIsLoading(false)
                            props.setStudent(data.studentinfo)
                        })
                })
        }
        catch (err) {
            console.log(err)
        }
    }, [])
    if (isLoading) return <h1>Loading</h1>
    console.log(props.s)
    return (
        <div>
            <StudentNavBar></StudentNavBar>
        </div>
    )
}