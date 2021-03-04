import React, {useContext,useState}  from 'react'
import Product from './Product'
import productArr from '../dataBase/Products'
import '../css/productsList.css'
import {ChosenProductContext, ChosenProductProvider} from './ChosenProductContext'


function ProductsList() {

    const [choseItems, setItems, addItemToList, removeItemsFromList, allProductList, setAllProductList] = useContext(ChosenProductContext);


    // funkcja filtrująca tablice 

    const [filtredItems, setFiltredItems] = useState(allProductList)

    const filter = (event) => {
        // console.log(event)
        let txt = event.target.value.toLowerCase();
        // console.log(txt);
        if(txt.length === 0) {
            setFiltredItems(allProductList)
        } else {
            setFiltredItems(allProductList.filter(product => {
                return product.name.toLowerCase().includes(txt);
            }))
        }
    }

    return (
        <div className = "list-container">
            <div className="className='form-control form-control-lg mx-2">
                <input  type="text" placeholder="Szukaj produkt" className="form-control form-control-lg mx-2" onChange={filter}/>
            </div>

            <div className="list">
            {filtredItems.length == 0 ? <h2>Nie ma produktu którego szukałeś</h2> : filtredItems.map(product => {
               return <Product product = {product} key = {product.id} /> 
            })}
            </div>
        </div>
    )
}

export default ProductsList
