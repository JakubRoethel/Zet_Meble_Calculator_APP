import React, {useContext} from 'react';
import "../css/calculator.css";
import {ChosenProductContext} from './ChosenProductContext';
import {Link} from 'react-router-dom';
import history from "./history";


// tutaj wykorzystujemy dwie funkcje na guzikach add i remove plus mapujemy po choseItems i przekazujemy kartę produkty z lewej strony na prawa w apce w cześniej masz dlugosc tablicy 0 wyswietla tobie informacje o braku

function Calculator({matchId}) {

    const [choseItems, setChosenItems, addItemToList, removeItemsFromList,,, order,setOrder]= useContext(ChosenProductContext);

    const itemsPrice = choseItems.reduce((a,c) => a + c.price * c.qty, 0)

    // funkcje te przejmuja value z inputów i pozwalają wrzucić ja do order co pozwala wyswietlać dane o kliencie w podsumowaniu plus wrzucamy do tablicy zamówione produkty

    const handleSummary = () => {
        setOrder({
            ...order,
            array: choseItems,
            total: itemsPrice
        })
    }

    const handleClientData = (e) => {
        setOrder({
            ...order,
            client: e.target.value
        })

    }

    const handleClientNumber = (e) => {
        setOrder({
            ...order,
            client_number: e.target.value
        })
    }

    const handleClientEmail = (e) => {
        setOrder({
            ...order,
            client_email: e.target.value
        })
    }

    const handleClientInvestmentPlace = (e) => {
        setOrder({
            ...order,
            client_Investment_Place: e.target.value
        })
    }

    const handleQuantity = (event,el) => {
        const exist = choseItems.find(x => x.id === el.id && x.additionalInformation === el.additionalInformation);
        // console.log(exist)
        if(exist) {
            if(event.target.value.toString().length <=4) {
                setChosenItems(choseItems.map((x) => x.id === el.id && x.additionalInformation === el.additionalInformation  ? {...exist, qty: event.target.value}: x ))
            }
        }
        // console.log(event.target.value)
    }
    // console.log(choseItems)

    console.log(order.client)
    console.log("edycja wycen")
    console.log(choseItems)


    return (
        <div className="calculator">
            <form className="form-inline client-details">
                <div className="d-flex flex-row form-group flex-wrap justify-content-center ">
                    <input className="form-control form-control-lg mx-4" defaultValue={order.client == null ? '' : order.client} type="text" placeholder="Imię i nazwisko"  onChange={handleClientData}></input>
                    <input className="form-control form-control-lg mx-4" defaultValue={order.client_number == null ? '' : order.client_number}type="text" placeholder="Numer Telefonu" onChange={handleClientNumber}></input>
                    <input className="form-control form-control-lg mx-4" defaultValue={order.client_email == null ? '' : order.client_email} type="text" placeholder="Adres e-mail" onChange={handleClientEmail}></input>
                    <input className="form-control form-control-lg mx-4" defaultValue={order.client_Investment_Place == null ? '' : order.Investment_Place} type="text" placeholder="Adres inwestycji" onChange={handleClientInvestmentPlace}></input>
                </div>
            </form>
            {order.client === '' || choseItems.length <= 0 ? null :
            matchId != undefined ? 
                <Link to={`/podsumowanie/${matchId}`} className="summary-link" onClick={handleSummary} >{`Podsumowanie >`}</Link> :
                <Link to="/podsumowanie" className="summary-link" onClick={handleSummary} >{`Podsumowanie >`}</Link>
            }
            {choseItems.length === 0 && <h2 className="mt-5">Nie dodałeś żadnych produktów</h2>}
            <div className="product-wrapper">
            {choseItems.map(item => {
                // console.log(item.color);
               return <>
            {item.groupName === 'Materiały' || item.groupName === 'Fronty' || item.groupName === "Uchwyty" ?
                <div key={item.id} className='product-card'>
                <div className ="details">
                    <h5>{item.group}</h5>
                    <h6>{item.name}</h6>
                    <p> {item.subGroup} |{item.additionalInformation} | 
                        <input placeholder={"m2"} onChange={ e => handleQuantity(e,item)} type="number" value={item.qty}></input> m2/mb 
                    </p>
                    </div>
                <div className="btn-container d-flex align-items-center">
                     <button className = 'btn btn-danger' onClick={()=>removeItemsFromList(item)}>-</button>
                 </div>
            </div> :
         <div key={item.id} className='product-card'>
            <div className ="details">
                <h5>{item.group}</h5>
                <h6>{item.name}</h6>
                <p> {item.productGroup} | {item.company} | {item.additionalInformation} | {item.qty}</p>
                </div>
            <div className="btn-container d-flex align-items-center">
                <button className='btn btn btn-secondary' onClick={()=>addItemToList(item)}>+</button>
                 <button className = 'btn btn-danger' onClick={()=>removeItemsFromList(item)}>-</button>
             </div>
        </div>
            }
            </>
        })}
            </div>

        </div>
    )
}

export default Calculator


