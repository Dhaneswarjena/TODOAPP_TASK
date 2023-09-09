import axios from "axios";
import React, { useContext, useState } from "react";
import { context, server } from "../main";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const Login = () => {
    const {isauth,setisauth,load,setload,setuser}=useContext(context)
    const[email,setemail]=useState('')
    const[password,setpassword]=useState('')
   
    const submitHandler=async(e)=>{
      setload(true)
     e.preventDefault();
    
     try {
        const { data } = await axios.post(
          `${server}/users/login`,
          {
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
        setisauth(true);
        setload(false)
      } catch (error) {
        toast.error(error.response.data.message);
        setisauth(false)
        setload(false)
      }
      const fundata=() => {
        setload(true);
        axios
          .get(`${server}/users/me`, {
            withCredentials: true,
          })
          .then((res) => {
            setuser(res.data.user);
            setisauth(true);
            setload(false);
          })
          .catch((error) => {
            setuser({});
            setisauth(false);
            setload(false);
          });
      }
      fundata()
    }

    if(isauth) return <Navigate to="/" />
  return (
    <div className="pad50">
    <form onSubmit={submitHandler}>
    <label>Email</label>
        <input type="text" onChange={(e)=>setemail(e.target.value)} value={email} required/>
        <label>Password</label>
        <input type="Password" onChange={(e)=>setpassword(e.target.value)} value={password} required/>
        <button type="submit" disabled={load} className="signup">Sign In</button>
        <h4>Or</h4>
        <button type="submit" className="signin">Sign Up</button>
    </form>
  </div>
  )
}

export default Login