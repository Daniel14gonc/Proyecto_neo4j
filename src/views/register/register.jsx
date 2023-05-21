import './register.css'
import background from '../../assets/background-login.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const registerUser = async (user, password, age, subscription) => {
    const url = 'http://localhost:5000/user/';
    const response = await fetch(url, {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": user,
            "password": password,
            "age": age,
            "subscription": subscription
        })
    })

    const responseJson = await response.json()
    return await responseJson
}

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

    const register = async () => {
        if (user === '' || password === '' || age === '' || selectedValue === 'Selecciona tu tipo de suscripción') {
            setError('Ingresa todos los campos')
        }
        else {
            const response = await registerUser(user, password, age, selectedValue)
            console.log(response)
            if (response.status === 'User already exists') {
                setError('El usuario ya existe')
            }
            else if (response.status === 'error') {
                setError('Error al registrar el usuario')
            }
            else {
                window.localStorage.setItem('user', user)
                navigation('/home')
            }
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
                        <option value="Free">Free</option>
                        <option value="Basic">Basic</option>
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