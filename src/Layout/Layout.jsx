import React from 'react'
import PropTypes from 'prop-types';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Main from './Main/Main';
import GlobalStyle from './globalStyles';
import { Outlet } from 'react-router-dom';

const Layout = ({ path }) => {
    return (
        <>
            <GlobalStyle />
            <div className='layout'>
                <Header/>
                <Main path={path}>
                    <Outlet />
                </Main>
                <Footer />
            </div>
        </>
    )
}

Layout.prototype = {
    path: PropTypes.string
}

export default Layout;
