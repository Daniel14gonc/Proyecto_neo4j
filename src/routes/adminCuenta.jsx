import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './adminCuenta.css'

const AdminCuenta = () => {
  const navigate = useNavigate()
  const url = 'http://localhost:5000/my-account/'


  const [tipo, setTipo] = useState(null)
  const [tipoactivo, setTipoactivo] = useState([false, false, false])

  const fetchTipo = async() =>{
    const user = window.localStorage.getItem('user')

    const response = await fetch(url, {
      method:'GET',
      headers: {
        'username' : user
      }
    })
        
    const responseJson = await response.json()
    return await responseJson
  }

  

  const fetchNuevoTipo = async() =>{
    const user = window.localStorage.getItem('user')

    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        'suscription': tipo,
        'username': user,
      })
    })
    navigate('/home')
  } 

  const regresoHome = () => {
    navigate('/home')
  }

  const handleRadio = (event) => {
    handleButtons(event.target.value)
  }

  const handleButtons = (name) => {
    if(name === 'Free'){
      setTipoactivo([true , false, false])
      setTipo(name) 
    }
    if(name === 'Basic'){
      setTipoactivo([false , true, false])
      setTipo(name) 
    }
    if(name === 'Premium') {
      setTipoactivo([false , false, true])
      setTipo(name) 
    }
  }

  useEffect( () => { async function cambioTipo() { 
      
    const response = await fetchTipo()
    await setTipo(response.subscription)
    
    if(response['subscription'] ==='Free'){
      setTipoactivo([true, false, false])
    }else if(response['subscription'] ==='Basic'){
      setTipoactivo([false, true, false])
    }else{
      setTipoactivo([false, false, true])
    }
  } 
  cambioTipo()
}, [])

  const cuenta = window.localStorage.getItem('user')

    return(
        <div className="containeradCuenta">
          <div className="headercito1"><div className="regreso" onClick={()=> regresoHome()}/></div>
          <div className='fondo'>
            <div className="adCuenta">
              <p className="texto">{cuenta}</p>
            </div>
            <div className='accountholder1'>
              <div className='acctype1'>
                <div>
                  <input type = 'radio' id = 'Free' value='Free' checked = {tipoactivo[0]} onChange = {handleRadio} />
                  <label htmlFor = 'Free'>Free</label> 
                </div>
              </div>
              <div className='acctype1'>
                <div>
                  <input type = 'radio' id = 'Basic' value='Basic' checked = {tipoactivo[1]} onChange = {handleRadio}/>
                  <label htmlFor = 'Basic'>Basic</label>
                </div>
              </div>
              <div className='acctype1'>
                <div>
                  <input type = 'radio' id = 'Premium' value='Premium' checked = {tipoactivo[2]} onChange = {handleRadio}/>
                  <label htmlFor = 'Premium'>Premium</label>
                </div>
              </div>
            </div>
            <button className='adConfirmar' onClick={fetchNuevoTipo}>Aplicar cambios</button>
          </div>
        </div>
    )

}

export default AdminCuenta