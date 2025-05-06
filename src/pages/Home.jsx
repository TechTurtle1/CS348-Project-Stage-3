import styles from "./Home.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

import { UseUserState } from "../CurrentUser";
import { UseMoneyState } from "../CurrentMoney";

const Home = () => {

  const {user, setUser} = UseUserState();
  const {money, setMoney} = UseMoneyState();
  const [error, setError] = useState("");
  const [userObject, setUserObject] = useState(null);
  const [moneyPerClick, setMoneyPerClick] = useState(0);
  
  const ClickMoney = async (amount) => {
    try {
      let response = await axios.put('http://localhost:8080/api/website/users/uuid/' + user + '/money/' + amount);
      setMoney(response.data);
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.data.message || err.response.statusText}`);
      } else {
        setError('Error: Network or server issue');
      }
    }
  }

  const GetUser = async () => {
    try {
      let response = await axios.get('http://localhost:8080/api/website/users/uuid/' + user);
      setUserObject(response.data);
      response = await axios.get('http://localhost:8080/api/website/items/player/' + user + '/clickpower');
      setMoneyPerClick(response.data);
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.data.message || err.response.statusText}`);
      } else {
        setError('Error: Network or server issue');
      }
    }
  }

  useEffect(() => {
    if (user) {
      GetUser(); 
    }
  });

  return (
    <div className={styles.body}>
      
      <div className={styles.playerPane}>
        <div className={styles.playerHeader}>
          <h1>Welcome, {userObject?.username}</h1>
        </div>

        <div className={styles.playerBody}>
          <p>Bitz per click: {moneyPerClick}</p>
          <p>Your Exp: {userObject?.exp}</p>
          <button className={styles.clickerButton}
            onClick={() => ClickMoney(moneyPerClick)}
          >Get Bitz</button>
        </div>
      </div>
    </div>
  );

};

export default Home;