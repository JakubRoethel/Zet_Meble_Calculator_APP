import React, {useContext, useState} from 'react'
import '../css/product.css'
// import productArr from '../dataBase/Products';
import {ChosenProductContext} from './ChosenProductContext'


//  z useContext funkcja addItmestolist dodaje element do nowej tablicy (product)
// uzyta na buttonie

function Product({product,groupName}) {

    const [choseItems, setChosenItems, addItemToList, removeItemsFromList,allProductList, setAllProductList, order,setOrder,removeItemFromDataBase] = useContext(ChosenProductContext);
    const [additionalInformation, setAdditionalInformation] = useState(null)
    

    const handleAdditionalInformation = (e) => {
        console.log(e.target.value)
        setAdditionalInformation(e.target.value)
    }



    return (
    <div className="product-card">
        <div className="details w-100">
            <h5>{product.group}</h5>
            <h6>{product.name}</h6>
            <div className="d-flex ">
                {product.group === "Materiały" ? <p>{product.productGroup}</p>: null}
                {product.group === "Fronty" ? <p>{product.subGroup}</p>: null}
                {product.group === "Uchwyty" ? <p>{product.subGroup} | {product.productGroup}</p>: null}
                {product.group === "Szuflady" || product.group === "Systemy przechowywania" ? <p>{product.company} | {product.productGroup}</p>: null}
                {product.group === "Zawias" || product.group === "Podnośniki KPL" || product.group === "Technologia ruchu" ? <p>{product.company} |</p>: null}
                {product.subGroup === "Servo-drive Uno" ? <p> {product.productGroup}</p>: null }
                <input onBlur={handleAdditionalInformation} className="color ms-2" type="text" placeholder="Dodatkowe informacje"></input>
            </div>
        </div>
        <div className="button-container">
            <button className="btn btn-secondary" onClick = {()=>addItemToList({...product, additionalInformation: additionalInformation, groupName:groupName})}>Dodaj</button>
        </div>
    </div>
    )
}

export default Product
