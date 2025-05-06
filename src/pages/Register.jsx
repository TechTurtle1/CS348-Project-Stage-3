import styles from "./Login.module.css";
import { UseUserState } from "../CurrentUser";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import axios from "axios";
import { useEffect } from 'react';

const Register = () => {

  const navigate = useNavigate();

  const {user, setUser} = UseUserState();

  const [user_id, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [level, setLevel] = useState(0);
  const [exp, setExp] = useState(0)
  const [money, setMoney] = useState(0);
  const [error, setError] = useState("");

  const LogIn = async(e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return;
    }

    const userData = {
      user_id,
      username,
      password,
      level,
      exp,
      money
    }

    try {
      const response = await axios.post('http://localhost:8080/api/website/users', userData, {});
      const tempUser = response.data;
      if (tempUser.user_id) {
        navigate("/home");
      }
      setUser(response.data.user_id);
      //console.log(response.data);
      //console.log(response.status);
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.data.message || err.response.statusText}`);
      } else {
        setError('Error: Network or server issue');
      }
    }
  }

  const NavLogin = () => {
    navigate("/login");
  }
  
  return (
    <div className={styles.body}>
      <form onSubmit={LogIn}>
        <h1>Register</h1>
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
        <input
          className={styles.loginInput}
          type="password"
          placeholder="Confirm Password"
          value = {confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} required
        />
        <button type="submit" className={styles.loginSubmit}>
          Create Account
        </button>
        <button type="button" className={styles.loginSubmit} onClick={NavLogin}>
          Return to Login
        </button>
      </form>
    </div>
  );

}

export default Register;