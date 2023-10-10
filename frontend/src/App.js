import React from 'react';
import { styled } from '@mui/system';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InitialDash from './root/InitialDash';
import SignUp from './root/SignUp';
import Profile from './root/Profile';
import SignIn from './root/SignIn';
import Dashboard from './root/Dashboard';


export const TotalContainer = styled('div')({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '5px 25px'
})

function App () {
  return (
      <TotalContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<InitialDash />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard/>} />
          </Routes>
        </BrowserRouter>
      </TotalContainer>
  );
}

export default App;
