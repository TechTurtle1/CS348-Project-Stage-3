import { UseUserState } from "../CurrentUser";
import styles from "./Information.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";

const Information = () => {

    const {user, setUser} = UseUserState();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() =>{
        FetchUserInfo();
    });

    const FetchUserInfo = async () => {
        try {

            let response = await axios.get('http://localhost:8080/api/website/users/uuid/' + user);
            setUserInfo(response.data);
          } catch (err) {
            if (err.response) {
              setError(`Error: ${err.response.data.message || err.response.statusText}`);
            } else {
              setError('Error: Network or server issue');
            }
          }
    }

    const Logout = () => {
        setUser(null);
        navigate("/login");
    }

    const DeleteUser = async() => {
        try {
            const response = await axios.delete('http://localhost:8080/api/website/users/uuid/' + user);
        } catch (err) {
            if (err.response) {
                setError(`Error: ${err.response.data.message || err.response.statusText}`);
            } else {
                setError('Error: Network or server issue');
            }
        }
        Logout();
    }

    return (
        <div className={styles.body}>
            <h1>User Information</h1>
            <div className={styles.informationPane}>
                {userInfo && 
                    <>
                        <h2>Username: {userInfo.username}</h2>
                        <h2>ID: {userInfo.user_id}</h2>
                    </>
                }
            </div>
            <div className={styles.buttons}>
                <button className={styles.informationLogout} onClick={Logout}>Log Out</button>
                <button className={styles.informationDelete} onClick={DeleteUser}>Delete Account</button>
            </div>
        </div>
    );

}

export default Information;