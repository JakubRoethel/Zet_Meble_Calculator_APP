import React, {useContext } from 'react';
import {UserContext} from "./UserContext"
import {ChosenProductContext} from './ChosenProductContext';
import history from "./history";
import "../css/valuationArchive.css"

function ValuationArchive() {
    const [user,setUSer]= useContext(UserContext)
    const [choseItems, setChosenItems, addItemToList, removeItemsFromList,allProductList, setAllProductList, order,setOrder,removeItemFromDataBase,saveValuation, setSaveValuation] = useContext(ChosenProductContext)
    console.log(saveValuation)

    const showValuation = (id) => {
        history.push(`/wyceny/singleValuation/${id}`)
        console.log(id)
    }


    return (
        <>
            {user != undefined ?
                <div className='container-fluid-add-product text-center w-100 mt-5'>
                    <h1>Zapisane wyceny</h1>
                    <ul className="d-flex justify-content-center flex-wrap mt-3" >
                       {saveValuation.map((el, id) => {
                           console.log(el.id)
                           return <>
                                {el === "" ? null :
                                    <div className="valuation-card" onClick={(e) => showValuation(id)}>{el.client} {el.date} {el.client_Investment_Place}</div>}
                           </>
                            })}
                    </ul>
                </div>
                :
                <h3 className='container-fluid mt-5 text-center'>Zaloguj się</h3>
            }
        </>
    )
}

export default ValuationArchive
