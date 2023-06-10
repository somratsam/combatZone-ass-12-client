import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layoutes/Main";
import Home from "../Pages/Home/Home/Home";
import AllInstructors from "../Pages/allinstructors/AllInstructors";
import Login from "../Pages/login/Login";
import Registration from "../Pages/Registration/Registration";
import InstructorHome from "../Pages/Dashboard/InstructorDashboard/InstructorHome";
import Dashboard from "../Layoutes/Dashboard";
import AddClass from "../Pages/Dashboard/InstructorDashboard/AddClass";
import ClassesList from "../Pages/Dashboard/InstructorDashboard/ClassesList";



  export  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path : '/',
            element: <Home></Home>
        },
        {
          path: 'instructors',
          element: <AllInstructors></AllInstructors>
        },
        {
          path : 'login',
          element: <Login></Login>
        },
        {
          path: 'dashboard',
          element: <Dashboard></Dashboard>,
        },
        {
          path : 'register',
          element: <Registration></Registration>
        },
        {
          path: 'instructorHome',
          element: <InstructorHome></InstructorHome>
        },
        {
          path: 'addClass',
          element: <AddClass></AddClass>
        },
        {
          path: 'myClass',
          element: <ClassesList></ClassesList>
        },
      ]
    },
   
  ]);
  