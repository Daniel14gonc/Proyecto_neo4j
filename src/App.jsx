import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Login from './views/login/login'
import Home from './routes/home'
import Register from './views/register/register'
import Pelicula from './routes/pelicula'
import AdminCuenta from './routes/adminCuenta'
import AdminHome from './routes/adminHome'


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
        <Route path="/pelicula" exact element={<Pelicula/>} />
        <Route path="/adminCuenta" exact element={<AdminCuenta/>} />
        <Route path="/admin" exact element={<AdminHome/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App