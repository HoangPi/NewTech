// @ts-ignore 
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import * as api from '../api/apiColections.js'
import { useNavigate } from "react-router-dom"
import styles from "../public/styles.module.css";

export const SignIn = () => {
    var signInOption = true
    const navigate = useNavigate()

    const handleSignInOptionOnChange=(ev)=>{
        signInOption=(ev.target.value==='Student')
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
        <main className="form-signin w-100 m-auto h-auto">
            <div className={styles.containerBig}>
                <div style={{ padding: "0 25%"}} >
                    <div className={styles.container}>
                    <h1 className={styles.heading}>Login </h1>
                    <div className={styles.form_container}>
                        <div className={styles.left}>
                            <img className={styles.img} src="http://hcmute.edu.vn/Resources/Images/SubDomain/icsse2017/HCMUTE.jpg" alt="login" />
                        </div>
                        <div className={styles.right}>
                            <h2 className={styles.from_heading} >Welcome Log in</h2>
                            <div className={styles.google_btn} id="signInDiv" style={{'margin-top': '60px'}} ></div>
                            <h2 class="p-0" style={{color: '#2c444e',fontSize:'20px',fontWeight:'400'}}>Select Your Roll</h2>
                            <select onChange={handleSignInOptionOnChange} class="form-select w-50" aria-label="Default select example">
                                <option selected>Student</option>
                                <option >Instructor</option>
                            </select>
                            <button onClick={()=>{console.log(signInOption)}}>Test</button>
                            <p className="mt-5 mb-3 text-body-secondary">© 2017–2023</p>
                        </div>
                        </div>
                    </div>
                    {/* <img class="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" /> */}
                    
                    
                    
                </div>
            </div>
        </main>
    )
}