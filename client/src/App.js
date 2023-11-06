// import './App.css';
import { NavigationBar } from "./components/NavBar.js"
import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import * as api from './api/apiColections.js'
import { LandingPage } from "./pages/landingPage.js"

function App() {

  const [loading, setLoading] = useState(false)


  if (loading) return <h1>Loading...</h1>

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
