import React from 'react'
import { Link } from "react-router-dom"
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/authContext'


const Login = () => {

  const [inputs, setInputs] = useState({
    username : "",
    email : "",
  });

  const [err,setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext)

  const handleChange = (e) =>{
    setInputs(prev =>({...prev,[e.target.name]: e.target.value}))
  }

  const handleSubmit = async e=>{
    e.preventDefault()
    try{
      login(inputs)
      navigate("/")
      // console.log(res)
    }
    catch(err){
      // console.log(err)
      setError(err.response.data)
    }

  }

  return (
    <div className='auth'>
      <h1>Login</h1>
      <form action="">
        <input type="text" placeholder='Username' onChange={handleChange} name='username'/>
        <input type="password" placeholder='Password' onChange={handleChange} name='password'/>
        <button onClick={handleSubmit} >Login</button>
        {err && <p>{err}</p>}
        <span>Don't have an account? <Link to='/register'>Register</Link></span>
      </form>
    </div>
  )
}

export default Login