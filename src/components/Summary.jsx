import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import "../css/summary.css"
import logo from "../image/logo.jpg"

//Component klasowy na potrzeby druku do PDF w propsach przekazałem w komponencie ordzica propsy (order,data,choseItems) Dokładnie to samo co w Summary wczśniej

class Summary extends React.PureComponent {
    
    // constructor (props) {
    //   super(props);
    //   this.state = {
    //     textAreaData:{
    //       additionalSpecification: "",
    //       moreInformation: ""
    //     }
    //   }
    //   this.handleAdditionalSpecification = this.handleAdditionalSpecification.bind(this);
    //   this.handleMoreInformation = this.handleMoreInformation.bind(this)
    // }

    // handleAdditionalSpecification = (e) => {
    //   const value = e.target.value
    //   console.log(value)
    //   this.setState({textAreaData:{ ...this.state.textAreaData, additionalSpecification:value }})
    //   console.log(this.state.textAreaData)
    // }

    // handleMoreInformation = (e) => {
    //   const value = e.target.value
    //   console.log(value)
    //   this.setState({textAreaData:{...this.state.textAreaData,moreInformation:value,}})
    //   console.log(this.state.textAreaData)
    // }
    
    render() {
      // console.log(this.props.order.client)
      // console.log(this.props.choseItems)
      // console.log(this.state)
      // console.log(this.props.displayQty);
      // console.log(this.props.handleAdditionalSpecification)

      const totalMeble = this.props.choseItems.filter(el => {
        return el.displayGroup == "Meble"
      }).reduce((a,b) => {
        if(b.subGroup == "Płyta"){
          return a + (b.price * b.qty * this.props.markup)
        } else {
          return a + b.price * b.qty
        }
      },0).toFixed(2)

      // console.log(totalMeble);

      const totalOpcjeDodatkowe = this.props.choseItems.filter(el => {
        return el.displayGroup == "Opcje dodatkowe"
      }).reduce((a,b) => a + b.price * b.qty,0).toFixed(2)

      const totalBlaty = this.props.choseItems.filter(el => {
        return el.displayGroup == "Blaty"
      }).reduce((a,b) => a + b.price * b.qty,0).toFixed(2)

      // console.log(totalOpcjeDodatkowe);





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
                <img className="small-logo" src={logo} alt="Logo"></img>
              </div>
            </div>
            {this.props.choseItems.filter(el => {
              return el.displayGroup == "Meble"
            }).length > 0 ? 
              <div className="container-fluid my-3 w-100">
              <h4>Meble :</h4>
              <table className="table my-4 text-center">
                  <thead>
                      <tr>
                      <th scope="col">Grupa produktu</th>
                      <th scope="col">Nazwa produktu</th>
                      <th scope="col">Dodatkowe informacje o produkcie</th>
                      {this.props.displayQty == false ? null :
                      <th> Ilość</th>}
                      <th scope="col">Producent</th>
                      <th scope="col">Szczegóły</th>
                      <th scope="col">Dodatkowa specyfikacja</th>
                      </tr>
                  </thead>
                  <tbody>
                  {this.props.choseItems.map((el,key) => {
                            // console.log(el)
                            return <>
                            {el.displayGroup === "Meble" ?
                          <tr>
                                  <td>{el.group}</td>
                                  <td>{el.name}</td>
                                  <td>{el.additionalInformation}</td>
                                  {this.props.displayQty == false ? null : <td>{el.qty}</td>}
                                  <td>{el.company}</td>
                                  <td>{el.productGroup}</td>
                                  <td>
                                    <textarea onBlur={(e) => this.props.handleAdditionalSpecification(e,key)} className= "textarea-summary"></textarea>
                                  </td>
                              </tr> : null
                          }
                          </>
                          })}
                  </tbody>
              </table>
              <div className="d-flex justify-content-between m-4">
                <h5>Total: {totalMeble} </h5>
              </div>
              </div> : null
          }
                { this.props.choseItems.filter(el => {
                  return el.displayGroup == "Opcje dodatkowe"
                }).length > 0 ?
                <div className="container-fluid my-3 w-85">
                  <h4>Opcje dodatkowe :</h4>
                <table className="table my-4 text-center">
                    <thead>
                        <tr>
                        <th scope="col">Grupa produktu</th>
                        <th scope="col">Nazwa produktu</th>
                        <th scope="col">Ilość</th>
                        <th scope="col">Cena</th>
                        <th scope="col">Dodatkowe informacje o produkcie</th>
                        <th scope="col">Producent</th>
                        <th scope="col">Szczegóły</th>
                        <th scope="col">Dodatkowa specyfikacja</th>
                        </tr>
                    </thead>
                     <tbody>
                        {this.props.choseItems.map((el,key) => {
                            return <>
                            {el.displayGroup === "Opcje dodatkowe" ?
                            <tr>
                              <td>{el.group}</td>
                              <td>{el.name}</td>
                              <td>{el.qty}</td>
                              <td>{el.price}</td>
                              <td>{el.productGroup}</td>
                              <td>{el.company}</td>
                              <td>{el.additionalInformation}</td>
                              <td>
                                <textarea onBlur={(e) => this.props.handleAdditionalSpecification(e,key)}  className= "textarea-summary"></textarea>
                              </td>
                            </tr> : null
                          }
                          </>
                        })}
                    </tbody>
              </table>
            <div className="d-flex justify-content-between m-4">
              <h5>Total: {totalOpcjeDodatkowe} </h5>
             </div>
             </div> : null
              }
              {this.props.choseItems.filter(el => {
              return el.displayGroup == "Blaty"
            }).length > 0 ? 
              <div className="container-fluid my-3 w-100">
              <h4>Blaty:</h4>
              <table className="table my-4 text-center">
                  <thead>
                      <tr>
                      <th scope="col">Grupa produktu</th>
                      <th scope="col">Nazwa produktu</th>
                      <th scope="col">Dodatkowe informacje o produkcie</th>
                      {this.props.displayQty == false ? null : 
                      <th> Ilość</th>}
                      <th scope="col">Producent</th>
                      <th scope="col">Szczegóły</th>
                      <th scope="col">Dodatkowa specyfikacja</th>
                      </tr>
                  </thead>
                  <tbody>
                  {this.props.choseItems.map((el,key) => {
                            // console.log(el)
                            return <>
                            {el.displayGroup === "Blaty" ?
                          <tr>
                                  <td>{el.group}</td>
                                  <td>{el.name}</td>
                                  <td>{el.color}</td>
                                  {this.props.displayQty == false ? null : <td>{el.qty}</td>}
                                  <td>{el.company}</td>
                                  <td>{el.productGroup}</td>
                                  <td>
                                    <textarea onBlur={(e) => this.props.handleAdditionalSpecification(e,key)}  className= "textarea-summary"></textarea>
                                  </td>
                              </tr> : null
                          }
                          </>
                          })}
                  </tbody>
              </table>
              <div className="d-flex justify-content-between m-4">
                <h5>Total: {totalBlaty} </h5>
              </div>
              </div> : null
          }
            <div className="container-fluid my-3 w-75">
              <label for="exampleFormControlTextarea1">Dodatkowe informacje</label>
              <textarea onBlur={this.props.handleMoreInformation} className="form-control more-information" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
        </div>
      );
    }
  }

export default Summary