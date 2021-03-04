import React, {useContext, useState} from 'react';
import "../css/calculator.css";
import {ChosenProductContext} from './ChosenProductContext';
import {Link} from 'react-router-dom';


// tutaj wykorzystujemy dwie funkcje na guzikach add i remove plus mapujemy po choseItems i przekazujemy kartę produkty z lewej strony na prawa w apce w cześniej masz dlugosc tablicy 0 wyswietla tobie informacje o braku

function Calculator() {

    const [choseItems, setItems, addItemToList, removeItemsFromList,allProductList, setAllProductList, order,setOrder]= useContext(ChosenProductContext);
    
    const itemsPrice = choseItems.reduce((a,c) => a + c.price * c.qty, 0)


    const handleSummary = () => {
        setOrder({
            ...order,
            array: choseItems,
            total: itemsPrice
        })
    }

    const handleClientData = (e) => {
        setOrder({
            ...order,
            client: e.target.value
        })

    }

    const handleClientNumber = (e) => {
        setOrder({
            ...order,
            client_number: e.target.value
        })
    }

    return (
        <div className="calculator">
            <div className="client_details">
                <input defaultValue={order.client == null ? '' : order.client} type="text" placeholder="Imię i nazwisko" className="input" onChange={handleClientData}></input>
                <input defaultValue={order.client_number == null ? '' : order.client_number}type="text" placeholder="Numer Telefonu" className="input" onChange={handleClientNumber}></input>
                {choseItems.length === 0 && <h2>Nie dodałeś żadnych produktów</h2>}
            </div>
            <div className="product_wrapper">
            {choseItems.map(item => (
            <div key={item.id} className='product_card calculator_card'>
                <div className ="details">
                    <h1>{item.name}</h1>
                    <p> {item.color} | {item.company} | {item.qty}</p>
                    </div>
                <div className="btn_container">
                    <button className='btn_add btn_qty' onClick={()=>addItemToList(item)}>Add</button>
                     <button className = 'btn_remove' onClick={()=>removeItemsFromList(item)}>Remove</button>
                 </div>
                
            </div>
            
            ))}
                <div className="total_price">
                    <h1>{choseItems.length === 0 ? '' : `Total: ${itemsPrice}`}</h1>
                </div>
                <div className="summary_container">
                    {order.client.length == "" ? null :<Link to="/podsumowanie" className="summary_link" onClick={handleSummary}>{`Podsumowanie >`}</Link>}
                </div>
            </div>

        </div>
    )
}

export default Calculator


