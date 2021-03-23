import React, {useContext, createContext, useState} from 'react';
import firebase from '../firebase/firebase'
import "firebase/auth";

export const UserContext = createContext();


export const UserContextProvider = (props) => {
    const [user, setUser] = useState();



return(
    <UserContext.Provider value={[user, setUser]}>
        {props.children}
    </UserContext.Provider>
);
};