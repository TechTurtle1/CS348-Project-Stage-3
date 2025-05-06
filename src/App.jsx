import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from 'react';

import { LoginProvider } from "./LoggedIn";
import { UseLoginState } from "./LoggedIn";
import { MoneyProvider, UseMoneyState } from "./CurrentMoney"; 
import { UserProvider, UseUserState } from "./CurrentUser";

import "./index.css"
import Home from "./pages/Home";
import Items from "./pages/Items";
import Players from "./pages/Players";
import Login from "./pages/Login";
import Information from "./pages/Information";
import Register from "./pages/Register";
import Store from "./pages/Store";

import NavBar from "./components/NavBar";

const App = () => {

  return (
    <MoneyProvider>
      <UserProvider>
        <MainContent/>
      </UserProvider>
    </MoneyProvider>

  );

};

const MainContent = () => {
  
  const {user, setUser} = UseUserState();
  const {money, setMoney} = UseMoneyState();

  if (user) {
    return (
      <Router>
        <NavBar/>
        
        <div className="body">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/*" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/items" element={<Items />} />
            <Route path="/players" element={<Players />} />
            <Route path="/information" element={<Information />} />
          </Routes>
        </div>
      </Router>
    );

  }
  else {
    
    return (
      <Router>
        <div className="body">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </Router>

    );

  }
}

export default App;