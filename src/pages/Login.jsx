import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { UseUserState } from "../CurrentUser";
import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const Login = () => {

  const navigate = useNavigate();
  const {user, setUser} = UseUserState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const LogIn = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8080/api/website/users/username/' + username + '/uuid');
      const tempUser = response.data;
      if (user) {
        navigate("/home");
      }
      setUser(response.data);
      //console.log(response.data);
      //console.log(response.status);
      //console.log(user);
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.data.message || err.response.statusText}`);
      } else {
        setError('Error: Network or server issue');
      }
    }
  }

  const NavRegistration = () => {
    navigate("/register");
  }

  return (
    <div className={styles.body}>
      <form onSubmit={LogIn}>
        <h1>Log In</h1>
        <input
          className={styles.loginInput}
          type="text"
          placeholder="Username"
          value = {username}
          onChange={(e) => setUsername(e.target.value)} required
        />
        <input
          className={styles.loginInput}
          type="password"
          placeholder="Password"
          value = {password}
          onChange={(e) => setPassword(e.target.value)} required
        />
        <button type="submit" className={styles.loginSubmit}>
          Log In
        </button>
        <button type="button" className={styles.loginSubmit} onClick={NavRegistration}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;