import './login.css'
import background from '../../assets/background-login.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {

    const divStyle = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };

    const navigation = useNavigate()
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const borderStyle = {
        border: '1px solid #df7204'
    }

    const navigateHome = () => {
        if (user === '' || password === '') {
            setError('Ingresa todos los campos')
        }
        else {
            navigation('/home')
        }
    }

    const navigateRegister = () => {
        navigation('/register')
    }

    const handleUserChange = (event) => {
        if (event.target.value === '') {
            setError('Ingresa un usuario')
        }
        else {
            setError('')
        }
        setUser(event.target.value)
    }

    const handlePasswordChange = (event) => {  
        if (event.target.value === '') {
            setError('Ingresa una contraseña')
        }
        else {
            setError('')
        }
        setPassword(event.target.value)
    }
    

    return (
        <div className="login" style = {divStyle}>
            <div className="login-container">
                <div className='message-container-login'>
                    <p className='login-message'>Inicia Sesión</p>
                </div>
                <div className='info-container'>
                <input style={user === '' ? borderStyle : {}} onChange={handleUserChange} className='login-input' placeholder='Ingresa tu usuario'></input>
                    <input style={password === '' ? borderStyle : {}} onChange={handlePasswordChange} type='password' className='login-input' placeholder='Ingresa tu contraseña'></input>
                    { error && <div className='error-message'>{error}</div>}
                    <div className='login-button' onClick={navigateHome}>Ingresar</div>
                </div>
                <div className='register-redirection'>
                    <p>¿No tienes cuenta?</p><div onClick={navigateRegister}>Registrate</div>
                </div>
            </div>
        </div>
    )

}

export default Login