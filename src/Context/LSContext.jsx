import React, { useState, useEffect, createContext } from 'react'

const LSK = 'LKTOK-HIB'
const UHIB = 'U-HIB'

export const LSContext = createContext()

const LSProvider = ({ initialState = {}, children }) => {

    const [localStorage, setLocalStorage] = useState(initialState);
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(initialState);

    useEffect(() => {
        getTKLS();
    }, [])

    const getTKLS = () => {

        const JwtTokenDto = JSON.parse(window.localStorage.getItem(LSK));
        const userLS = JSON.parse(window.localStorage.getItem(UHIB));
        if (JwtTokenDto !== null && Object.keys(JwtTokenDto).length > 0) {
            setLocalStorage(JwtTokenDto);
            setIsAuth(true);
            setUser(userLS);
        } else {
            setLocalStorage({});
            setIsAuth(false);
            setUser({});
        }
    }

    const saveLS = (JwtTokenDto) => {
        window.localStorage.setItem(LSK, JSON.stringify(JwtTokenDto));
        setLocalStorage(JwtTokenDto);        
    }

    const saveUser = (user) =>{
        window.localStorage.setItem(UHIB, JSON.stringify(user));        
        setUser(user);
        setIsAuth(true);
    }

    const deleteLS = () => {
        window.localStorage.removeItem(LSK);
        window.localStorage.removeItem(UHIB);
        setLocalStorage({});
        setIsAuth(false);
        setUser({});
    }
    return (<LSContext.Provider value={{ localStorage, isAuth,user, saveUser,saveLS, deleteLS }} >
        {children}
    </LSContext.Provider >
    )
}

export default LSProvider;