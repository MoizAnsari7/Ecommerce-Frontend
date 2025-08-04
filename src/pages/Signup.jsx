import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import toast from 'react-hot-toast';
import api from '../api';

function Signup() {
  const navigate = useNavigate();
  
  const [ formData, setFormData ] = useState({name : "", email : "", phone: "", password : "", confirmPassword : "", role : ""});

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
    try {
      await api.post("/userSignup", formData);
      navigate("/login");
      toast.success("singup success");
    }
    catch (error) {
      console.error("Signup failed:", error);
      toast.error(error.response.data.message);
    }
  };

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
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create your account</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="role">Select Role</label>
          <select id="role" name='role' onChange={changeHandler} required >
            <option value="">-- Choose Role --</option>
            <option value="User">User</option>
            <option value="Seller">Seller</option>
          </select>

          <label htmlFor="name">Full Name</label>
          <input 
            type="text" 
            id="name" 
            placeholder="John Doe" 
            name='name'
            onChange={changeHandler}
            required 
          />

          <label htmlFor="email">Email address</label>
          <input 
            type="email" 
            id="email" 
            placeholder="you@example.com"
            name='email'
            onChange={changeHandler}
            required 
          />

          <label htmlFor="phone">Phone</label>
          <input 
            type="phone" 
            id="phone"
            className='loginInput'
            placeholder="Enter your phone no."
            name='phone'
            onChange={changeHandler}
            required 
          />

          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Create a password" 
            name='password'
            onChange={changeHandler}
            required 
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            placeholder="Confirm password" 
            name='confirmPassword'
            onChange={changeHandler}
            required 
          />

          <button type="submit">Sign Up</button>
        </form>

        <p className="login-link">
          Already have an account? <span onClick={() => navigate('/login')}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
