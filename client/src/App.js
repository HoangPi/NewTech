// import './App.css';
import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LandingPage } from "./pages/landingPage.js"
import { StudentPage } from "./pages/student/studentPage.js"
import { EditStudentProfile } from "./pages/student/editStudentProfile.js"
import { SignIn } from './pages/signin.js'

function App() {

  const [student,setStudent] = useState()
  // function handleCallbackResponse(response){
  //   var userObject = jwtDecode(response.credential)
  //   console.log(userObject)
  // }
  // useEffect(() => {
  //   /* global google*/
  //   google.accounts.id.initialize({
  //     client_id: "541620878807-d6nl3gm9mi95oi7g5rho66muav3vemcb.apps.googleusercontent.com",
  //     callback: handleCallbackResponse
  //   })
  //   google.accounts.id.renderButton(
  //     document.getElementById("signInDiv"),
  //     {theme: "outline", size: "large"}

  //   )
  // },[])

  
  return (
    <div className="App">
      {/* <div id="signInDiv"></div> */}
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path='/studenthomepage' element={<StudentPage setStudent={setStudent}/>}/>
          <Route path='/editstudentprofile' element={<EditStudentProfile />} />
          <Route path='/signin' element={<SignIn></SignIn>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
