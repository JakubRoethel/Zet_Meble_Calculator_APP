import React, {useContext, useState,useEffect } from 'react';
import {UserContext} from "./UserContext"
import {ChosenProductContext} from './ChosenProductContext';
import history from "./history";
import "../css/valuationArchive.css"
import firebase from "../firebase/firebase"

function ValuationArchive() {
    const [user,setUSer]= useContext(UserContext)
    const [choseItems, setChosenItems, addItemToList, removeItemsFromList,allProductList, setAllProductList, order,setOrder,removeItemFromDataBase,saveValuation, setSaveValuation,markup, setMarkup,removeValuation] = useContext(ChosenProductContext)
    console.log(saveValuation)

    const showValuation = (id) => {
        history.push(`/wyceny/singleValuationPdfPrint/${id}`)
        console.log(id)
    }

    const [filteredValuation,setFilteredValuation] = useState([])

    useEffect(() => {
        // console.log("SaveValuation")
        // console.log(saveValuation)
        setFilteredValuation(saveValuation);
        const valuationRef = firebase.database().ref('saveValuation');
             if(saveValuation != 0) {
                valuationRef.set([...saveValuation]);
             }
    },[saveValuation])

    
    
    console.log("filtered zmiana dodadana")
    console.log(filteredValuation)
    
    const filterInput= (e) => {
        let txt = e.target.value.toLowerCase();
        
        if (txt.length == 0) {
            setFilteredValuation(saveValuation)
        } else {
            setFilteredValuation(saveValuation.filter(valuation => {
                return valuation.client.toLowerCase().includes(txt)
            }))
        }
    }
    return (
        <>

            {user != undefined ?
                <div className='container-fluid-add-product text-center w-100 mt-5'>
                    <div className="d-flex flex-row form-group flex-wrap justify-content-center mb-5">
                        <input className="form-control form-control-lg w-25" type="text" placeholder="Szukaj" onChange={filterInput}></input>
                    </div>
                    <table class="table table-striped mt-3">
                        <thead>
                            <tr>
                            <th scope="col">Nr</th>
                            <th scope="col">Dane klienta</th>
                            <th scope="col">Miejsce inwestycji</th>
                            <th scope="col">Data</th>
                            <th scope="col">Usuń</th>
                            </tr>
                        </thead>
                        {filteredValuation.length != 0 ?
                        filteredValuation.map((el, id) => {
                            return <>
                                        {el === "" ? null :
                                             <tbody className="valuation-table" >
                                                <tr>
                                                <th onClick={(e) => showValuation(id)} scope="row">{id+1}</th>
                                                <td onClick={(e) => showValuation(id)}>{el.client}</td>
                                                <td onClick={(e) => showValuation(id)} className=".bg-white">{el.client_Investment_Place}</td>
                                                <td onClick={(e) => showValuation(id)}>{el.date}</td>
                                                <td>
                                                    <button className='btn btn-danger mx-2' onClick={() => removeValuation(el)}>-</button>
                                                </td>
                                                </tr>
                                                </tbody>
                                        }
                                   </>
                        })
                        :
                        saveValuation.map((el, id) => {
                            return <>
                                        {el === "" ? null :
                                             <tbody className="valuation-table" >
                                                <tr>
                                                <th onClick={(e) => showValuation(id)} scope="row">{id+1}</th>
                                                <td onClick={(e) => showValuation(id)}>{el.client}</td>
                                                <td onClick={(e) => showValuation(id)} className=".bg-white">{el.client_Investment_Place}</td>
                                                <td onClick={(e) => showValuation(id)}>{el.date}</td>
                                                <td>
                                                    <button className='btn btn-danger' onClick={() => removeValuation(el)}>-</button>
                                                </td>
                                                </tr>
                                                </tbody>
                                        }
                                   </>
                        })
                    }
                    </table>
                </div>
                :
                <h3 className='container-fluid mt-5 text-center'>Zaloguj się</h3>
            }
        </>
    )
}

export default ValuationArchive
