import React, {useContext, createContext, useState, useEffect} from 'react';
import firebase from '../firebase/firebase'
import "firebase/auth";
import { ChosenProductContext } from './ChosenProductContext';

export const UserContext = createContext();


export const UserContextProvider = (props) => {
    const [user, setUser] = useState();

    useEffect(()=> {
      firebase.auth().onAuthStateChanged(function(u) {
        console.log("auth")
        console.log(firebase)
          if (u != null) {
            setUser(u)
          } else {
            setUser(null);
          }
        });
    },[])




return(
    <UserContext.Provider value={[user, setUser]}>
        {props.children}
    </UserContext.Provider>
);
};