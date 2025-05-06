import styles from "./Players.module.css";
import axios from "axios";
import React, {useState, useEffect} from 'react';
import { UseUserState } from "../CurrentUser";
import ItemCard from "../components/card/ItemCard";

const Players = () => {

  const {user, setUser} = UseUserState();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    FetchUsers();
  });

  const FetchUsers = async () => {
    try {
      let response = await axios.get('http://localhost:8080/api/website/users/all');
      if (username != "") {
        response = await axios.get('http://localhost:8080/api/website/users/username/' + username + "/all");
      }
      setUsers(response.data);
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.data.message || err.response.statusText}`);
      } else {
        setError('Error: Network or server issue');
      }
    }
  }

  

  return (
    <div className={styles.body}>
      <div className={styles.leftSide}>
        <h1>Search</h1>
        <div className={styles.search}>      
          <input
            type="text"
            placeholder="search"
            value= {username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {users.map(user => (
          <button
            onClick={() => setSelectedUser(user)}
            className={styles.filterButton}
          >
            {user.username}
          </button>
        ))}
      </div>

      <div className={styles.middle}>
      </div>

      <div className={styles.rightSide}>
        {selectedUser &&
          <>
            <h1>Player</h1>
            <div className={styles.playerPane}>
              <h1>{selectedUser.username}</h1>
              <div className={styles.playerLevelMoney}>
                <p>Level: {selectedUser.level}</p>
                <p>Exp: {selectedUser.exp}</p>
                
              </div>
            </div>
            <div>

            </div>
          </>
        }
      </div>
    </div>
  );
};

export default Players;