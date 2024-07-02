import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/home";
import Login from "./component/login";
import Register from "./component/register";
import ProtectedRoutes from './services/ProtectedRoutes';
import Problemset from './component/Problemset';
import Submitted from './component/Submitted';
const App = () => {
  return (
    <>
     <BrowserRouter>
       <Routes>
       <Route path="/login" element={<Login/>}/>
       <Route path="/register" element={<Register/>}/>
       <Route path="/problemset" element={<Problemset/>}/>
       <Route path="/submitted" element={<Submitted/>}/>
       {/*protected routes*/}
        <Route path='/' element={<ProtectedRoutes/>}>
           <Route path="/" element={<Home/>}/>
        </Route>
       </Routes>
     </BrowserRouter>
    </>
  )
}

export default App