import {Routes, Route} from 'react-router-dom';

import InstitutePage from './pages/InstitutePage';
import AddInstitute from './components/AddInstitute';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import CoursesPage from './pages/CoursesPage';
import AddCourse from './components/AddCourse';
import MyCourses from './pages/MyCourses';
import StudentsPage from './pages/StudentsPage';
import RequiredAuth from './components/RequiredAuth';
import Unauthorized from './pages/Unauthorized';
import NoPageFound from './pages/NoPageFound';
import Applicationspage from './pages/Applicationspage';
import FeedBack from './components/FeedBack';

function App() {
  const ROLES={
    'USER' : "ROLE_USER",
    'ADMIN' : "ROLE_ADMIN"
  }
  return (
      <Routes>
        <Route path = "/" element={<LoginPage/>} />
        <Route path = "/login" element = {<LoginPage/>} />
        <Route path = "/signup" element = {<SignupPage/>} />
        <Route path = "/unauthorized" element = {<Unauthorized/>} />

        {/* USER AND ADMIN ACCESS*/}
        <Route element = {<RequiredAuth allowedRoles ={[ROLES.USER, ROLES.ADMIN]}/>}>
          <Route path = "/dashboard" element = {<Dashboard/>} />
          <Route path = "/viewcourses" element={<CoursesPage/>} />
          <Route path = "/viewinstitutes" element = {<InstitutePage/>} />
          <Route path="/feedback" element={<FeedBack/>}/>
        </Route>
        
        {/* USER ACCESS */}
        <Route element = {<RequiredAuth allowedRoles ={[ROLES.USER]}/>}>
          <Route path = "/mycourses" element = {<MyCourses/>} />
        </Route>

        {/*ADMIN ACCESS*/}
        <Route element = {<RequiredAuth allowedRoles ={[ROLES.ADMIN]}/>}>
          <Route path = "/viewstudents" element = {<StudentsPage/>} />
          <Route path="/viewapplications" element={<Applicationspage/>}/>
          <Route path = "/addcourse" element = {<AddCourse/>} />
          <Route path = "/addinstitute" element = {<AddInstitute/>} />
        </Route>

        {/*Missing or No Page found*/}
        <Route path="*" element = {<NoPageFound/>}/>
      </Routes>
  )
   
}

export default App;
