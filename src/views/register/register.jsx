import './register.css'
import background from '../../assets/background-login.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Register = () => {

    const divStyle = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };

    const borderStyle = {
        border: '1px solid #df7204'
    }

    const navigation = useNavigate()
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [age, setAge] = useState("")
    const [selectedValue, setSelectedValue] = useState("Selecciona tu tipo de suscripción")
    const [error, setError] = useState("")

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

    const validateNumber = (number) => {
        return !isNaN(number)
    }

    const handleAgeChange = (event) => {
        if (validateNumber(event.target.value)) {
            setError('')
            setAge(event.target.value)
        }
        else {
            setError('Ingresa un número válido')
        }
    }

    const handleSelectorChange = (event) => {
        setSelectedValue(event.target.value)
    }

    const register = () => {
        if (user === '' || password === '' || age === '' || selectedValue === 'Selecciona tu tipo de suscripción') {
            setError('Ingresa todos los campos')
        }
        else {
            console.log('siu')
        }
    }

    return (
        <div className="login" style = {divStyle}>
            <div className="register-container">
                <div className='message-container-login'>
                    <p className='login-message'>Regístrate</p>
                </div>
                <div className='info-container'>
                    <input style={user === '' ? borderStyle : {}} onChange={handleUserChange} className='login-input' placeholder='Ingresa tu usuario'></input>
                    <input style={password === '' ? borderStyle : {}} onChange={handlePasswordChange} type='password' className='login-input' placeholder='Ingresa tu contraseña'></input>
                    <input style={age === '' ? borderStyle : {}} onChange={handleAgeChange} className='login-input' placeholder='Ingresa tu edad'></input>
                    <select style={selectedValue === 'Selecciona tu tipo de suscripción' ? borderStyle : {}} onChange={handleSelectorChange} className='suscription-selector'>
                        <option value="" disabled selected>Selecciona tu tipo de suscripción</option>
                        <option value="Basica">Básica</option>
                        <option value="Estandar">Estándar</option>
                        <option value="Premium">Premium</option>
                    </select>
                    { error && <div className='error-message'>{error}</div>}
                    <div className='login-button' onClick={register}>Registrarse</div>
                </div>
            </div>
        </div>
    )

}

export default Register