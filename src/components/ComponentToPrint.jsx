import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

//Component klasowy na potrzeby druku do PDF w propsach przekazałem w komponencie ordzica propsy (order,data,choseItems) Dokładnie to samo co w Summary wczśniej

class ComponentToPrint extends React.PureComponent {
  
    render() {
      console.log(this.props.order.client)
      
      return (
       <div className= "container-fluid my-3 w-100">
            <div className="d-flex justify-content-between"> 
                <h5 className="m-3">Zamówienie dla: {this.props.order.client} </h5>
                <h5 className="m-3">Numer telefonu: {this.props.order.client_number} </h5>
                <h5 className="m-3">Adres e-mail: {this.props.order.client_email}</h5>
                <h5 className="m-3">Adres inwestycji: {this.props.order.client_Investment_Place}</h5>
                <h5 className="m-3">{this.props.date.toLocaleDateString('en-GB')}</h5>
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
                    <th scope="col">Grupa produktu2</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.choseItems.map(el => {
                                return <tr>
                                <th scope="row">{el.id}</th>
                                <td>{el.name}</td>
                                <td>{el.qty}</td>
                                <td>{el.color}</td>
                                <td>{el.company}</td>
                                <td>{el.productGroup2}</td>
                            </tr>  
                        })}
                </tbody>
            </table>
            </div>
            <div className="d-flex justify-content-between m-4">
            <h5>Total: {this.props.order.total} </h5>
            </div>
        </div>
      );
    }
  }

export default ComponentToPrint