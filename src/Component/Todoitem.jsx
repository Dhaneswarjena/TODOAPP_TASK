import React from 'react'

const Todoitem = ({title,description,isCompleted,updateHndler,deletHndler,id}) => {
  return (
    <div className='pad50 taskdiv' >
    <div style={{display:'flex',width:'100%'}}>
     <div style={{float:'left'}}>
     <h4>{title}</h4>
     <p>{description}</p>
     </div>
     <div style={{float:'right'}}>
        <input onChange={()=>updateHndler(id)} type="checkbox" checked={isCompleted}/>
        <button onClick={()=>deletHndler(id)} type="button">Delete</button>
     </div>
    </div>
    </div>
  )
}

export default Todoitem