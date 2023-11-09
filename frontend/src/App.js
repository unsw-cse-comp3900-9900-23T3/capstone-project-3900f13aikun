import React from 'react';
import { styled } from '@mui/system';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InitialDash from './root/InitialDash';
import SignUp from './root/SignUp';
import Profile from './root/profile/Profile';
import SignIn from './root/SignIn';
import ForgetPassword from './root/ForgotPassword';
import CreateProject from './root/project/CreateProject';
import MyCreatedProject from './root/project/MyCreatedProject';
import SavedProjects from './root/SavedInformation';
import Appliacation from './root/application/Application';
import Notification from './root/application/Notification';
import MyGroup from './root/group/MyGroup';
import MyCreateGroup from './root/group/MyCreateGroup';
import ProjectDetail from './root/project/ProjectDetail';
import Apppro from './root/application/Apppro';
import GroupComposition from './root/group/GroupComposition';
import ProfileDetails from './root/profile/ProfileDetails';
import SupervisorFeedback from './root/SupervisorFeedback';
import SupervisorAccessment from './root/SupervisorAccessment';
import IndustryAccessment from './root/IndustryAccessment';
import DashboardStudent from './root/DashboardStudent';
import DashboardSupervisor from './root/DashboardSupervisor';
import DashboardIndustry from './root/DashboardIndustry';
import MyProject from './root/MyProject';
import ProjectDelivery from './root/ProjectDelivery';
import RecommendProjects from './root/RecommendProjects';
import SavedInformation from './root/SavedInformation';


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
            <Route path="/edit-project/:id" element={<CreateProject/>} />
            <Route path="/my-created-project" element={<MyCreatedProject/>} />
            <Route path="/dashboard/student" element={<DashboardStudent/>} />
            <Route path="/dashboard/academics" element={<DashboardSupervisor/>} />
            <Route path="/dashboard/industryp" element={<DashboardIndustry/>} />
            <Route path="/saved-information" element={<SavedInformation/>} />
            <Route path="/application" element={<Appliacation/>} />
            <Route path="/apppro" element={<Apppro/>} />
            <Route path="/notification" element={<Notification/>} />
            <Route path="/my-group" element={<MyGroup/>} />
            <Route path="/my-create-group" element={<MyCreateGroup/>} />
            <Route path="/edit-group/:groupId" element={<MyCreateGroup/>} />
            <Route path="/group-composition/:groupId" element={<GroupComposition/>} />
            <Route path="/project-detail/:id" element={<ProjectDetail/>} />
            <Route path="/profile-detail/:id" element={<ProfileDetails/>} />
            <Route path="/profile-detail" element={<ProfileDetails/>} />
            <Route path="/my-project" element={<MyProject/>}></Route>
            <Route path="/project-delivery/:id" element={<ProjectDelivery/>}></Route>
            <Route path="/supervisor-feedback" element={<SupervisorFeedback/>}></Route>
            <Route path="/supervisor-accessment" element={<SupervisorAccessment/>}></Route>
            <Route path="/industry-accessment" element={<IndustryAccessment/>}></Route>
            <Route path="/recommend-projects" element={<RecommendProjects/>}></Route>
          </Routes>
        </BrowserRouter>
      </TotalContainer>
  );
}

export default App;
