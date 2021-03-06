import React, { useRef,useContext,useState, useEffect } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import Summary from './Summary';
import {useReactToPrint} from "react-to-print";
import {ChosenProductContext} from './ChosenProductContext';
import uuid from 'react-uuid';
import ValuationArchive from "./ValuationArchive"
import firebase from "../firebase/firebase"
import {UserContext} from "./UserContext"
import {Link} from 'react-router-dom';
import history from "./history";


function SummaryPdfPrint ({match}) {
  const [choseItems, setChosenItems, addItemToList, removeItemsFromList,allProductList, setAllProductList, order,setOrder,removeItemFromDataBase,saveValuation, setSaveValuation,markup, setMarkup]= useContext(ChosenProductContext);
  const [user, setUser] = useContext(UserContext)


  const date = new Date();


  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  // const itemsPrice = choseItems.reduce((a,c) => a + c.price * c.qty, 0)

  const [itemObj,setItemObj] = useState({
    group:"",
    name: "",
    price: "",
    qty:"",
    color:"",
    company:"",
    displayGroup: "",
    productGroup: ""
  })

  // console.log(itemObj)
  // console.log(choseItems)

  const [error,setError]= useState({
    nameError:"",
    priceError:"",
    groupError: "",
    qtnError: ""
  })

  const handleInputs = (e) => {
    setError({
      ...error,
      [`${e.target.id}Error`]: {
        [`${e.target.id}ErrorMessage`]: "",
        isError: false
      }
    })

    if(e.target.value != "") {
      setItemObj({...itemObj, [e.target.id]: e.target.value})
      console.log(itemObj)
    } else {
      // setItemObj({...itemObj, [e.target.id]:""})
      setError({
        ...error,
        [`${e.target.id}Error`]: {
        [`${e.target.id}ErrorMessage`]: "Wypełni obowiązkowe pole",
        isError: true
        }
      })
    }
  }
  // console.log(error)


const handleSubmit =(e) => {
  e.preventDefault()

  if(!error.nameError.isError && !error.priceError.isError&& !error.groupError.isError && !error.qtnError.isError && itemObj.name != ""  ){
    setChosenItems([...choseItems,{...itemObj, id: uuid()}])
  }
  // console.log("Submit")
  // console.log(choseItems)
    deleteData()
}
// useEffect(()=>{
//   setOrder(
//     {...order,
//       total: choseItems.reduce((a,c) => a + c.price * c.qty, 0)}
//   )
// },[choseItems])

const deleteData = () => {
  // console.log("działa")
   setItemObj({
    group:"",
    name: "",
    price: "",
    qty:"",
    color:"",
    company:"",
    displayGroup: "",
    productGroup: ""
   })
}
   const [displayQty, setDisplayQty] = useState(false)

   const changeDisplayQty = () => {
     setDisplayQty(!displayQty)
   }

  //  console.log(choseItems)

   const [moreInformation, setMoreInformation] = useState({})

   const handleAdditionalSpecification = (e,key) => {
    console.log(key)

    choseItems.forEach((el,i) => {
      if(i=== key){
        el = {
          ...el,
          additionalSpecification:e.target.value
        }
        // console.log(el)
      }
    })

    }

   const handleMoreInformation = (e) => {
     console.log(e.target.value)
     console.log(order)
     setOrder({
       ...order,
       moreInformation: e.target.value
     })
    }
    // console.log(order)

    const btnSave = () => {

      if(match.params.id != undefined) {
        console.log("jestem")
        setSaveValuation(saveValuation.map((el,i) => {
          if(i == match.params.id) {
            console.log(el.id)
            console.log("XXXX")
            console.log(order)
            return  order
          } else {
            return el
          }
        }))
            console.log("saveValuation")
            console.log(saveValuation)
      } else {
        console.log("jestem w else")
        setSaveValuation([...saveValuation, order])
        console.log("saveValuation")
        console.log(saveValuation)
        console.log("order")
        console.log(order)
      }


      // console.log(saveValuation)
    }

   useEffect(() => {
    //  console.log("ChosenItems USeEf")
    //  console.log(choseItems)
    setOrder({...order, array:choseItems, id:uuid(), date: date.toLocaleDateString('en-GB')})
    if(saveValuation.length > 0){
        const saveValuationRef = firebase.database().ref('saveValuation');
        // console.log("jestem");
        saveValuationRef.set(saveValuation);
    } else {
      console.log("tablica = 0")
    }


    // console.log(saveValuation);

   },[saveValuation,choseItems])

  //  console.log(moreInformation)

  const backToCalculator = (id) => {
    if (match.params.id != undefined){
      history.push(`/wyceń/${id}`)
    } else {
      history.push('/wyceń')
    }
  }


  return (
    <>
      {user != undefined ?
    <div className= "container-fluid my-3 w-100">
      <Summary ref ={componentRef} order={order} date={date} choseItems={choseItems} displayQty={displayQty} handleAdditionalSpecification= {handleAdditionalSpecification} handleMoreInformation={handleMoreInformation} markup={markup} />
      <div className="button-container d-flex justify-content-end">
        <button onClick={handlePrint} className="btn btn-secondary" >Drukuj
        <i class="bi bi-printer ms-2"></i>
        </button>
        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Dodaj produkt ręcznie</button>
        <button onClick={changeDisplayQty} className="btn btn-secondary">Szczegóły</button>
        <button onClick={btnSave} className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#saveValuation">Zapisz</button>
        <button onClick={el => backToCalculator(match.params.id)} className="btn btn-secondary">Wróc</button>
      </div>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Dodaj produkt</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={deleteData}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="d-flex">
                    <div  className="m-3">
                        <div className="mb-3">
                          <label for="name" className="col-form-label">Grupa produktu</label>
                          <input value={itemObj.group} type="text" className="form-control" id="group" onChange={handleInputs}/>
                          {error.groupError.isError ? <p style={{color:"red"}}>{error.groupError.groupErrorMessage}</p> : null}
                        </div>
                        <div className="mb-3">
                          <label for="name" className="col-form-label">Nazwa produktu</label>
                          <input value={itemObj.name} type="text" className="form-control" id="name" onChange={handleInputs}/>
                          {error.nameError.isError ? <p style={{color:"red"}}>{error.nameError.nameErrorMessage}</p> : null}
                        </div>
                        <div class="mb-3">
                          <label for="color" className="col-form-label">Dodatkowe informacjie</label>
                          <input value={itemObj.color} type="text" className="form-control" id="color" onChange={handleInputs}/>
                        </div>
                        <div class="mb-3">
                          <label for="company" className="col-form-label">Producent</label>
                          <input value={itemObj.company} type="text" className="form-control" id="company" onChange={handleInputs}/>
                        </div>
                    </div>
                    <div className="m-3">
                      <div className="mb-3">
                        <label for="productGroup" className="col-form-label">Szczegóły</label>
                        <input value={itemObj.productGroup} type="text" className="form-control" id="productGroup" onChange={handleInputs} />
                      </div>
                      <div class="mb-3">
                        <label for="price" className="col-form-label">Cena</label>
                        <input value={itemObj.price} type="text" className="form-control" id="price" onChange={handleInputs}/>
                        {error.priceError.isError ? <p style={{color:"red"}}> {error.priceError.priceErrorMessage}</p> : null}
                      </div>
                      <div class="mb-3">
                        <label for="qty" className="col-form-label">Ilość</label>
                        <input value={itemObj.qty} type="text" className="form-control" id="qty" onChange={handleInputs}/>
                      </div>
                      <div class="mb-3 d-flex flex-column ">
                        <label for="qty" className="col-form-label">Opcja wyświetlania</label>
                        <select id="displayGroup" onChange={handleInputs}>
                            <option id="displayGroup" value= "default" selected disabled="disabled">Wybierz opcje wyświetlania</option>
                            <option value= "Meble"> Meble</option>
                            <option value= "Opcje dodatkowe">Opcje dodatkowe</option>
                            <option value= "Blaty">Blaty</option>
                        </select>
                      </div>
                    </div>
                </div>
                <div class="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Anuluj</button>
                  <button type="submit" className="btn btn-primary">Dodaj</button>
               </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="saveValuation" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="statisaveValuation">Dodano wycenę</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
         <div class="modal-body">
          Twoja wycena została dodana
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zamknij</button>
      </div>
    </div>
  </div>
</div>
    </div>
    :
    <h3 className='container-fluid mt-5 text-center'>Zaloguj się</h3>
      }
    </>
  )
}

export default SummaryPdfPrint
