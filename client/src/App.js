// import './App.css';
import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LandingPage } from "./pages/landingPage.js"
import { StudentPage } from "./pages/student/studentPage.js"
import { EditStudentProfile } from "./pages/student/editStudentProfile.js"
import { SignIn } from './pages/signin.js'
import { InstructorPage } from './pages/instructor/instructorPage.js'
import { InstructorProfile } from './pages/instructor/instructorProfile.js'
import { ManageThesis } from './pages/instructor/mangeThesis.js'
import { AddThesis } from './pages/instructor/addThesis.js'
import { ThesisDetail } from './pages/instructor/thesisDetail.js'
import { StudentThesis } from './pages/student/studentthesis.js'
import { ProposeThesis } from './pages/instructor/proposeThesis.js'
import { JoinThesis } from './pages/student/joinThesis.js'
import { ViewPendingThesis } from './pages/student/viewPendingThesis.js'

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
          <Route path='/instructorhomepage' element={<InstructorPage/>}></Route>
          <Route path='/instructorprofile' element={<InstructorProfile></InstructorProfile>}></Route>
          <Route path='/instructortheses' element={<ManageThesis></ManageThesis>}></Route>
          <Route path='/addthesis' element={<AddThesis></AddThesis>}></Route>
          <Route path='/thesisdetail' element={<ThesisDetail></ThesisDetail>}></Route>
          <Route path='/viewmythesis' element={<StudentThesis/>}></Route>
          <Route path='/proposethesis' element={<ProposeThesis></ProposeThesis>}></Route>
          <Route path='jointhesis' element={<JoinThesis/>}></Route>
          <Route path='pendingthesis' element={<ViewPendingThesis></ViewPendingThesis>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
