import style from './storesection.form.module.css';
import { UseUserState } from '../../CurrentUser';
import { UseMoneyState } from '../../CurrentMoney';
import { useState, useEffect } from 'react';
import axios from "axios";

const StoreSection = ({ item, BuyItem }) => {

    const {user, setUser} = UseUserState();
    const {money, setMoney} = UseMoneyState();
    const [error, setError] = useState("");

    const [average, setAverage] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (('rarity' in item)) {
            return;
        }
        FetchAttributes();
    });

    const FetchAttributes = async() => {
        try {
            let response;
            response = await axios.get('http://localhost:8080/api/website/items/item/' + item.name + '/avgprice');
            setAverage(response.data || 0);
            response = await axios.get('http://localhost:8080/api/website/items/item/' + item.name + '/count');
            setCount(response.data || 0);
        } catch (err) {
            console.log(err);
            if (err.response) {
                setError(`Error: ${err.response.data.message || err.response.statusText}`);
            } else {
                setError('Error: Network or server issue');
            }
        }
    }

    return (
        <div className={style.card}>
            <div className={style.storeLeft}>
                <h1>{item.name}</h1>
            </div>
            <div className={style.storeRight}>

                {!('rarity' in item) && <p>Average: {average}, On Sale: {count}</p>}
                <p className={style.priceLabel}>${item.price}</p>
                <button
                    className={money >= item.price ? style.buyButton : style.buyButtonCannotAfford}
                    onClick={() => BuyItem(item)}
                >
                    Buy
                </button>
            </div>
        </div>
    );
}

export default StoreSection