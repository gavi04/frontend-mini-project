import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './login';

import StudentDashboard from './dashboard';
import Admin from "./admin";
import AdminLogin from "./adminLogin";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<Login/>} />
        <Route path='adminlogin' element={<AdminLogin/>} />
        <Route path='dashboard' element={<StudentDashboard/>} />
        <Route path='admin' element={<Admin/>} />
         
       
      </Routes>
    </BrowserRouter>
  )
}

export default App
