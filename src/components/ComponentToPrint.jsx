import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export class ComponentToPrint extends React.PureComponent {

    
    
    render() {
      return (
       <div>
            <div className="d-flex justify-content-between m-4"> 
                <h5>Zamówienie dla : jakub  </h5>
                <h5>Numer telefonu: roethel </h5>
                <h5>Adres e-mail:  @gmail</h5>
                <h5>Adres inwestycji: Gniezno</h5>
                <h5>Data</h5>
            </div>
            <div className="container-fluid my-3 w-75">
            <table className="table my-4 text-center">
            <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nazwa produktu</th>
                    <th scope="col">Ilość</th>
                    <th scope="col">Kolor</th>
                    <th scope="col">Producent</th>
                    </tr>
                </thead>
                <tbody>
                 <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                </tr>  
            
                </tbody>
            </table>
            </div>
            <div className="d-flex justify-content-between m-4">
            <h5>Total: </h5>
            </div>
        </div>
      );
    }
  }