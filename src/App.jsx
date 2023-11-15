import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './signup';
import Login from './login';
import Profile from './profile';
// import AuthProvider from './AuthProvider';
import ProtectedRoute from './ProtectedRoutes';

function App() {
  return (
      <BrowserRouter>
        {/* <AuthProvider> */}
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Login />} />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>} />
                
            </Routes>
        {/* </AuthProvider> */}
      </BrowserRouter>
  );
}

export default App;
