import React, {useContext, useState} from 'react'
import '../css/product.css'
// import productArr from '../dataBase/Products';
import {ChosenProductContext} from './ChosenProductContext'


//  z useContext funkcja addItmestolist dodaje element do nowej tablicy (product)
// uzyta na buttonie

function Product({product}) {

    const [choseItems, setItems, addItemToList, removeItemsFromList,allProductList, setAllProductList, order,setOrder,removeItemFromDataBase] = useContext(ChosenProductContext);
    const [color, setColor] = useState()

    return (
    <div className="product-card">
        <div className="details">
            <h1>{product.name}</h1>
            <p>{product.defaultColor} | {product.company} | <input onBlur={(e) => setColor(e.target.value) } className="color" type="text" placeholder="Kolor"></input></p>
        </div>
        <div className="button-container">
            <button className="btn btn-primary" onClick = {()=>addItemToList({...product, color: color})}>Add</button>
        </div>
    </div>
    )
}

export default Product
