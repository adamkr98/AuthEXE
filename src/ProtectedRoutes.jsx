import React, { useEffect, useState, createContext } from 'react';
import { Navigate } from 'react-router-dom';
import supabase from './supabase';

const ProtectedRoutes = ({ children }) => {

    const [userStatus, setUserStatus] = useState(null);

    const fetchUserData = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (data) {
            setUserStatus(data);
          console.log('data object: ', data);
        }
      } catch (error) {
        console.error('Error getting current user:', error);
      }
    };

    
    useEffect(()=> {
          fetchUserData();
    },[]);
  
  // const token = false

    
//   switch (userStatus) {
//     case null:
//         return <div>Loading ...</div>;
//     case true:
//         return children; 
//     case false:
//         return <Navigate to="/" />; 
//     default:
//         return null; 
// }

return (
  <>
  {userStatus !=null ? children : null}
  </>
)
  
}

export default ProtectedRoutes;

// {userStatus !== null ? (
//   children
// ) : (
//   <Navigate to="/" />
// )}