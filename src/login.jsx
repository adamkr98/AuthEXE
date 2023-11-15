import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabase";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("123456");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const toRegister = () => {
    navigate('/signup');
  };

  const loginUser = async (e) => {
    e.preventDefault(); 
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
  
      if (error) {
        console.error("Error signing in:", error.message);
      } else {
        console.log("User signed in successfully:", data);
        navigate('/profile');
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  }
  

  return (
    <div className="w-full h-[100vh] border-2 flex flex-col justify-center items-center">
      <h1 className="w-1/4">Login Page</h1>

      <form onSubmit={loginUser} className="w-1/4 flex flex-col items-center pt-12 pb-12">
        <input onChange={handleEmailChange} value={email} type="text" placeholder="email" className="h-[2rem] border-b-2 rounded-md mb-4"/>
        <input onChange={handlePasswordChange} value={password} type="text" placeholder="password" className="h-[2rem] border-b-2 rounded-md mb-4"/>
        <button type="submit" className="w-1/4 border-2">Login</button>
        <p onClick={toRegister}>Signup</p>
      </form>
      
    </div>
  );
}

export default Login;
