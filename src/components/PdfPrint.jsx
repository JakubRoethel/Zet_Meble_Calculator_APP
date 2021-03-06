import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import {ComponentToPrint} from './ComponentToPrint'

const PdfPrint = () => {
        const componentRef = useRef();
        const handlePrint = useReactToPrint({
          content: () => componentRef.current,
        });
      
        return (
          <div style={{width:"100%"}}>
              <div className=".flex-column">
            <ComponentToPrint ref={componentRef} />
              </div>
            <div>
            <button onClick={handlePrint}>Print</button>
            </div>
          </div>
        );
    
}

export default PdfPrint
