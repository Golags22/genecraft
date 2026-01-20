import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Courses from '../pages/Courses';
import Gallery from '../pages/Gallery';
import MainLayout from '../layouts/MainLayout';
import AdminDashboard from '../admin/AdminDashboard';
import CourseDetails from '../pages/CourseDetails';
import { CourseTable, Stats, Users,AdminResources, Settings, Posting, ViewResource, EditResource, AddResource, DeleteResource, CourseDetail, Transaction } from '../admin/adminpages';
import { Login, Logout, Signup } from '../../auth';
import StudentDashboard from '../users/StudentDashboard';
import { CoursePlayer } from '../components';


export const routes = [
      // Visible Routes
  { path: "/", element: <MainLayout><Home/></MainLayout>,showInNav: true , title: "Home" },
  { path: "/about", element: <MainLayout><About/></MainLayout>, showInNav: true, title: "About" },
  { path: "/courses", element: <MainLayout><Courses/></MainLayout>, showInNav: true , title: "Courses"},
  { path: "/contact", element: <MainLayout><Contact/></MainLayout>, showInNav: true , title: "Contact" },
  { path: "/courses/:id", element: <MainLayout><CourseDetails/></MainLayout>, showInNav: false, title: "CourseDetails"},

  { path: "/gallery", element: <MainLayout><Gallery/></MainLayout>, showInNav: true , title: "Gallery"},
// Admin Routes
  { path: "/admin/dashboard", element: <AdminDashboard />, showInNav: false },
  { path: "/admin/coursetable", element: <CourseTable />, showInNav: false },
  { path: "/admin/stats", element:  <Stats />, showInNav: false },
  { path: "/admin/users", element:  <Users />, showInNav: false },
  { path: "/admin/resources", element:<AdminResources />, showInNav: false },
  { path: "/admin/settings", element: <Settings />, showInNav: false },
  {path:  "/admin/resources" , element:<AdminResources /> ,showInNav: false },
  { path:"/admin/transaction" , element: <Transaction /> ,showInNav: false},
  {path:  "/admin/resources" , element:<AdminResources /> ,showInNav: false },
  { path:"/admin/transactions" , element: <Transaction /> ,showInNav: false},
  {path:"/admin/resources/edit/:id" , element:<EditResource /> ,showInNav: false},
  {path:"/admin/resources/delete/:id" , element:<DeleteResource /> ,showInNav: false},
  {path:"/admin/resources/view/:id" , element:<ViewResource /> ,showInNav: false},
  { path: "/admin/posting", element:   <Posting />, showInNav: false },
  { path: "/admin/courses/:id", element: <CourseDetail />, showInNav: false },

// User Auth

  { path: "/users/signup", element: <Signup />, showInNav: true , title: "Sign Up"},
  { path: "/users/login", element: <Login />, showInNav: false},
  { path: "/users/logout", element: <Logout />, showInNav: false },

  //User Dashboard
  { path: "/student/dashboard", element:<StudentDashboard />, showInNav: false },
  { path: "/learn/:courseId", element:<CoursePlayer />, showInNav: false },


];
