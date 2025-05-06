import React, { createContext, useState, useContext } from 'react';

const MoneyContext = createContext();

export const MoneyProvider = ({children}) => {
    const [money, setMoney] = useState(false);

    return (
        <MoneyContext.Provider value={{money, setMoney}}>
            {children}
        </MoneyContext.Provider>
    );
};

export const UseMoneyState = () => useContext(MoneyContext);