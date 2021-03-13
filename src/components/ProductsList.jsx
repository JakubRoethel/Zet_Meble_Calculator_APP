import React, {useContext,useState}  from 'react'
import Product from './Product'
import productArrayv2 from '../dataBase/productsv2'
import '../css/productsList.css'
import {ChosenProductContext, ChosenProductProvider} from './ChosenProductContext'


function ProductsList() {

    // console.log(productArrayv2);

    const [choseItems, setItems, addItemToList, removeItemsFromList, allProductList, setAllProductList] = useContext(ChosenProductContext);


    // funkcja filtrująca tablice 

    const [filtredItems, setFiltredItems] = useState(allProductList)

    const filter = (event) => {
        // console.log(event)
        let txt = event.target.value.toLowerCase();
        // console.log(txt);
        if(txt.length === 0) {
            setFiltredItems(subGroup.subArray)
        } else {
            setFiltredItems(subGroup.subArray.filter(product => {
                return product.name.toLowerCase().includes(txt);
            }))
        }
    }

    

    const [group,setGroup] = useState([]);
    console.log(group);

    const handleGroupSelect = (e) => {
        const searchGroupArray = allProductList.find(x => {
            return x.groupName === e.target.value})

        setGroup(searchGroupArray)
        setSubGroup([])
    }

    const [subGroup, setSubGroup] = useState([])

    const handleSubGroupSelect = (e) => {
        const searchSubGroup = group.array.find(x => {
            return x.subGroupName === e.target.value
        })
        console.log(searchSubGroup.subGroupName);
        console.log(searchSubGroup.subArray);
        setSubGroup(searchSubGroup);
        setFiltredItems(searchSubGroup.subArray);
    }

    return (
        <div className = "list-container">
            <div className="className='form-control form-control-lg mx-2">
                <input  type="text" placeholder="Szukaj produkt" className="form-control form-control-lg mx-2" onChange={filter}/>
            </div>
            <div className="filters d-flex">
                 <select onChange = {handleGroupSelect} className="form-select mx-2" aria-label="Default select example">
                    <option selected disabled="disabled">Wybierz grupę </option>
                    {productArrayv2.map(el => {
                         return <option value={el.groupName}>{el.groupName}</option>
                    })}
                </select>
                <select value = {typeof subGroup.subGroupName == "undefined" ? "default" : subGroup.subGroupName} onChange = {handleSubGroupSelect} className="form-select mx-2" aria-label="Default select example">
                    <option  value="default" selected disabled="disabled">Wybierz podgrupę</option>
                    {typeof group.array !== "undefined" ? group.array.map(el => {
                        return <option value={el.subGroupName}>{el.subGroupName}</option>
                    }) : "" }
                </select>

            </div>

            <div className="list">
            { typeof subGroup.subArray === "undefined" ? <h2>Nie wybrałeś podkategorii</h2> : (filtredItems.length == 0 ? <h2>Nie znaleźiono szukanego produktu</h2> : filtredItems.map(product => {
               return <Product product = {product} key = {product.id} groupName= {group.groupName} /> 
            }))}
            </div>
        </div>
    )
}

export default ProductsList
