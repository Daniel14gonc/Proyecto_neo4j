import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Login from './views/login/login'
import Home from './views/home/home'
import Register from './views/register/register'


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

const  App = () => {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login/>} />
        <Route path="/home" exact element={<Home/>} />
        <Route path="/register" exact element={<Register/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App