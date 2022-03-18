//  Dependencies
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

//  RoutesList
import RoutesList from './RoutesList';


const Index = () => {

    const [isAuth] = useState(false);

    return (

        <BrowserRouter>
            <RoutesList isAuth={isAuth} />
        </BrowserRouter>
    )
}

export default Index