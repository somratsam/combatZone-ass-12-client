import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layoutes/Main";
import Home from "../Pages/Home/Home/Home";
import AllInstructors from "../Pages/allinstructors/AllInstructors";
import Login from "../Pages/login/Login";
import Registration from "../Pages/Registration/Registration";
import InstructorHome from "../Pages/Dashboard/InstructorDashboard/InstructorHome";

import AddClass from "../Pages/Dashboard/InstructorDashboard/AddClass";
import ClassesList from "../Pages/Dashboard/InstructorDashboard/ClassesList";
import Classes from "../Pages/Classes/Classes";
import ManageClass from "../Pages/Dashboard/AdminDashboard/ManageClass";
import Dashboard from "../Layoutes/Dashboard";
import SelectedClasses from "../Pages/Dashboard/Studenddashboard/SelectedClasses ";
import ManageUsers from "../Pages/Dashboard/AdminDashboard/ManageUsers";


import Payment from "../Pages/Dashboard/Studenddashboard/Payments/Payment";





export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'instructors',
        element: <AllInstructors></AllInstructors>
      },
      {
        path: 'classes',
        element: <Classes></Classes>
      },
      {
        path: 'login',
        element: <Login></Login>
      },

      {
        path: 'register',
        element: <Registration></Registration>
      },
      {
        path: 'instructorHome',
        element: <InstructorHome></InstructorHome>
      },


      
      
    ]
  },
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
      children: [
      {
        path: 'addClass',
        element: <AddClass></AddClass>
      },
      {
        path: 'manageClass',
        element: <ManageClass></ManageClass>
      },
      {
        path: 'manageUsers',
        element: <ManageUsers></ManageUsers>
      },
      {
        path: 'myClass',
        element: <ClassesList></ClassesList>
      },
      {
        path: 'selectedClass',
        element: <SelectedClasses></SelectedClasses>
      },
      {
        path: 'payment',
        element: <Payment></Payment>
      },

    ]
  }

]);
