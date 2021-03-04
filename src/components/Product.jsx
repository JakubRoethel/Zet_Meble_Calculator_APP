import React, {useContext} from 'react'
import '../css/product.css'
// import productArr from '../dataBase/Products';
import {ChosenProductContext} from './ChosenProductContext'


//  z useContext funkcja addItmestolist dodaje element do nowej tablicy (product)
// uzyta na buttonie

function Product({product}) {

    const [choseItems, setItems, addItemToList] = useContext(ChosenProductContext);


    return (
    <div className="product-card">
        <div className="details">
            <h1>{product.name}</h1>
            <p>{product.color} | {product.company}</p>
        </div>
        <div className="button-container">
            <button className="btn btn-primary" onClick = {()=>addItemToList(product)}>Add</button>
        </div>
    </div>
    )
}

export default Product
