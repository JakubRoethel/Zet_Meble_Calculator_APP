import React, { useRef,useContext } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import PrintPDFTest2 from './PrintPDFTest2';
import ComponentToPrint from './ComponentToPrint';
import {useReactToPrint} from "react-to-print";
import {ChosenProductContext} from './ChosenProductContext';

// const PdfPrint = () => {

//   return (
//     <PDFViewer style={{width:"100%"}}>
//     <PrintPDFTest2/>
//   </PDFViewer>
//   )
    
// }

// export default PdfPrint




function PdfPrint () {
  const [choseItems, setItems, addItemToList, removeItemsFromList,allProductList, setAllProductList, order,setOrder]= useContext(ChosenProductContext);

  const date = new Date();

  const componentRef = useRef();
  const hendlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  return (
    <div className= "container-fluid my-3 w-100">
      <ComponentToPrint ref ={componentRef} order={order} date={date} choseItems={choseItems}/>
      <div className="button-container d-flex justify-content-end">
        <button onClick={hendlePrint} className="btn btn-dark">Drukuj
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16" className="m-1">
          <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
          <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"/>
          </svg>
        </button>
      </div>
    </div>
  )
    
}

export default PdfPrint
