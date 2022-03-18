//  Dependencies
import React from "react";
import { useRoutes, Navigate } from "react-router-dom";

//  Pages components
import Layout from '../Layout/Layout';
import Login from '../Pages/Auth/Login/Login';
import SignUp from '../Pages/Auth/SignUp/SignUp';
import Users from "../Pages/Users/Users";

const List = (isAuth) => [{
    path: '/login',
    element: isAuth === false ? <Login /> : <Navigate to={"/"} />,
    name: 'Login'
},
{
    path: '/signup',
    element: isAuth === false ? <SignUp /> : <Navigate to={"/"} />,
    name: 'Sign Up'
},
{
    path: '',    
    element: isAuth === true ? <Layout /> : <Login />,
    name: "Home",
    children: [{
        path: '',
        element: <Users />,
        name: "Users"
    }]
},
{
    path: '*',
    element: <Login />,
    name: 'Not Found'
}
];

const RoutesList = ({ isAuth }) => {
    let element = useRoutes(List(isAuth));

    return element;
}

export default RoutesList;