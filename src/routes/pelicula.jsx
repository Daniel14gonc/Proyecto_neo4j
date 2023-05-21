import React, { Fragment, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './pelicula.css'

const Anuncio = ({setAnun, anuncio}) =>{
    console.log(anuncio)
    return(
        <Fragment>
            <div className='cualq'>
                <div className='modal-content' style={{backgroundImage:`url(${anuncio.link})`, backgroundSize:'100% 100%'}}>
                    <button className='cerrar' onClick={() => setAnun(false)}></button>
                </div>
            </div>
            <div className='modal-container'></div>
        </Fragment>
    )

}


const Pelicula = () => {

    const navigate = useNavigate()

    const [clik,setClik] = React.useState(false)
    const [megust,setMegust] = React.useState(false)
    const [anun, setAnun] = React.useState(false)
    const interval = useRef(null)
    const tipo = useRef(null)
    const [anuncio,setAnuncio] = React.useState(null)

    const imagen = window.sessionStorage.getItem('pelicula')
    const link = window.sessionStorage.getItem('link')
    const nombre = window.sessionStorage.getItem('nombre')
    

    const regreso = () => {
        window.sessionStorage.removeItem('pelicula')
        window.sessionStorage.removeItem('link')
        window.sessionStorage.removeItem('nombre')
        clearInterval(interval.current)
        navigate('/home')
    }

    const terminado = () => {
        const url = 'http://localhost:5000/watched-movie/'
        const user = window.localStorage.getItem('user')
        const response = fetch(url, {
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": user,
                "title": nombre,
                "finished": true
            })
        })
        navigate('/home')
    }

    const watchMovie = async () => {
        const url = 'http://localhost:5000/watched-movie/'
        const user = window.localStorage.getItem('user')
        const response = await fetch(url, {
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": user,
                "title": nombre,
                "finished": false
            })
        })
      
        const responseJson = await response.json()
        console.log(responseJson)
        return await responseJson
    }

    const likeMovie = async () => {
        const url = 'http://localhost:5000/watched-movie/'
        const user = window.localStorage.getItem('user')
        const response = await fetch(url, {
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": user,
                "title": nombre,
                "liked": !megust
            })
        })
      
        const responseJson = await response.json()
        setMegust(!megust)
        return await responseJson
    }

    useEffect( ()=>{ async function favoritito(){
        const url ='http://127.0.0.1:5000/movie/'
        const todos = await fetch(url,{
            method:'GET',
            headers: {
                'username' : window.localStorage.getItem('user'),
                'movie': nombre
            }
        })

        const res = await todos.json()
        await setMegust(res.liked)
    }
    favoritito()
    },[])

    return (
        <div className='containerPelicula'>
            {anun && <Anuncio setAnun={setAnun} anuncio={anuncio}/>}
            <div className='headerPelicula'>
                <div onClick={() => regreso()}></div>
            </div>
            <div className='filmHolder'  style={{backgroundImage:`url(${imagen})`, backgroundSize:'100% 100%'}}>
                <a href={link} onClick={watchMovie} target="_blank" style={{textDecoration:'none', display:'flex', flexDirection: 'row', color:'black', fontSize: '20px'}} rel="noopener noreferrer">
                    <div></div>
                </a>
            </div>
            <div className='buttonholderc'>
                <div className={megust ? 'liked' : 'disliked'} onClick={likeMovie}></div>
                <button className='completado' onClick={() => terminado()} >Completado</button>
            </div>
        </div>
    )
}

export default Pelicula