import React, {useContext } from 'react';
import {UserContext} from "./UserContext"

function SaveSummary() {
    const [user,setUSer]= useContext(UserContext)
    return (
        <>
            {user != undefined ?
                <div>
                    <h1>Hello World</h1>
                    <ul>
                        <li>Nazwa </li>
                    </ul>
                </div>
                :
                <h3 className='container-fluid mt-5 text-center'>Zaloguj się</h3>
            }
        </>
    )
}

export default SaveSummary
