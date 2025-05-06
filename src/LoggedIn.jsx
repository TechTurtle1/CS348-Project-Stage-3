import React, { createContext, useState, useContext } from 'react';

const LoginContext = createContext();

export const LoginProvider = ({children}) => {
    const [login, setLogin] = useState(false);

    return (
        <LoginContext.Provider value={{login, setLogin}}>
            {children}
        </LoginContext.Provider>
    );
};

export const UseLoginState = () => useContext(LoginContext);