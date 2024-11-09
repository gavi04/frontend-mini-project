import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './login';
import LandingPage from './landingPage';
import StudentDashboard from './dashboard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path='login' element={<Login/>} />
        <Route path='dashboard' element={<StudentDashboard/>} />
         
       
      </Routes>
    </BrowserRouter>
  )
}

export default App
