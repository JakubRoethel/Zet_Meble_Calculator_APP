import React, {useState, createContext} from 'react';
import productArr from '../dataBase/Products'

export const ChosenProductContext = createContext();

// createContext słuzy do uzywania tablicy productów globalnie 
// zrobilem to samo z funkcjami dla przycisków, które wcześniej miałem w APP.js
// funkcje sprawdzają id danych produktów nie dodaje jak wczesniej kazdego elementu osobno

export const ChosenProductProvider = (props) => {



    // funkcje do przycisków w kalkulatorze pozwalają po ideksach sprawdzać który item juz jest na liscie i dodaja tylko qty

    const [choseItems, setItems] = useState([])
    const [color, setColor ] = useState()

    const addItemToList = (el) => {

        const exist = choseItems.find(x => x.id === el.id);
        // console.log(exist)
        if(exist) {
            setItems(choseItems.map((x) => x.id === el.id ? {...exist, qty: exist.qty +1 }: x ))
        }
        else {
            setItems([...choseItems, {... el, qty: 1, color: color}])
        }

        console.log(exist)
    }

    const removeItemsFromList = (el) => {
      const exist = choseItems.find((x) => x.id === el.id);
      if(exist.qty === 1){
        setItems(choseItems.filter((x)=> x.id !== el.id))
      } else {
        setItems(choseItems.map((x) => x.id === el.id ? {...exist, qty: exist.qty -1 }: x ))
      }
    }

    const removeItemFromDataBase = (el) => {
      const exist = allProductList.find(x => x.id === el.id);
      console.log('działa');
      if (exist) {
        setAllProductList(allProductList.filter((x) => x.id !== el.id))
      } else {
        console.log('no product')
      }
    }



    // ustawienie tablicy do której będzę puszował się nowy item z addItemsCard
    const [allProductList, setAllProductList] = useState(productArr);


    // dane których potrzebuje w kalkulatorze i w podsumowaniu(narazie pusta tablica moze warto przypisac na stałe produkty ??? )
    const[order,setOrder] = useState({
      array:[],
      total:0,
      client:"",
      client_number:""
  })

    return (
        <ChosenProductContext.Provider value = {[choseItems, setItems, addItemToList, removeItemsFromList,allProductList, setAllProductList, order,setOrder,removeItemFromDataBase,color, setColor]}>
            {props.children}
        </ChosenProductContext.Provider>

    );
}