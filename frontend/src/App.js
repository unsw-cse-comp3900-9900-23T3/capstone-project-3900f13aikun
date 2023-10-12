import React from 'react';
import { styled } from '@mui/system';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InitialDash from './root/InitialDash';
import SignUp from './root/SignUp';
import Profile from './root/Profile';
import SignIn from './root/SignIn';
import ForgetPassword from './root/ForgotPassword';
import CreateProject from './root/CreateProject';
import MyCreatedProject from './root/MyCreatedProject';
import DashboardStudent from './root/DashboardSupervisor';
import DashboardIndustry from './root/DashboardIndustry';
import DashboardSupervisor from './root/DashboardSupervisor';




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
            <Route path="/forgot" element={<ForgetPassword/>} />
            <Route path="/create-project" element={<CreateProject/>} />
            <Route path="/my-created-project" element={<MyCreatedProject/>} />
            <Route path="/dashboard/student" element={<DashboardStudent/>} />
            <Route path="/dashboard/academics" element={<DashboardSupervisor/>} />
            <Route path="/dashboard/industryp" element={<DashboardIndustry/>} />
          </Routes>
        </BrowserRouter>
      </TotalContainer>
  );
}

export default App;
