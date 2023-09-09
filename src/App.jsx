import React, { useContext,useEffect } from 'react'
import { BrowserRouter as Routers,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Header from './Component/Header';
import axios from 'axios';
import { server } from './main';
import { context } from './main';
import { Toaster } from 'react-hot-toast';
const App = () => {
  const {setisauth,setload,setuser}=useContext(context)
  
  return (
    <div>
      <Routers>
      <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/profile" element={<Profile />}/>
        </Routes>
      </Routers>
      <Toaster />
    </div>
  )
}

export default App