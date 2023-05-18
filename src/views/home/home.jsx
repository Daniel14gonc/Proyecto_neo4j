/* eslint-disable */

import './home.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import background from '../../assets/marvel.jpg'



import MovieCarrusel from './../../components/movieCarrusel/movieCarrusel'
import TitleBar from './../../components/titleBar/titleBar'

const Home = () => {

    var movie1 = {
        codigo: "1",
        name: "Avengers Endgame",
        imagen: "https://m.media-amazon.com/images/I/91uDfBjwfFL._AC_SX522_.jpg",
    }

    var movie2 = {
        codigo: "2",
        name: "Star Wars",
        imagen: "https://i.blogs.es/1da08b/1366_2000-9-/1366_2000.jpeg",
    }


    const [vistos, setVistos] = useState([movie1,movie2])
    const [viendo, setViendo] = useState([movie1,movie2])
    const [sugerencias, setSugerencias] = useState([movie1,movie2])
    const [favoritos, setFavoritos] = useState([movie1,movie2])

    return (
        <div className="body">

            <TitleBar 
            name={"JUANITO"}
            subscription={"Free"}/>
            <MovieCarrusel name={"Sugerencias"} movies={viendo} boton={true} />
            <MovieCarrusel name={"Saga"} movies={sugerencias} boton={false}/>
            <MovieCarrusel name={"Me gusta"} movies={favoritos} boton={false} />
            <MovieCarrusel name={"Visto"} movies={vistos} boton={false} />
        </div>
    )

}

export default Home