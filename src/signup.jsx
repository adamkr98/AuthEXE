import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabase";

const Signup = () => {

  const navigate = useNavigate();

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleEmailChange = (e) => {
   setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const signUpNewUser = async(e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) {
        console.error("Error signing up:", error.message);
      } else {
        console.log("User registered:", data);
        navigate('/profile')
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  }
  

  return (
    <>
    <h1 className="w-full h-fit bg bg-red-400">Signup Page</h1>
    <form onSubmit={signUpNewUser}>
      <input onChange={handleEmailChange} type="text" placeholder="email" />
      <input onChange={handlePasswordChange} type="text" placeholder="password" />
      <button type="submit">Submit</button>
    </form>
    </>
  )
}

export default Signup;