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
        setAllProductList(
            allProductList.map(groupEl => {
                console.log(groupEl)
                return {...groupEl, array: groupEl.array.map(subGroupEl => {
                    console.log(subGroupEl)
                    return {...subGroupEl,subArray:[...subGroupEl.subArray, itemObj]}
                })}
            })
        )
        // console.log(allProductList)

        //czyszczenie formularza
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = ""))

        alert("Dodano Produkt")
    }


    // funkcje na inputach dodawanie poszczególnych właściwości do obiektów 

    const handleName = (e) => {
        // console.log(e)
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

    const [group,setGroup] = useState([allProductList.map(x=>x.groupName)]);

    const [subGroup, setSubGroup] = useState([])

    // console.log(allProductList);
    // console.log(group);

    const handleGroupSelect = (e) => {
        const searchGroupArray = allProductList.find(x=>{
            return x.groupName === e.target.value})

            // console.log(searchGroupArray)
            setGroup(searchGroupArray.array)
            setSubGroup([])
    }

    const handleSubGroupSelect = (e) => {
        const searchSubGroup = group.find(x => {
            return x.subGroupName === e.target.value
        })
        // console.log(searchSubGroup.subGroupName);
        // console.log(searchSubGroup.subArray);
        setSubGroup(searchSubGroup);
        // console.log(subGroup)
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
                <div className="filters d-flex">
                 <select  className="form-select mx-2" aria-label="Default select example" onChange={handleGroupSelect}>
                    <option selected disabled="disabled">Wybierz grupę </option>
                    {allProductList.map(el => {
                         return <option value={el.groupName}>{el.groupName}</option>
                    })}
                </select>
                <select value = {typeof subGroup.subGroupName == "undefined" ? "default" : subGroup.subGroupName} className="form-select mx-2" aria-label="Default select example" onChange={handleSubGroupSelect}>
                    <option  value="default" selected disabled="disabled">Wybierz podgrupę</option>
                    {typeof group !== "undefined" ? group.map(el => {
                        return <option value={el.subGroupName}>{el.subGroupName}</option>
                    }) : "" }
                </select>

            </div>
                
                <button type="submit" class="btn btn-primary mt-3">Dodaj</button>
            </form>
        </div>
        <div className='col-lg-6'>
            <h1 className='my-5 text-center'>Lista dostepnych produktów</h1>
            <div className='list'>
                {allProductList.length == 0 ? <h2 className='text-center'>Nie dodałeś żadnych produktów</h2> : allProductList.map(group => {
                    // console.log(product)
                    // console.log(subGroup)

                    return group.array.map(subGroup => {
                        // console.log(subGroup)

                        return  subGroup.subArray.map(product => {

                            return <div className='product-card'>
                                    <div className='details'>
                                        <h5>{group.groupName}</h5>
                                        <h5>{subGroup.subGroupName}</h5>
                                        <h5>{product.name}</h5>
                                         <p>{product.price} | {product.color} | {product.company} | {product.productGroup}</p>
                                    </div>
                                <div className='button-container'>
                                    <button onClick={() => removeItemFromDataBase(product)} className='btn btn-danger'>Remove</button>
                                </div>
                            </div>
                    })
                })})}
            </div>
        </div>
    </div>
    )
}

export default AddItemsCard
