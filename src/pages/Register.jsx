import axios from "axios";
import React, { useContext, useState } from "react";
import { context, server } from "../main";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
const Register = () => {
    const {isauth,setisauth,load,setload}=useContext(context)
    const[name,setname]=useState('')
    const[email,setemail]=useState('')
    const[password,setpassword]=useState('')
    const submitHandler=async(e)=>{
      setload(true)
     e.preventDefault();
     try {
        const { data } = await axios.post(
          `${server}/users/new`,
          {
            name,
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        toast.success(data.message);
        setisauth(true)
        setload(false)
      } catch (error) {
        toast.error(error.response.data.message);
        setisauth(false)
        setload(false)
      }
    }
    if(isauth) return <Navigate to={"/"} />
  return (
    <div className="pad50">
      <form onSubmit={submitHandler}>
        <label>Name</label>
        <input type="text" onChange={(e)=>setname(e.target.value)} value={name} required/>
        <label>Email</label>
        <input type="text" onChange={(e)=>setemail(e.target.value)} value={email} required/>
        <label>Password</label>
        <input type="Password" onChange={(e)=>setpassword(e.target.value)} value={password} required/>
        <button type="submit" className="signup">Sign Up</button>
        <h4>Or</h4>
        <button type="submit" className="signin">Sign In</button>
      </form>
    </div>
  );
};

export default Register;
