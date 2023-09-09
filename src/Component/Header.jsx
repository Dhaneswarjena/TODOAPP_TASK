import React, { useContext,useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { context,server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";
const Header = () => {
    const {isauth,setisauth,load,setload}=useContext(context)
    const logoutHandler=async(e)=>{
        e.preventDefault();
        setload(true)
        try {
           const { data } = await axios.get(
             `${server}/users/logout`,
            
             {
               withCredentials: true,
             }
           );
           toast.success('logged out successfully !!!');
           setisauth(false)
           setload(false)
         } catch (error) {
           toast.error(error.response.data.message);
           setisauth(true)
           setload(false)
         }
        }
  return (
    <div className="topnav">
      <div style={{ float: "left" }}>
        <Link to={"/"}>Todo App</Link>
      </div>
      <div style={{ float: "right" }}>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {
            isauth? <Link onClick={logoutHandler} disabled={load}>Logout</Link>:<Link to={"/login"}>Login</Link>
        }
        
       
      </div>
    </div>
  );
};

export default Header;
