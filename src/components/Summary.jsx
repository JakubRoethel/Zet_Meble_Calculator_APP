import React, {useContext} from 'react'
import {ChosenProductContext} from './ChosenProductContext';
import '../css/summary.css'

function Summary() {
    const [choseItems, setItems, addItemToList, removeItemsFromList,allProductList, setAllProductList, order,setOrder]= useContext(ChosenProductContext);

    const date = new Date();



    return (
        <div className="summary_wrapper">
            <div className="summary_details"> 
                <h3>Zamówienie dla : {order.client}</h3>
                <h3>Numer telefonu: {order.client_number}</h3>
                <h3>Adres e-mail: {order.client_email}</h3>
                <h3>Adres inwestycji: {order.client_Investment_Place}</h3>
                <h3>{date.toLocaleDateString('en-GB')}</h3>
            </div>
            <div className="table_container">
            <table className="items_table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nazwa Produktu</th>
                        <th>Ilość</th>
                    </tr>
                </thead>
                <tbody>
                    {choseItems.map((el,i) => {
                        return <tr>
                            <th>{el.id}</th>
                            <td>{el.name}</td>
                            <td>{el.qty}</td>
                        </tr>
                        })} 
                </tbody>
            </table>
            
            </div>
            <div className="summation">
            <h2 className="summary_total">Total: {order.total}</h2>
            <div>
            <button className = "save_btn">Save</button>
            <button>Print</button>
            </div>
            </div>
        </div>
    )
}

export default Summary
