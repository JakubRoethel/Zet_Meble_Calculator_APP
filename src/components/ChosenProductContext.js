import React, {useState, createContext, useEffect} from 'react';
import firebase from "../firebase/firebase"



export const ChosenProductContext = createContext();

// createContext słuzy do uzywania tablicy productów globalnie 
// zrobilem to samo z funkcjami dla przycisków, które wcześniej miałem w APP.js
// funkcje sprawdzają id danych produktów nie dodaje jak wczesniej kazdego elementu osobno

export const ChosenProductProvider = (props) => {



    // funkcje do przycisków w kalkulatorze pozwalają po ideksach sprawdzać który item juz jest na liscie i dodaja tylko qty

    const [choseItems, setChosenItems] = useState([])

    const addItemToList = (el) => {
      console.log(el.additionalInformation)

        const exist = choseItems.find(x => x.id === el.id && x.additionalInformation === el.additionalInformation);
        // console.log(exist)
        if(exist) {
             setChosenItems(choseItems.map((x) => x.id === el.id && x.additionalInformation === el.additionalInformation ? {...exist, qty: exist.qty +1 }: x ))
        }
        else {
            setChosenItems([...choseItems,{... el, qty: 1}])
        }
    }

    const removeItemsFromList = (el) => {
      const exist = choseItems.find((x) => x.id === el.id && x.additionalInformation === el.additionalInformation);
      console.log(exist);

      if(exist.qty <= 1){
        setChosenItems(choseItems.filter((x)=> {
          if (x.id === el.id ) {
            if(x.additionalInformation !== el.additionalInformation) {
              return x
            } 
          } else {
            return x
          }
        }
        ))
      } else {
        setChosenItems(choseItems.map((x) => x.id === el.id && x.additionalInformation === el.additionalInformation ? {...exist, qty: exist.qty -1 }: x ))
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
    const [allProductList, setAllProductList] = useState([]);


    // dane których potrzebuje w kalkulatorze i w podsumowaniu(narazie pusta tablica moze warto przypisac na stałe produkty ??? )
    
    const[order,setOrder] = useState({
      array:[],
      total:0,
      client:"",
      client_number:""
  })

  const [saveValuation, setSaveValuation] = useState([])
  
  useEffect(() => {
    // console.log("jestem")
    const productRef = firebase.database().ref('products');
    // console.log(productRef.toString())
    // console.log(firebase.database())
    productRef.on('value', (snapshot) => {
        // console.log(snapshot.val());
        setAllProductList(snapshot.val());
  })
  const saveValuationRef = firebase.database().ref('saveValuation');
  // console.log(firebase.database())
  console.log(saveValuationRef)
  saveValuationRef.on('value', (snapshot) => {
       console.log(snapshot.val());
       setSaveValuation(snapshot.val());
 })
},[])

console.log(saveValuation)

const [markup, setMarkup] = useState(750)

  // console.log(saveValuation)


    return (
        <ChosenProductContext.Provider value = {[choseItems, setChosenItems, addItemToList, removeItemsFromList,allProductList, setAllProductList, order,setOrder,removeItemFromDataBase,saveValuation, setSaveValuation,markup, setMarkup]}>
            {props.children}
        </ChosenProductContext.Provider>

    );
}