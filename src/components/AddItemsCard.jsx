import React, { useContext, useState,useEffect } from 'react'
import {ChosenProductContext} from './ChosenProductContext';
import uuid from 'react-uuid';
import firebase from "../firebase/firebase"
import { UserContext } from './UserContext';

function AddItemsCard() {

    const [choseItems, setChosenItems, addItemToList, removeItemsFromList,allProductList, setAllProductList, order,setOrder,removeItemFromDataBase,saveValuation, setSaveValuation,markup, setMarkup] = useContext(ChosenProductContext);

    const [user,setUSer] = useContext(UserContext)

    console.log(allProductList)

    // moja pusta jeszcze tablica obiektów do której dodamy obiekt prodykty a później ustawie
    // tablicę allProd.. za pomoca setAll..
    const [itemObj, setItemObj] = useState({
        name: "",
        price: "",
        color: "",
        company: "",
        id: ""
    });
    const [group,setGroup] = useState(allProductList.map(x=>x.groupName));

    const [subGroup, setSubGroup] = useState([])


    const handleAdd = (e) => {
        e.preventDefault()
        // console.log(itemObj)

        if(itemObj.name == '') {
            setError({
                ...error,
                nameError: {
                    nameErrMessage: 'Wypełnij obowiązkowe pole',
                    isError: true
                }
            })
        } else if(itemObj.price == '') {
            setError({
                ...error,
                priceError: {
                    priceErrMessage: 'Wypełnij obowiązkowe pole',
                    isError: true
                }
            })
        }

        if(!error.nameError.isError && !error.priceError.isError){
            console.log(itemObj)
            if(itemObj.id != '') {
                console.log("jestem")
                // console.log(itemObj.id)
                setAllProductList(
                    allProductList.map(groupEl => {
                        return {...groupEl, array: groupEl.array.map(subGroupEl => {
                            return subGroup.subGroupName === subGroupEl.subGroupName ? {...subGroupEl,subArray: subGroupEl.subArray.map(item => {
                            return itemObj.id === item.id ? itemObj: item
                            })} : subGroupEl
                        })}
                    })
                )
                setTitle("Dodaj nowy Produkt")
                setItemObj({
                    name: "",
                    price: "",
                    color: "",
                    company: "",
                    id: ""
                })
                setGroup([])
                setSubGroup([])
            } else {
                setAllProductList(
                    allProductList.map(groupEl => {
                        console.log("jestem w else ");
                        // console.log(groupEl)
                        return {...groupEl, array: groupEl.array.map(subGroupEl => {
                            console.log(subGroupEl)
                            return subGroup.subGroupName === subGroupEl.subGroupName ? {...subGroupEl,subArray:[...subGroupEl.subArray, {...itemObj, id:uuid()}]}
                            : subGroupEl
                        })}
                    })
                )
            }
        }
        // console.log(allProductList)

        //czyszczenie formularza
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = ""))


        setButtonText("Dodaj")
    }


    // funkcje na inputach dodawanie poszczególnych właściwości do obiektów 

    const handleName = (e) => {
        setError({
            ...error,
            nameError: {
                nameErrMessage: "",
                isError: false
            }
        })
        // console.log(e)
        
        if (e.target.value != "") {
            setItemObj({...itemObj, name:e.target.value})
        } else {
            setItemObj({...itemObj, name: ""});
            setError({
                ...error,
                nameError: {
                    nameErrMessage: "Wypełni obowiązkowe pole",
                    isError: true
                }
            })
        }

        // console.log(error.nameError)
        // console.log(error.nameError.isError)
        
    }

    const handlePrice = (e) => {
        setError({
            ...error,
            priceError: {
                priceErrMessage: "",
                isError: false
            }
        })
        if (e.target.value != "") {
            setItemObj({...itemObj, price:e.target.value})
        } else {
            setItemObj({...itemObj, price: ""});
            setError({
                ...error,
                priceError: {
                    priceErrMessage: "Wypełni obowiązkowe pole",
                    isError: true
                }
            })
        }
    }


    const handleCompany = (e) => {
        if (e.target.value != "") {
            setItemObj({...itemObj, company:e.target.value})
        } else {
            setItemObj({...itemObj, company: ""})
        }
    }

    const handleProductDetails = (e) => {
        if(e.target.value != "") {
            setItemObj({...itemObj, productGroup: e.target.value})
        } else {
            setItemObj({...itemObj, productGroup: ""})
        }
    }
    // console.log(itemObj.productGroup)


    // console.log(allProductList);
    // console.log(group);

    const handleGroupSelect = (e) => {
        const searchGroupArray = allProductList.find(x=>{
            return x.groupName === e.target.value})

            // console.log(searchGroupArray)
            setGroup(searchGroupArray)
    }

    const handleSubGroupSelect = (e) => {
        const searchSubGroup = group.array.find(x => {
            return x.subGroupName === e.target.value
        })
        // console.log(searchSubGroup.subGroupName);
        // console.log(searchSubGroup.subArray);
        setSubGroup(searchSubGroup);
        // console.log(searchSubGroup)
    }

  

    const handleUpdata = (product,group,subGroup) => {
        setGroup(group)
        setSubGroup(subGroup)
        setItemObj(product)
        setButtonText("Zakończ Edycję")
        setTitle("Edytuj produkt")
        // console.log(product)
    }

    const [buttonText,setButtonText] = useState("Dodaj")
    const [title,setTitle] = useState("Dodaj nowy produkt")

    const [error,setError] = useState({
        nameError: "",
        priceError: ""
    })


   const handleMarkup = (e) => {
       setMarkup(e.target.value)

   }
   console.log(markup)

    useEffect(() => {
        const productRef = firebase.database().ref('products');
            //  console.log(allProductList);
             if(allProductList != 0) {
                productRef.set([...allProductList]);
             }
            
    }, [allProductList])

    const handleDisplayOption = (e) => {
        console.log(e.target.value)
        if(e.target.value == "Meble" || e.target.value == "Opcje dodatkowe") {
            setItemObj({...itemObj, displayGroup: e.target.value})
        }
    }

    const [displayMarkup,setDisplayMarkup] = useState(false)

    const handleChangeDisplayMarkup = () => {
        setDisplayMarkup(true)
    }


    return (
        <>
            {user != undefined ?
                <div className='container-fluid d-flex'>
                <div className='col-lg-6 d-flex flex-column align-items-center'>
                    <h1 className='my-5 text-center'>{title} </h1>
                    <form onSubmit={handleAdd} className='col-lg-6 d-flex flex-column'>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Nazwa produktu</label>
                            <input onChange={handleName} type="text" className="form-control" name='nazwa' value={itemObj.name}></input>
                            {error.nameError.isError ? <p style={{color:"red"}}>{error.nameError.nameErrMessage}</p> : null}
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Cena</label>
                            <input onChange={handlePrice} type="text" className="form-control" value={itemObj.price}></input>
                            {error.priceError.isError ? <p style={{color:"red"}}>{error.priceError.priceErrMessage}</p> : null}
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Producent</label>
                            <input onChange={handleCompany} type="text" className="form-control" value={itemObj.company} ></input>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Szcegóły produktu (np.korpus,rodzaj frezu itp)</label>
                            <input onChange={handleProductDetails}  type="text" className="form-control" value={itemObj.productGroup} ></input>
                        </div>
                        <div className="filters d-flex">
                            <select onChange={handleDisplayOption} className="form-select mx-2">
                                <option value= "default" selected disabled="disabled">Wybierz opcje wyświetlania</option>
                                <option value= "Meble"> Meble</option>
                                <option value= "Opcje dodatkowe">Opcje dodatkowe</option>
                            </select>
                        </div>
                        <div className="filters d-flex">
                        <select disabled={itemObj.id != ""}  value= {typeof group.groupName == "undefined" ? "default" : group.groupName} className="form-select mx-2" aria-label="Default select example" onChange={handleGroupSelect}>
                            <option  value= "default" selected disabled="disabled">Wybierz grupę </option>
                            {allProductList.map(el => {
                                return <option value={el.groupName}>{el.groupName}</option>
                            })}
                        </select>
                        <select disabled={itemObj.id != ""} value = {typeof subGroup.subGroupName == "undefined" ? "default" : subGroup.subGroupName} className="form-select mx-2" aria-label="Default select example" onChange={handleSubGroupSelect}>
                            <option  value="default" selected disabled="disabled">Wybierz podgrupę</option>
                            {typeof group.array !== "undefined" ? group.array.map(el => {
                                return <option value={el.subGroupName}>{el.subGroupName}</option>
                            }) : "" }
                        </select>
                    </div>
                        <button type="submit" className="btn btn-secondary mt-3">{buttonText}</button>
                    </form>
                    {displayMarkup == false ? 
                        <div className='col-lg-6 d-flex flex-column m-5'>
                            <button onClick={handleChangeDisplayMarkup} className="btn btn-secondary mt-2">Marża</button> 
                        </div>
                        :
                        <div className='col-lg-6 d-flex flex-column m-5'>
                            <h5>Marża</h5>
                            <input className="form-control" onBlur={handleMarkup} type="number" defaultValue={markup}></input>
                        </div>

                    }

                </div>
                <div className='col-lg-6'>
                    <h1 className='my-5 text-center'>Lista dostepnych produktów</h1>
                    <div className='list'>
                        {allProductList.length == 0 ? <h2 className='text-center'>Nie dodałeś żadnych produktów</h2> : allProductList.map(group => {

                            return group.array.map(subGroup => {
                                console.log(subGroup.subArray)
                                return  subGroup.subArray.map(product => {

                                    return <div className='product-card'>
                                            <div className='details'>
                                                <h5>{group.groupName}</h5>
                                                <h5>{subGroup.subGroupName}</h5>
                                                <h5>{product.name}</h5>
                                                <p>{product.price} | {product.productGroup} | {product.displayGroup} | {product.company}</p>
                                            </div>
                                        <div className='button-container'>
                                            <button onClick={() => handleUpdata(product,group,subGroup)} className='btn btn-secondary'>Edytuj</button>
                                            <button onClick={() => removeItemFromDataBase(product)} className='btn btn-danger'>Usuń</button>
                                        </div>
                                    </div>
                            })
                        })})}
                        </div>
                    </div>

                </div>
                :
                <h3 className='container-fluid mt-5 text-center'>Zaloguj się</h3>
            }
    </>
    )
}

export default AddItemsCard
