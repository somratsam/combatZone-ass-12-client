import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layoutes/Main";
import Home from "../Pages/Home/Home/Home";
import AllInstructors from "../Pages/allinstructors/AllInstructors";
import Login from "../Pages/login/Login";
import Registration from "../Pages/Registration/Registration";


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
          path : 'register',
          element: <Registration></Registration>
        }
      ]
    },
  ]);
  