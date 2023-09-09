import React, { createContext,useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
export const server="https://todo-app-8v4p.onrender.com/api/v1"
export const context =createContext({isauth:false})
const Appcontext=()=>{
  const[isauth,setisauth]=useState(false)
  const[load,setload]=useState(false)
  const[user,setuser]=useState({})
 return <context.Provider value={{isauth,setisauth,load,setload,user,setuser}}>
   <App />
  </context.Provider>
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Appcontext />
  </React.StrictMode>,
)
