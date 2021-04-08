import React, { useRef,useContext,useState}  from 'react'
import {useReactToPrint} from "react-to-print";
import SingleValuation from './SingleValuation';
import {ChosenProductContext} from './ChosenProductContext';
import history from "./history";


function SingleValuationPdfPrint({match}) {

    const [choseItems, setChosenItems, addItemToList, removeItemsFromList,allProductList, setAllProductList, order,setOrder,removeItemFromDataBase,saveValuation, setSaveValuation] = useContext(ChosenProductContext)

    const componentRef = useRef();
    const handlePrintValuation = useReactToPrint({
      content: () => componentRef.current,
    })

    const element = saveValuation[match.params.id]

    console.log("Twój element")
    console.log(element)
    
    console.log(element.array)

    const [displayQty, setDisplayQty] = useState(false)

    const changeDisplayQty = () => {
      setDisplayQty(!displayQty)
    }

    const editValuation = (id) => {
        console.log(id)
        setChosenItems(element.array)
        setOrder({
            client: element.client,
            client_number: element.client_number
        })
        history.push(`/wyceń/${id}`)

    }

    

    

    return (
        <div className="w-100">
            <SingleValuation ref={componentRef} element={element} displayQty={displayQty}/>
            <div className="button-container d-flex justify-content-end">
                <button onClick={handlePrintValuation} className="btn btn-secondary" >Drukuj
                    <i class="bi bi-printer ms-2"></i>
                </button>
                <button onClick={changeDisplayQty} className="btn btn-secondary">Szczegóły</button>
                <button onClick={(e)=> editValuation(match.params.id)} className="btn btn-secondary"> Edytuj</button>
            </div>
        </div>
    )
}

export default SingleValuationPdfPrint
