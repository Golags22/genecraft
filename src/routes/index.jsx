import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Courses from '../pages/Courses';
import Resources from '../pages/Resources';
import MainLayout from '../layouts/MainLayout';
import AdminDashboard from '../pages/AdminDashboard';
import CourseDetails from '../pages/CourseDetails';


export const routes = [
  { path: "/", element: <MainLayout><Home/></MainLayout>,showInNav: true , title: "Home" },
  { path: "/about", element: <MainLayout><About/></MainLayout>, showInNav: true, title: "About" },
   { path: "/courses", element: <MainLayout><Courses/></MainLayout>, showInNav: true , title: "Courses"},
  { path: "/contact", element: <MainLayout><Contact/></MainLayout>, showInNav: true , title: "Contact" },
    { path: "/courses/:id", element: <MainLayout><CourseDetails/></MainLayout>, showInNav: false, title: "CourseDetails"},
  { path: "/resources", element: <MainLayout><Resources/></MainLayout>, showInNav: true , title: "Resources"},
  { path: "/adminDashboard", element: <MainLayout><AdminDashboard /></MainLayout>, showInNav: false }
];
