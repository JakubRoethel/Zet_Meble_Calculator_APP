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

    const hendleClientEmail = (e) => {
        setOrder({
            ...order,
            client_email: e.target.value
        })
    }

    const hendleClientInvestmentPlace = (e) => {
        setOrder({
            ...order,
            client_Investment_Place: e.target.value
        })
    }

    return (
        <div className="calculator">
            <form className="form-inline">
                <div className="d-flex flex-row form-group">
                    <input className="form-control form-control-lg mx-4" defaultValue={order.client == null ? '' : order.client} type="text" placeholder="Imię i nazwisko"  onChange={handleClientData}></input>
                    <input className="form-control form-control-lg mx-4" defaultValue={order.client_number == null ? '' : order.client_number}type="text" placeholder="Numer Telefonu" onChange={handleClientNumber}></input>
                    <input className="form-control form-control-lg mx-4" defaultValue={order.client_email == null ? '' : order.client_email} type="text" placeholder="Adres e-mail" onChange={hendleClientEmail}></input>
                    <input className="form-control form-control-lg mx-4" defaultValue={order.client_Investment_Place == null ? '' : order.Investment_Place} type="text" placeholder="Adres inwestycji" onChange={hendleClientInvestmentPlace}></input>
                </div>
            </form>
            {choseItems.length === 0 && <h2 className="mt-5">Nie dodałeś żadnych produktów</h2>}
            <div className="product-wrapper">
            {choseItems.map(item => (
            <div key={item.id} className='product-card'>
                <div className ="details">
                    <h1>{item.name}</h1>
                    <p> {item.color} | {item.company} | {item.qty}</p>
                    </div>
                <div className="btn-container">
                    <button className='btn btn-primary' onClick={()=>addItemToList(item)}>Add</button>
                     <button className = 'btn btn-danger' onClick={()=>removeItemsFromList(item)}>Remove</button>
                 </div>
            </div>
            ))}
                <div className="total-price">
                    <h1>{choseItems.length === 0 ? '' : `Total: ${itemsPrice}`}</h1>
                </div>
                <div className="summary-container">
                    {order.client.length == "" ? null :<Link to="/podsumowanie" className="summary-link" onClick={handleSummary}>{`Podsumowanie >`}</Link>}
                </div>
            </div>

        </div>
    )
}

export default Calculator


