//  Dependencies
import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LSContext } from "../Context/LSContext";

//  RoutesList
import RoutesList from './RoutesList';

const Index = () => {

    const { isAuth } = useContext(LSContext);

    return (

        <BrowserRouter>
            <RoutesList isAuth={isAuth} />
        </BrowserRouter>
    )
}

export default Index