/* eslint-disable */

import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './modal.css'

const updateSaga = async(sagaName, movie, character) => {
    console.log(sagaName, movie, character)
    const url = 'http://localhost:5000/fan-of/'
    const user = window.localStorage.getItem('user')
    const bodyV = {
        'user' : user,
        'saga' : sagaName,
    }
    if (movie !== undefined) {
        bodyV.movie = movie
    }
    else {
        bodyV.movie = null
    }

    if (character !== undefined) {
        bodyV.character = character
    }
    else {
        bodyV.character = null
    }

    const response = await fetch(url, {
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyV)
    })
        
    const responseJson = await response.json()
    console.log(responseJson)
    return await responseJson
}

const getActors = async(sagaName) => {
    const url = 'http://localhost:5000/saga-actors/'

    const response = await fetch(url, {
        method:'GET',
        headers: {
            'saga': sagaName
        }
    })
        
    const responseJson = await response.json()
    return await responseJson
}

const getMovies = async(sagaName) => {
    const url = 'http://localhost:5000/saga-movies/'
    const response = await fetch(url, {
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
            'saga': sagaName
        }
    })

    const responseJson = await response.json()
    return await responseJson
}

const Modal = ({ sagaName, sagaMovies, close }) => {
    console.log(sagaMovies)

    const [actor, setActor] = useState(undefined)
    const [movie, setMovie] = useState(undefined)
    const [actors, setActors] = useState([])
    const [movies, setMovies] = useState([])

    useEffect(() => {
        async function info() {
          try {
            const response = await getMovies(sagaName)
            setMovies(response)

          } catch (error) {
            // Manejar errores aquí
          }
        }
        info();
      }, [])

    const handleCharacterChange = (event) => {
        setActor(event.target.value)
    }

    const handleSaga = async () => {
        const response = await updateSaga(sagaName, movie, actor)
        close()
    }

    const handleMovieChange = (event) => {
        setMovie(event.target.value)
    }

    return (
        <div className='container-modal'>
            <div className='modal'>
                <div className='exit' onClick={close}></div>  
                <div className='modal-content2'>
                    <div style={{marginBottom: '10px'}}>Elige tu pelicula favorita</div>
                    <select onChange={handleMovieChange} className='suscription-selector'>
                        <option value="" disabled selected>Tu pelicula favorita</option>
                        {
                            movies.map((movie) => <option value={movie.Title}>{movie.Title}</option>)
                        }
                    </select>
                    <div style={{marginBottom: '10px'}}>Elige tu personaje favorito</div>
                    <input onChange={handleCharacterChange} className='login-input' placeholder='Ingresa tu personaje'></input>
                    <div onClick={handleSaga} className='login-button'>Listo</div>
                </div>
            </div>
        </div>
    )
}

export default Modal