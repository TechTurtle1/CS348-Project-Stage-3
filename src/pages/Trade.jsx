import styles from "./Trade.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

import { UseUserState } from "../CurrentUser";

const Home = () => {

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

      </div>
    </div>
  );

};

export default Home;