import React, { useContext, useEffect, useState } from 'react'
import './ToDoApp.css'
import AddTaskBar from './AddTaskBar'
import TaskCard from './TaskCard'
import { getall } from '../requests.js'
import { MdModeNight,MdLightMode } from "react-icons/md";
import { ThemeContext } from '../contexts.js'


const TodoApp = () => {
  const [data,setData] = useState()
  const {theme,handlethemeChange} = useContext(ThemeContext)
  useEffect( ()=>{
    async function getdata(){

        const result = await getall();
        setData(result)
    }
    getdata()
  },)
  return (
    <>
    {(theme==='dark')?<MdModeNight className='themebutton' onClick={
      ()=>{handlethemeChange()
        document.documentElement.style.setProperty('background-color', '#1D1616');
      }}
    />:< MdLightMode style={{color:"white"}} className='themebutton' onClick={
      ()=>{handlethemeChange()
        document.documentElement.style.setProperty('background-color', 'antiquewhite');
      }}
    />}
    <div className={`main${(theme==='dark')?'-dark':''}`}>
        <AddTaskBar/>
        {data ?data.map((task)=><TaskCard key={task._id} task={task} />) :<h1>loading...</h1>}
    </div>
    </>
  )
}

export default TodoApp