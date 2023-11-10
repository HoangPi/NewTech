// import './App.css';
import React, { useState } from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LandingPage } from "./pages/landingPage.js"
import { StudentPage } from "./pages/student/studentPage.js"
import { EditStudentProfile } from "./pages/student/editStudentProfile.js"

function App() {

  const [student,setStudent] = useState()

  console.log(student)
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path='/studenthomepage' element={<StudentPage setStudent={setStudent}/>}/>
          <Route path='/editstudentprofile' element={<EditStudentProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
