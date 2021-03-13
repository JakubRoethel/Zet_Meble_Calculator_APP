import React, {useState, createContext} from 'react';
import productArrayv2 from '../dataBase/productsv2';



export const ChosenProductContext = createContext();

// createContext słuzy do uzywania tablicy productów globalnie 
// zrobilem to samo z funkcjami dla przycisków, które wcześniej miałem w APP.js
// funkcje sprawdzają id danych produktów nie dodaje jak wczesniej kazdego elementu osobno

export const ChosenProductProvider = (props) => {



    // funkcje do przycisków w kalkulatorze pozwalają po ideksach sprawdzać który item juz jest na liscie i dodaja tylko qty

    const [choseItems, setItems] = useState([])

    const addItemToList = (el) => {
      console.log(el.color)

        const exist = choseItems.find(x => x.id === el.id && x.color == el.color);
        console.log(exist)
        if(exist) {
             setItems(choseItems.map((x) => x.id === el.id && x.color === el.color  ? {...exist, qty: exist.qty +1 }: x ))
        }
        else {
            setItems([...choseItems, {... el, qty: 1}])
        }
    }

    const removeItemsFromList = (el) => {
      const exist = choseItems.find((x) => x.id === el.id && x.color === el.color);
      console.log(exist);
      
      if(exist.qty <= 1){
        setItems(choseItems.filter((x)=> {
          if (x.id == el.id ) {
            if(x.color != el.color) {
              return x
            } 
          } else {
            return x
          }
        }
        ))
      } else {
        setItems(choseItems.map((x) => x.id === el.id && x.color === el.color ? {...exist, qty: exist.qty -1 }: x ))
      }

    }

    const removeItemFromDataBase = (item) => {
      let exist;
      allProductList.forEach(group => {
         group.array.forEach(subGroup => {
          subGroup.subArray.forEach(el => {
            console.log(el)
            console.log(el.id)
            if (el.id === item.id) {
              console.log("działa")
              exist = el
            }
          })
        })
      })
      console.log(exist);
    //   if (exist) {
    //     setAllProductList(allProductList.filter((x) => x.id !== el.id))
    //   } else {
    //     console.log('no product')
    //   }
      if (exist) {
        setAllProductList(allProductList.map(group => {
          return {...group, array: group.array.map(subGroup => {
            return {...subGroup, subArray: subGroup.subArray.filter((x) => x.id !== item.id)}
        })}
        }))

      }else {
        console.log("no product")
      }
    }



    // ustawienie tablicy do której będzę puszował się nowy item z addItemsCard
    const [allProductList, setAllProductList] = useState(productArrayv2);


    // dane których potrzebuje w kalkulatorze i w podsumowaniu(narazie pusta tablica moze warto przypisac na stałe produkty ??? )
    const[order,setOrder] = useState({
      array:[],
      total:0,
      client:"",
      client_number:""
  })

    return (
        <ChosenProductContext.Provider value = {[choseItems, setItems, addItemToList, removeItemsFromList,allProductList, setAllProductList, order,setOrder,removeItemFromDataBase]}>
            {props.children}
        </ChosenProductContext.Provider>

    );
}