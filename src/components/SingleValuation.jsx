import React, {useContext} from 'react'
import {ChosenProductContext} from "./ChosenProductContext"
import logo from "../image/logo.jpg"



class SingleValuation extends React.PureComponent  {
    // console.log(match.params.id)

    

    // const element = saveValuation[match.params.id]
    
    // console.log(element.array)
    render () {
        console.log(this.props.element)
        return (
            <div className= "container-fluid my-3 w-100">
                <div className="d-flex justify-content-between">
                    <div className="d-flex">
                        <div>
                            <p className="m-3 order-details">Zamówienie dla: {this.props.element.client} </p>
                            <p className="m-3 order-details">Numer telefonu: {this.props.element.client_number}  </p>
                            <p className="m-3 order-details">Adres e-mail: {this.props.element.client_email} </p>
                        </div>
                        <div>
                            <p className="m-3 order-details">Adres inwestycji: {this.props.element.client_Investment_Place} </p>
                            <p className="m-3 order-details">Data: {this.props.element.date}</p>
                        </div>
                    </div>
                    <div className="logo-wrapper">
                        <img className="small-logo" src={logo} alt="Logo"></img>
                    </div>
                </div>
                {this.props.element.array.filter(el => {
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
                                {this.props.element.array.map(el => {
                                    console.log(el)
                                    return <>
                                    {el.displayGroup === "Meble" ?
                                    <tr>
                                            <td>{el.group}</td>
                                            <td>{el.name}</td>
                                            <td>{el.additionalInformation}</td>
                                            {this.props.displayQty == false ? null : <td>{el.qty}</td>}
                                            <td>{el.company}</td>
                                            <td>{el.productGroup}</td>
                                            <td>{el.additionalInformation} </td>
                                        </tr> : null
                                    }
                                    </>
                                })}
                            </tbody>
                        </table>
                    </div> : null
             }
             {this.props.element.array.filter(el => {
                    return el.displayGroup == "Opcje dodatkowe"
                }).length > 0 ?
                    <div className="container-fluid my-3 w-100"> 
                        <h4>Opcje dodatkowe :</h4>
                        <table className="table my-4 text-center">
                            <thead>
                                <tr>
                                <th scope="col">Grupa produktu</th>
                                <th scope="col">Nazwa produktu</th>
                                <th scope="col">Dodatkowe informacje o produkcie</th>
                                <th scope="col"> Ilość</th>
                                <th scope="col">Cena</th>
                                <th scope="col">Producent</th>
                                <th scope="col">Szczegóły</th>
                                <th scope="col">Dodatkowa specyfikacja</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.element.array.map(el => {
                                    return <>
                                    {el.displayGroup === "Opcje dodatkowe" ?
                                    <tr>
                                            <td>{el.group}</td>
                                            <td>{el.name}</td>
                                            <td>{el.additionalInformation}</td>
                                            <td>{el.qty}</td>
                                            <td>{el.price}</td>
                                            <td>{el.company}</td>
                                            <td>{el.productGroup}</td>
                                            <td>
                                            {el.additionalInformation}
                                            </td>
                                        </tr> : null
                                    }
                                    </>
                                })}
                            </tbody>
                        </table>
                    </div> : null
             }
             {this.props.element.array.filter(el => {
                    return el.displayGroup == "Blaty"
                }).length > 0 ?
                    <div className="container-fluid my-3 w-100"> 
                        <h4>Blaty :</h4>
                        <table className="table my-4 text-center">
                            <thead>
                                <tr>
                                <th scope="col">Grupa produktu</th>
                                <th scope="col">Nazwa produktu</th>
                                <th scope="col">Dodatkowe informacje o produkcie</th>
                                <th scope="col"> Ilość</th>
                                <th scope="col">Cena</th>
                                <th scope="col">Producent</th>
                                <th scope="col">Szczegóły</th>
                                <th scope="col">Dodatkowa specyfikacja</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.element.array.map(el => {
                                    return <>
                                    {el.displayGroup === "Blaty" ?
                                    <tr>
                                            <td>{el.group}</td>
                                            <td>{el.name}</td>
                                            <td>{el.additionalInformation}</td>
                                            <td>{el.qty}</td>
                                            <td>{el.price}</td>
                                            <td>{el.company}</td>
                                            <td>{el.productGroup}</td>
                                            <td>
                                            {el.additionalInformation}
                                            </td>
                                        </tr> : null
                                    }
                                    </>
                                })}
                            </tbody>
                        </table>
                    </div> : null
             }
             <div>
                 {this.props.element.moreInformation}
             </div>
            </div>
        )

    }
}

export default SingleValuation
