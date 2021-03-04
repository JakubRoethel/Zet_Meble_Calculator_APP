import React, { useContext, useState } from 'react'
import '../css/addItmesCard.css'
import {ChosenProductContext} from './ChosenProductContext';
import uuid from 'react-uuid';

function AddItemsCard() {

    const [choseItems, setItems, addItemToList, removeItemsFromList,allProductList, setAllProductList, order,setOrder,removeItemFromDataBase] = useContext(ChosenProductContext);

    // moja pusta jeszcze tablica obiektów do której dodamy obiekt prodykty a później ustawie
    // tablicę allProd.. za pomoca setAll..
    const [itemObj, setItemObj] = useState([]);

    const hendleAdd = (e) => {
        e.preventDefault()
        // console.log(itemObj)
        setAllProductList([...allProductList, itemObj])
        // console.log(allProductList)

        //czyszczenie formularza
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = ""))

        alert("Dodano Produkt")
    }


    // funkcje na inputach dodawanie poszczególnych właściwości do obiektów 

    const hendleName = (e) => {
        console.log(e)
        setItemObj({...itemObj, name:e.target.value, id:uuid()})
    }

    const hendlePrice = (e) => {
        setItemObj({...itemObj, price:e.target.value})
    }

    const hendleColor = (e) => {
        setItemObj({...itemObj, color:e.target.value})
    }

    const hendleCompany = (e) => {
        setItemObj({...itemObj, company:e.target.value})
    }


    return (
        <div className="add_item_wrapper">
            <div className="form_container">
            <h1 className="title">Dodaj nowy Produkt</h1>
            <form onSubmit={hendleAdd} className= "add_form">
                <div className="input_wrapper">
                    <label>Nazwa Produktu</label>
                    <input onBlur={hendleName} type="text"></input>
                </div>
                <div className="input_wrapper">
                    <label>Cena</label>
                    <input onBlur={hendlePrice} type="text"></input>
                </div>
                <div className="input_wrapper">
                    <label>Kolor</label>
                    <input onBlur={hendleColor} type="text"></input>
                </div>
                <div className="input_wrapper">
                    <label>Producent</label>
                    <input onBlur={hendleCompany} type="text"></input>
                </div>
                <button type="submit" className="btn_submit">Dodaj</button>
            </form>
            </div>
            <div className="new_product_wrapper">
            <h1>Lista Produktów</h1>
            <div className="new_products_card">
                {allProductList.map(product => {
                    return (
                        <div className="product_card">
                            <div className="product_details">
                                <h1>{product.name}</h1>
                                <p>{product.price} | {product.color} | {product.company} | {product.productGroup}</p>
                            </div>
                            <div className="btn_container_add">
                                <button className="btn_remove" onClick={() => removeItemFromDataBase(product)}>Remove</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            </div>
        </div>
    )
}

export default AddItemsCard
