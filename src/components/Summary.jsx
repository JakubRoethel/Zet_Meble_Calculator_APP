import React, {useContext} from 'react'
import {ChosenProductContext} from './ChosenProductContext';
import '../css/summary.css'

function Summary() {
    const [choseItems, setItems, addItemToList, removeItemsFromList,allProductList, setAllProductList, order,setOrder]= useContext(ChosenProductContext);

    const date = new Date();

    



    return (
        <div className="summary_wrapper">
            <div className="d-flex justify-content-between m-4"> 
                <h5>Zamówienie dla : {order.client}</h5>
                <h5>Numer telefonu: {order.client_number}</h5>
                <h5>Adres e-mail: {order.client_email}</h5>
                <h5>Adres inwestycji: {order.client_Investment_Place}</h5>
                <h5>{date.toLocaleDateString('en-GB')}</h5>
            </div>
            <div className="container-fluid my-3 w-75">
            <table className="table my-4 text-center">
            <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nazwa produktu</th>
                    <th scope="col">Ilość</th>
                    <th scope="col">Kolor</th>
                    <th scope="col">Producent</th>
                    </tr>
                </thead>
                <tbody>
                {choseItems.map(el => {
                                return <tr>
                                <th scope="row">{el.id}</th>
                                <td>{el.name}</td>
                                <td>{el.qty}</td>
                                <td>{el.color}</td>
                                <td>{el.company}</td>
                                <td>{el.productGroup2}</td>
                            </tr>  
                        })}
                </tbody>
            </table>
            </div>
            <div className="d-flex justify-content-between m-4">
            <h5>Total: {order.total}</h5>
            <div className="button-container">
            <button>Save</button>
            <button>Print</button>
            </div>
            </div>
        </div>
    )
}

export default Summary
