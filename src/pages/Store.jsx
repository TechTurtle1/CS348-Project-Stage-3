import styles from "./Store.module.css";
import axios from "axios";
import React, {useState, useEffect} from 'react';
import { UseUserState } from "../CurrentUser";
import { UseMoneyState } from "../CurrentMoney";
import StoreSection from "../components/storesection/StoreSection";

const Store = () => {

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);
    const [items, setItems] = useState([]);
    const [error, setError] = useState("");
    const {user, setUser} = UseUserState();
    const {money, setMoney} = UseMoneyState();

    const options = ["Crates", "User Resell"];
    const [option, setOption] = useState(options[0]);

    useEffect(() => {
        FetchItems();
    });

    const FetchItems = async() => {
        try {
            let response;
            if (option == options[0]) {
                response = await axios.get('http://localhost:8080/api/website/items/type/crate');
            }
            else {
                response = await axios.get('http://localhost:8080/api/website/items/player/' + user + '/sales/leaveout/min/' + minPrice + '/max/' + maxPrice);
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

    const BuyItem = async(item) => {
        try {
            let response;
            if (option == options[0]) {
                response = await axios.post('http://localhost:8080/api/website/items/player/' + user + '/item/' + item.item_id);
            }
            else {
                response = await axios.post('http://localhost:8080/api/website/items/player/' + user + '/item/' + item.item_id + '/resell');
            }

            if (money >= item.price) {
                setMoney(money - item.price)
            }
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
                <h1>Options</h1>
                {options.map(option => (
                    <button
                    onClick={() => setOption(option)}
                    className={styles.filterButton}
                    >
                    {option}
                    </button>
                ))}

                {option != options[0] && 
                    <div className={styles.search}>
                    <p>Min/Max: </p>
                    <input
                        type="number"
                        min={1}
                        max={10000}
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <input
                        type="number"
                        min={1}
                        max={10000}
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>
                }

            </div>

            <div className={styles.middle}>

            </div>

            <div className={styles.rightSide}>
                <h1>Store</h1>
                {items.map(item => (
                    <StoreSection key={item.item_id} item={item} BuyItem={BuyItem}/>
                ))}
            </div>
        </div>
    );

}

export default Store