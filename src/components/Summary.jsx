import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import "../css/summary.css"
import logo from "../image/logo.jpg"

//Component klasowy na potrzeby druku do PDF w propsach przekazałem w komponencie ordzica propsy (order,data,choseItems) Dokładnie to samo co w Summary wczśniej

class Summary extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state =[...this.props.choseItems]
    }
    render() {
      console.log(this.props.order.client)
      console.log(this.props.choseItems)
      console.log(this.state)
      return (
       <div className= "container-fluid my-3 w-100">
            <div className="d-flex justify-content-between"> 
            <div className="d-flex">
              <div>
                  <p className="m-3 order-details">Zamówienie dla: {this.props.order.client} </p>
                  <p className="m-3 order-details">Numer telefonu: {this.props.order.client_number} </p>
                  <p className="m-3 order-details">Adres e-mail: {this.props.order.client_email}</p>
              </div>
              <div>
                <p className="m-3 order-details">Adres inwestycji: {this.props.order.client_Investment_Place}</p>
                <p className="m-3 order-details">Data: {this.props.date.toLocaleDateString('en-GB')}</p>
              </div>
            </div>
              <div className="logo-wrapper">
                <img src={logo} alt="Logo"></img>
              </div>
            </div>
              <div className="container-fluid my-3 w-85">
                
              <h4>Meble :</h4>
              <table className="table my-4 text-center">
                  <thead>
                      <tr>
                      <th scope="col">Grupa produktu</th>
                      <th scope="col">Nazwa produktu</th>
                      <th scope="col">Dodatkowe informacje</th>
                      <th scope="col">Producent</th>
                      <th scope="col">Szczegóły</th>
                      </tr>
                  </thead>
                  <tbody>
                  {this.props.choseItems.map(el => {
                            console.log(el)
                            return <>
                            {el.displayGroup === "Meble" ?
                          <tr>
                                  <td>{el.group}</td>
                                  <td>{el.name}</td>
                                  <td>{el.color}</td>
                                  <td>{el.company}</td>
                                  <td>{el.productGroup}</td>
                              </tr> : null
                          }
                          </>
                          })}
                  </tbody>
              </table>
              <div className="d-flex justify-content-between m-4">
                <h5>Total: {this.props.order.total} </h5>
              </div>
              </div>
                <div className="container-fluid my-3 w-85">
                  <h4>Opcje dodatkowe :</h4>
                <table className="table my-4 text-center">
                    <thead>
                        <tr>
                        <th scope="col">Grupa produktu</th>
                        <th scope="col">Nazwa produktu</th>
                        <th scope="col">Ilość</th>
                        <th scope="col">Cena</th>
                        <th scope="col">Szczegóły</th>
                        <th scope="col">Dodatkowe informacje</th>
                        </tr>
                    </thead>
                     <tbody>
                        {this.props.choseItems.map(el => {
                            return <>
                            {el.displayGroup === "Opcje dodatkowe" ?
                            <tr>
                              <td>{el.group}</td>
                              <td>{el.name}</td>
                              <td>{el.qty}</td>
                              <td>{el.price}</td>
                              <td>{el.productGroup}</td>
                              <td>{el.color}</td>
                            </tr> : null
                          }
                          </>
                        })}
                    </tbody>
              </table>
            <div className="d-flex justify-content-between m-4">
              <h5>Total: {this.props.order.total} </h5>
             </div>
             </div>
            <div class="container-fluid my-3 w-75">
              <label for="exampleFormControlTextarea1">Dodatkowe informacje</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
        </div>
      );
    }
  }

export default Summary