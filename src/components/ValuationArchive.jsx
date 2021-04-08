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
        history.push(`/wyceny/singleValuationPdfPrint/${id}`)
        console.log(id)
    }


    return (
        <>
        
            {user != undefined ?
                <div className='container-fluid-add-product text-center w-100 mt-5'>
                    <table class="table table-striped mt-3">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Dane klienta</th>
                            <th scope="col">Miejsce inwestycji</th>
                            <th scope="col">Data</th>
                            </tr>
                        </thead>
                        {saveValuation.map((el, id) => {
                            
                            return <>
                                        {el === "" ? null :
                                             <tbody className="valuation-table" onClick={(e) => showValuation(id)}>
                                                <tr>
                                                <th scope="row">{id}</th>
                                                <td>{el.client}</td>
                                                <td className=".bg-white">{el.client_Investment_Place}</td>
                                                <td>{el.date}</td>
                                                </tr>
                                                </tbody>
                                        }
                                   </>
                        })}
                    </table>
                </div>
                :
                <h3 className='container-fluid mt-5 text-center'>Zaloguj się</h3>
            }
        </>
    )
}

export default ValuationArchive
