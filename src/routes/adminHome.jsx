import { useState  } from 'react'
import './adminHome.css'


const AdminHome = () => {

    const [resultado, setResultado] = useState('')
    const [query, setQuery] = useState('')
    
    const MakeQuery = async() =>{
        const url = 'http://localhost:5000/admin/'
        const response = await fetch(url, {
        method:'GET',
        headers: {
            'query' : query,
        }
        })

        const responseJson = await response.json()
        setResultado(responseJson)
    }


    const handleQueryChange = (event) => {
        if (event.target.value === '') {
            setResultado('Query vacío')
        }
        else {
            setResultado('')
        }
        setQuery(event.target.value)
    }


    return (
        <div className="adminContainer">
            <div className="header">
            <div className='logo-netflix'/>

            </div>
            <div className="adminMenu">
            <textarea placeholder="Escriba su query aquí..." className="terminal" rows="12" cols ="5" onChange={handleQueryChange}></textarea>
            <button className="send" onClick={MakeQuery}>Enviar</button>

            <textarea defaultValue={resultado} placeholder="Respuesta" className="recibed" rows="12" cols ="5"></textarea>

            </div>
        </div>
    )
}

export default AdminHome