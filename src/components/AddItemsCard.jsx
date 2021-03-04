import React, { useContext, useState } from 'react'
import {ChosenProductContext} from './ChosenProductContext';
import uuid from 'react-uuid';

function AddItemsCard() {

    const [choseItems, setItems, addItemToList, removeItemsFromList,allProductList, setAllProductList, order,setOrder,removeItemFromDataBase] = useContext(ChosenProductContext);

    // moja pusta jeszcze tablica obiektów do której dodamy obiekt prodykty a później ustawie
    // tablicę allProd.. za pomoca setAll..
    const [itemObj, setItemObj] = useState([]);

    const handleAdd = (e) => {
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

    const handleName = (e) => {
        console.log(e)
        setItemObj({...itemObj, name:e.target.value, id:uuid()})
    }

    const handlePrice = (e) => {
        setItemObj({...itemObj, price:e.target.value})
    }

    const handleColor = (e) => {
        setItemObj({...itemObj, color:e.target.value})
    }

    const handleCompany = (e) => {
        setItemObj({...itemObj, company:e.target.value})
    }


    return (
        <div className='container-fluid d-flex'>
        <div className='col-lg-6 d-flex flex-column align-items-center'>
            <h1 className='my-5 text-center'>Dodaj nowy produkt </h1>
            <form onSubmit={handleAdd} className='col-lg-6 d-flex flex-column'>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Nazwa produktu</label>
                    <input onBlur={handleName} type="text" class="form-control" name='nazwa'></input>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Cena</label>
                    <input onBlur={handlePrice} type="text" class="form-control"></input>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Kolor</label>
                    <input onBlur={handleColor} type="text" class="form-control" ></input>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Producent</label>
                    <input onBlur={handleCompany} type="text" class="form-control" ></input>
                </div>
                
                <button type="submit" class="btn btn-primary mt-3">Dodaj</button>
            </form>
        </div>
        <div className='col-lg-6'>
            <h1 className='my-5 text-center'>Lista dostepnych produktów</h1>
            <div className='list'>
                {allProductList.length == 0 ? <h2 className='text-center'>Nie dodałeś żadnych produktów</h2> : allProductList.map(product => {
                    return <div className='product-card'>
                                <div className='details'>
                                    <h1>{product.name}</h1>
                                    <p>{product.price} | {product.color} | {product.company} | {product.productGroup}</p>
                                </div>
                                <div className='button-container'>
                                    <button onClick={() => removeItemFromDataBase(product)} className='btn btn-danger'>Remove</button>
                                </div>
                            </div>
                })}
            </div>
        </div>
    </div>
    )
}

export default AddItemsCard
