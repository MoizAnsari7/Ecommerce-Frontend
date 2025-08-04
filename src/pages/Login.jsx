import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import toast from 'react-hot-toast';
import api from '../api';

function Login() {

  const navigate = useNavigate();
  const [ formData, setFormData ] = useState({email : "" , password : "", rememberMe : false});
  
  function changeHandler(event){
    setFormData((prev)=>{
        return({
            ...prev,
            [event.target.name] : event.target.type ==="checkbox" ? event.target.checked : event.target.value
        })
    })
  }

  async function handleSubmit(event){
    event.preventDefault();   
    try{
      const res = await api.post("/userLogin", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success(res.data.message);
      
      if(res.data.user.role === "Seller") {
        navigate("/sellerDashboard");
      } else {
        navigate("/");
      }
    }
    catch(error){
      console.log(error)
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token) {
      if (user.role === "Seller") {
        navigate("/sellerDashboard");
      } else {
        navigate("/");
      }
    }
  }, []);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Sign in to your account</h2>
        <form onSubmit={handleSubmit}>

          <label htmlFor="email">Email address</label>
          <input 
            type="email" 
            id="email" 
            className='loginInput'
            placeholder="example@mail.com"
            name="email"
            onChange={changeHandler}
            required 
          />

          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password"
            className='loginInput'
            placeholder="Enter your password"
            name='password'
            onChange={changeHandler}
            required 
          />

          <div className='rememberMeContainer'>
            <input 
                type='checkbox' 
                id='remeberMe'
                name='rememberMe'
                onChange={changeHandler}
            />
            <label htmlFor='remeberMe' className='remember-label'>Remember Me</label>
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="signup-link">
          Don't have an account? <span onClick={() => navigate('/signup')}>Sign up</span>
        </p>

      </div>
    </div>
  );
}

export default Login;

