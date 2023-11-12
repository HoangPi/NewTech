// @ts-ignore 
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import * as api from '../api/apiColections.js'
import { useNavigate } from "react-router-dom"

export const SignIn = () => {
    var signInOption=true
    const navigate = useNavigate()
    const changeToStudent = ()=>{
        signInOption=true
        console.log(signInOption)
    }
    const changeToInstructor = ()=>{
        signInOption=false
        console.log(signInOption)
        
    }


    function handleCallbackResponse(response) {
        var userObject = jwtDecode(response.credential)
        // console.log(userObject)
        if(signInOption===true){
            //for student
            console.log("student")
            const str1= userObject.email.split('@')
            const str2=str1[1].split('.')
            if(str2[0]==='student'){
                api.setStudentSession(str1[0])
                    .then((data)=>{
                        console.log(data)
                        if(data.studentinfo!==null && typeof(data.studentinfo)!=='undefined') navigate("/studenthomepage")
                        else alert("User does not exist in the system")
                        // data.state && navigate("/studenthomepage")
                    })
            }}
        else{
            //for instructor
            console.log("instructor")
            api.setInstructorSession(userObject.email)
                .then((data)=>{
                    data.status ? navigate('/instructorhomepage') : alert("User does not exist in the system")
                })
        }
    }
    useEffect(() => {
        /* global google*/
        google.accounts.id.initialize({
            client_id: "541620878807-d6nl3gm9mi95oi7g5rho66muav3vemcb.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }

        )
    }, [])

    return (
        <main class="form-signin w-100 m-auto">
            <form style={{ paddingLeft: "25%", paddingRight: "25%" }}>
                {/* <img class="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" /> */}
                <h1 class="h3 mb-3 fw-normal">Please sign in using your Google account</h1>
                <div style={{ paddingLeft: "25%",paddingRight:"25%" }} id="signInDiv"></div>
                <div onClick={changeToStudent} class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={signInOption}/>
                    <label class="form-check-label" for="flexRadioDefault1">
                        Sign in as student
                    </label>
                </div>
                <div onClick={changeToInstructor} class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  />
                    <label class="form-check-label" for="flexRadioDefault2">
                        Sign in as instructor
                    </label>
                </div>
                <p class="mt-5 mb-3 text-body-secondary">© 2017–2023</p>
            </form>
        </main>
    )
}