import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { UseUserState } from "../CurrentUser";
import { UseMoneyState } from "../CurrentMoney";

const NavBar = () => {

  const {user, setUser} = UseUserState();
  const {money, setMoney} = UseMoneyState();
  const [error, setError] = useState("");

  const FetchMoney = async() => {
    try {
      let response = await axios.get('http://localhost:8080/api/website/users/uuid/' + user + '/money');
      setMoney(response.data);
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.data.message || err.response.statusText}`);
      } else {
        setError('Error: Network or server issue');
      }
    }
  }

  useEffect(() => {
    console.log("money fetched");
    FetchMoney();
  }, [money]);

  return (
    <>
      <nav className="navbar">
        <div className="navlinks">
          <Link className="navbar-elements" to="/home">Home</Link>
          <Link className="navbar-elements" to="/items">Items</Link>
          <Link className="navbar-elements" to="/store">Store</Link>
          <Link className="navbar-elements" to="/players">Players</Link>
          <Link className="navbar-elements" to="/information">Information</Link>
        </div>
        <div className="navmoney">
          Bitz: ${money}
        </div>
      </nav>
    </>
  );

};

export default NavBar;