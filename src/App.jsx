import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './login';

import StudentDashboard from './dashboard';
import Admin from "./admin";
import AdminLogin from "./adminLogin";
import HackathonsPage from "./Hackathons";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<Login/>} />
        <Route path='adminlogin' element={<AdminLogin/>} />
        <Route path='dashboard' element={<StudentDashboard/>} />
        <Route path='admin' element={<Admin/>} />
        <Route path='hackathons' element={<HackathonsPage/>}/>
        
       
      </Routes>
    </BrowserRouter>
  )
}

export default App
