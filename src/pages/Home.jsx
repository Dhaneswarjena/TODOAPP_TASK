import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { context, server } from "../main";
import toast from "react-hot-toast";
import Todoitem from "../Component/Todoitem";
import { Navigate } from "react-router-dom";
const Home = () => {
  const {isauth}=useContext(context)
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [load,setload]=useState(false)
  const[task,settasks]=useState([])
  const[refresh,setrefrsh]=useState(false)
  const updateHndler=async(id)=>{
    try {
      const {data}=await axios.put(`${server}/users/task/${id}`,{},{
        withCredentials:true
      })
       toast.success(data.message)
       setrefrsh((prev)=>!prev)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  const deletHndler=async(id)=>{
    try {
      const {data}=await axios.delete(`${server}/users/task/${id}`,{
        withCredentials:true
      })
       toast.success(data.message)
       setrefrsh((prev)=>!prev)
    } catch (error) {
      toast.error(error.response.data.message)
    }
 }
  const submitHandler = async (e) => {
    setload(true)
    e.preventDefault()
    try {
      const { data } = await axios.post(
        `${server}/users/task/newtask`,
        {
          title,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setload(false)
      setrefrsh((prev)=>!prev)
    } catch (error) {
      toast.error(error.response.data.message);
      setload(false)
    }
   
  };
 useEffect(()=>{
  axios.get(`${server}/users/task/taskdetail`,{
    withCredentials:true
  }).then((res)=>{
    settasks(res.data.task)
  }).catch((e)=>{
    toast.error(e.response.data.message)
    settasks({})
  })
},[refresh])
if(!isauth) return <Navigate to={'/login'} />
  return (
    
    <div className="pad50">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          onChange={(e) => settitle(e.target.value)}
          value={title}
          required
        />
        <input
          type="text"
          onChange={(e) => setdescription(e.target.value)}
          value={description}
          required
        />
        <button type="submit" disabled={load} className="signup">
          Add Task
        </button>
      </form>
      <div>
         {
          task.map((ele)=>{
            
            return <Todoitem 
            title={ele.title}
             description={ele.description} 
             isCompleted={ele.isCompleted} 
              id={ele._id}
              key={ele._id}
              updateHndler={updateHndler}
              deletHndler={deletHndler}
             />
          })
         }
      </div>
    </div>
  );
};

export default Home;
