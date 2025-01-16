import React, { useState } from 'react'
import AddTaskBar from './Components/AddTaskBar'
import TodoApp from './Components/TodoApp'
import { ThemeContext } from './contexts.js'
const App = () => {
  const [theme,setTheme] = useState('dark')
  const handlethemeChange = ()=>{
    setTheme((t)=>{
      if(t==='light'){
        return 'dark'
      }
      return 'light'
    })
  }
  const forTheme = {theme,handlethemeChange}
  return (
    <ThemeContext.Provider value={forTheme}>
      <div><TodoApp/></div>
    </ThemeContext.Provider>
  )
}

export default App