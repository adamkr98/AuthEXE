// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import supabase from './supabase';

// const AuthContext = createContext({});

// export const useAuth = () => useContext(AuthContext);

// const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null); 
//   const [loading, setLoading] = useState(true);

//   const fetchUserData = async () => {
//     try {
//       const { data: userData, error } = await supabase.auth.getUser();
//       if (userData) {
//         setUser(userData); 
//       } else {
//         setUser(null);
//       }
//     } catch (error) {
//       console.error('Error getting current user:', error);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   return (
//     <AuthContext.Provider value={user}>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         children
//       )}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
