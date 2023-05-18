/* eslint-disable */
import './movieCarrusel.css';

const MovieCarrusel = ({name, movies,setMovieView, boton}) => (
  <div className="content-home">
    <h1>{name}</h1>
    <hr></hr>
    <div className="movies">
    {
      movies.length === 0 ? 
        <div>
            <h1>No se encontraron resultados...</h1>
        </div>
        :
        <div className="scroll">{
          movies.map( (movie) => (
              <div onClick={()=>setMovieView([true,movie,boton])}
                key = {movie.codigo}
                className ="movie-s"
                style = {{ backgroundImage: `url(${movie.imagen})`}} />
            )
          )
        }
      </div>
    }
    </div>
  </div>
)

export default MovieCarrusel