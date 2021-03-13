import React, { useContext, useState } from 'react'
import {ChosenProductContext} from './ChosenProductContext';
import uuid from 'react-uuid';

function AddItemsCard() {

    const [choseItems, setItems, addItemToList, removeItemsFromList,allProductList, setAllProductList, order,setOrder,removeItemFromDataBase] = useContext(ChosenProductContext);

    // moja pusta jeszcze tablica obiektów do której dodamy obiekt prodykty a później ustawie
    // tablicę allProd.. za pomoca setAll..
    const [itemObj, setItemObj] = useState([]);
    const [group,setGroup] = useState([allProductList.map(x=>x.groupName)]);

    const [subGroup, setSubGroup] = useState([])

    const handleAdd = (e) => {
        e.preventDefault()
        // console.log(itemObj)
        if(itemObj.id) {
            console.log(itemObj)
        } else {
            setAllProductList(
                allProductList.map(groupEl => {
                    // console.log(groupEl)
                    return {...groupEl, array: groupEl.array.map(subGroupEl => {
                        console.log(subGroupEl)
                        return subGroup.subGroupName === subGroupEl.subGroupName ? {...subGroupEl,subArray:[...subGroupEl.subArray, {...itemObj, id:uuid()}]}
                        : subGroupEl
                    })}
                })
            )
        }
        // console.log(allProductList)

        //czyszczenie formularza
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = ""))

        alert("Dodano Produkt")

        setButtonText("Dodaj")
    }


    // funkcje na inputach dodawanie poszczególnych właściwości do obiektów 

    const handleName = (e) => {
        // console.log(e)
        setItemObj({...itemObj, name:e.target.value})
        console.log(itemObj)
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

    const handleUpdata = (product) => {
        setItemObj(product)
        setButtonText("Zakończ Edycję")
        console.log(product)
    }

    const  [buttonText,setButtonText] = useState("Dodaj")



    return (
        <div className='container-fluid d-flex'>
        <div className='col-lg-6 d-flex flex-column align-items-center'>
            <h1 className='my-5 text-center'>Dodaj nowy produkt </h1>
            <form onSubmit={handleAdd} className='col-lg-6 d-flex flex-column'>
                <div class="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Nazwa produktu</label>
                    <input onChange={handleName} type="text" className="form-control" name='nazwa' value={itemObj.name}></input>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Cena</label>
                    <input onChange={handlePrice} type="text" className="form-control" value={itemObj.price}></input>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Kolor</label>
                    <input onBlur={handleColor} type="text" className="form-control" ></input>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Producent</label>
                    <input onBlur={handleCompany} type="text" className="form-control" ></input>
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
                
                <button type="submit" className="btn btn-primary mt-3">{buttonText}</button>
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
                                    <button onClick={() => handleUpdata(product)} className='btn btn-danger'>Edytuj</button>
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
