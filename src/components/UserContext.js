import React, {useContext, createContext, useState} from 'react';
import firebase from '../firebase/firebase'
import "firebase/auth";

export const UserContext = createContext();


export const UserContextProvider = (props) => {
    const [user, setUser] = useState();

    firebase.auth().onAuthStateChanged(function(u) {
        if (u != null) {
          setUser(u)
        } else {
          setUser(null);
        }
      });
      
return(
    <UserContext.Provider value={[user, setUser]}>
        {props.children}
    </UserContext.Provider>
);
};