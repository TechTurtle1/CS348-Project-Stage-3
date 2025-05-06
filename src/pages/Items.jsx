import ItemCard from "../components/card/ItemCard";
import axios from "axios";
import React, {useState, useEffect} from 'react';
import { UseUserState } from "../CurrentUser";
import styles from "./Items.module.css";

const Items = () => {

  const {user, setUser} = UseUserState();
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const [type, setType] = useState("All Items");
  const [name, setName] = useState("");

  const [types, setTypes] = useState([]);

  useEffect(() =>{
    FetchItems();
    FetchTypes();
  }, [name, type]);

  const FetchItems = async () => {
    try {
      let response;

      if (name != "") {
        response = await axios.get('http://localhost:8080/api/website/items/player/' + user + '/name/' + name);
      }
      else {
        switch(type) {
          case "On Sale":
            response = await axios.get('http://localhost:8080/api/website/items/player/' + user + '/sales/include');
            break;
          case "All Items":
            response = await axios.get('http://localhost:8080/api/website/items/player/' + user);
            break;
          default:
            response = await axios.get('http://localhost:8080/api/website/items/player/' + user + '/type/' + type);
        }
      }

      setItems(response.data);
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.data.message || err.response.statusText}`);
      } else {
        setError('Error: Network or server issue');
      }
    }
  }

  const FetchTypes = async () => {
    try {
      let response = await axios.get('http://localhost:8080/api/website/items/types');
      setTypes(response.data);
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.data.message || err.response.statusText}`);
      } else {
        setError('Error: Network or server issue');
      }
    }
  }

  const ChangeType = (changedType) => {
    setType(changedType)
    setName("");
  }

  const ChangeName = (changedName) => {
    setName(changedName)
    setType("All Items");
  }

  let message = type;
  if (name != "") {
    message = "Search: " + name;
  }
  message += " (" + items.length + ")";

  return (
    <div className={styles.body}>
      <div className={styles.leftSide}>
        <h1>Options</h1>
        <div className={styles.search}>

          <input
            type="text"
            placeholder="search"
            value= {name}
            onChange={(e) => ChangeName(e.target.value)}
          />

        </div>
        {types.map(itemType => (
          <button
            onClick={() => ChangeType(itemType)}
            className={styles.filterButton}
          >
            {itemType}
          </button>
        ))}
      </div>
      <div className={styles.middle}>
      </div>
      <div className={styles.rightSide}>
        <h1>{message}</h1>
        <div className={styles.itemGrid}>
          {items.map(item => (
            <ItemCard
              item={item}
              FetchItems={FetchItems}
              FetchTypes={FetchTypes}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Items;