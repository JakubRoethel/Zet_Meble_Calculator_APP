import React, { useRef,useContext,useState, useEffect } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import Summary from './Summary';
import {useReactToPrint} from "react-to-print";
import {ChosenProductContext} from './ChosenProductContext';
import uuid from 'react-uuid';


function SummaryPdfPrint () {
  const [choseItems, setItems, addItemToList, removeItemsFromList,allProductList, setAllProductList, order,setOrder]= useContext(ChosenProductContext);

  const date = new Date();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  // const itemsPrice = choseItems.reduce((a,c) => a + c.price * c.qty, 0)

  const [itemObj,setItemObj] = useState({
    name: "",
    price: "",
    qty:"",
    color:"",
    company:""
  })

  const [error,setError]= useState({
    nameError:"",
    priceError:""
  })

  const handleName = (e) => {
    setError ({
      ...error,
      nameError: {
        nameErrorMessage: "",
        isError:false
      }
    })

    if(e.target.value != "") {
      setItemObj({...itemObj, name:e.target.value})
    } else {
      setItemObj({...itemObj, name:""})
      setError({
        ...error,
        nameError:{
          nameErrorMessage: "Wypełni obowiązkowe pole",
          isError:true
        }
      })
    }
    
}

const handlePrice = (e) => {
  // console.log(e.target.value)
  // console.log(error.priceError.isError)
    setError({
        ...error,
        priceError: {
            priceErrorMessage: "",
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
                priceErrorMessage: "Wypełni obowiązkowe pole",
                isError: true
            }
        })

    }
}

const handleColor = (e) => {
    if (e.target.value != "") {
        setItemObj({...itemObj, color:e.target.value})
    } else {
        setItemObj({...itemObj, color: ""})
    }
}

const handleCompany = (e) => {
    if (e.target.value != "") {
        setItemObj({...itemObj, company:e.target.value})
    } else {
        setItemObj({...itemObj, company: ""})
    }
}

const handleQty = (e) => {
  if (e.target.value != "") {
      setItemObj({...itemObj, qty:e.target.value})
  } else {
      setItemObj({...itemObj, qty: ""})
  }
}

const handleSubmit =(e) => {
  // console.log("submit")
  e.preventDefault()
  if(itemObj.name == '') {
    setError({
        ...error,
        nameError: {
            nameErrorMessage: 'Wypełnij obowiązkowe pole',
            isError: true
        }
    })
} else if(itemObj.price == '') {
    setError({
        ...error,
        priceError: {
            priceErrorMessage: 'Wypełnij obowiązkowe pole',
            isError: true
        }
    })
}
console.log(error.nameError.isError)
  if(!error.nameError.isError && !error.priceError.isError && itemObj.name !="" ){
    setItems([...choseItems,{...itemObj, id: uuid()}])
  }

  console.log(choseItems)
    deleteData()
}
useEffect(()=>{
  setOrder(
    {...order,
      total: choseItems.reduce((a,c) => a + c.price * c.qty, 0)}
  )
},[choseItems])

const deleteData = () => {
  // console.log("działa")
   setItemObj({
    name: "",
    price: "",
    qty:"",
    color:"",
    company:""
   })
}


  return (
    <div className= "container-fluid my-3 w-100">
      <Summary ref ={componentRef} order={order} date={date} choseItems={choseItems}/>
      <div className="button-container d-flex justify-content-end">
        <button onClick={handlePrint} className="btn btn-primary" >Drukuj
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16" className="m-1">
          <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
          <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"/>
          </svg>
        </button>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Dodaj produkt ręcznie</button>
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
                <div className="mb-3">
                  <label for="name" className="col-form-label">Nazwa</label>
                  <input value={itemObj.name} type="text" className="form-control" id="name" onChange={handleName}/>
                  {error.nameError.isError ? <p style={{color:"red"}}>{error.nameError.nameErrorMessage}</p> : null}
                </div>
                <div class="mb-3">
                  <label for="price" className="col-form-label">Cena</label>
                  <input value={itemObj.price} type="text" className="form-control" id="price" onChange={handlePrice}/>
                  {error.priceError.isError ? <p style={{color:"red"}}>     {error.priceError.priceErrorMessage}</p> : null}
                </div>
                <div class="mb-3">
                  <label for="company" className="col-form-label">Producent</label>
                  <input value={itemObj.company} type="text" className="form-control" id="company" onChange={handleCompany}/>
                </div>
                <div class="mb-3">
                  <label for="color" className="col-form-label">Kolor</label>
                  <input value={itemObj.color} type="text" className="form-control" id="color" onChange={handleColor}/>
                </div>
                <div class="mb-3">
                  <label for="qty" className="col-form-label">Ilość</label>
                  <input value={itemObj.qty} type="text" className="form-control" id="qty" onChange={handleQty}/>
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
    </div>
  )
    
}

export default SummaryPdfPrint
