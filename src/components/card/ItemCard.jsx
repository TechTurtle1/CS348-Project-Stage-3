import style from './itemcard.form.module.css';
import axios from 'axios';
import { useState, useEffect } from "react";
import { UseUserState } from '../../CurrentUser';

function ItemCard({item, FetchItems, FetchTypes}) {

    const {user, setUser} = UseUserState();
    const [error, setError] = useState("");
    const [price, setPrice] = useState(0);

    const DeleteItem = async(e) => {
        try {
            let response;
            if (item.type != 'Crate') {
                response = await axios.delete('http://localhost:8080/api/website/items/item/' + item.item_id);
            }
            else {
                response = await axios.post('http://localhost:8080/api/website/items/player/' + user + '/crate/' + item.item_id);
            }
            FetchItems();
            FetchTypes();
        } catch (err) {
            if (err.response) {
                setError(`Error: ${err.response.data.message || err.response.statusText}`);
              } else {
                setError('Error: Network or server issue');
              }
        }
    }

    const PutItemOnSale = async(e) => {
        try {
            let response = await axios.post('http://localhost:8080/api/website/items/item/' + item.item_id + '/price/' + price);
            setPrice(0);
            FetchItems();
            FetchTypes();
        } catch (err) {
            if (err.response) {
                setError(`Error: ${err.response.data.message || err.response.statusText}`);
              } else {
                setError('Error: Network or server issue');
              }
        }
    }

    const TakeItemOffSale = async(e) => {
        try {
            console.log("hi");
            let response = await axios.post('http://localhost:8080/api/website/items/item/' + item.item_id + '/price/' + 0);
            setPrice(0);
            FetchItems();
            FetchTypes();
        } catch (err) {
            if (err.response) {
                setError(`Error: ${err.response.data.message || err.response.statusText}`);
              } else {
                setError('Error: Network or server issue');
              }
        }
    }

    if (item.price > 0) {
        return (
            <div className={style.card}>
                <div className={style.namePane}>
                    <h3>{item.name}</h3>
                </div>
                <div className={style.pricePane}>
                    <h3>${item.price}</h3>
                </div>
                <button
                    className={style.deleteButton}
                    onClick={() => TakeItemOffSale()}
                >
                    Take Off Sale
                </button>
            </div>
        );
    }
    else {
        return (
            <div className={style.card}>
                <div className={style.namePane}>
                    <h3>{item.name}</h3>
                    {item.type != 'Crate' ? <h3>[Value: {item.value}]</h3> : null}
                </div>
                <div className={style.resellPane}>
                    {item.type != 'Crate' ?
                    <div className={style.resellPane}>
                        <input
                            type="number"
                            placeholder="price"
                            value= {price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <button
                            className={style.resellButton}
                            onClick={() => PutItemOnSale()}
                        >
                            Resell
                        </button>
                    </div>
                    :
                    null
                    }
                </div>
                {item.type != 'Crate' ?
                <button
                    className={style.deleteButton}
                    onClick={() => DeleteItem()}
                >
                Delete
                </button> :
                <button
                    className={style.deleteButton}
                    onClick={() => DeleteItem()}
                >
                Open
                </button> 
                }
            </div>
        );
    }
}

export default ItemCard