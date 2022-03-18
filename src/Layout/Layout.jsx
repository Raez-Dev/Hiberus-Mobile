import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Main from './Main/Main';
import GlobalStyle from './globalStyles';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <GlobalStyle />
            <div className='layout'>
                <Header />
                <Main>
                    <Outlet />
                </Main>
                <Footer />
            </div>
        </>
    )
}

export default Layout;
