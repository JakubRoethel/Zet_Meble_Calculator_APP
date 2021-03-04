import React, {useContext} from 'react'
import {ChosenProductContext} from './ChosenProductContext';
import '../css/summary.css'

function Summary() {
    const [choseItems, setItems, addItemToList, removeItemsFromList,allProductList, setAllProductList, order,setOrder]= useContext(ChosenProductContext);

    const date = new Date();



    return (
        <div className="summary_wrapper">
            <div className="d-flex justify-content-between"> 
                <h3>Zamówienie dla : {order.client}</h3>
                <h3>Numer telefonu: {order.client_number}</h3>
                <h3>Adres e-mail: {order.client_email}</h3>
                <h3>Adres inwestycji: {order.client_Investment_Place}</h3>
                <h3>{date.toLocaleDateString('en-GB')}</h3>
            </div>
            <div className="container-fluid my-3 w-75">
            <table className="table my-4 text-center">
            <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nazwa produktu</th>
                    <th scope="col">Ilość</th>
                    </tr>
                </thead>
                <tbody>
                {choseItems.map(el => {
                                return <tr>
                                <th scope="row">{el.id}</th>
                                <td>{el.name}</td>
                                <td>{el.qty}</td>
                            </tr>  
                        })}
                </tbody>
            </table>
            </div>
            <div className="d-flex justify-content-between">
            <h2>Total: {order.total}</h2>
            <div className="button-container">
            <button>Save</button>
            <button>Print</button>
            </div>
            </div>
        </div>
    )
}

export default Summary
