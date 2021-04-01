import React, { useContext } from 'react'
import ProductsList from './ProductsList'
import Calculator from './Calculator'
import {UserContext} from "./UserContext"


// Narazie trzyma mi ProductList i Calculator Przekazuje go w ściece Route w App

function Compose() {
    const [user]= useContext(UserContext)
    // console.log(user)
    return (
        <>
            {user != undefined ? 
                <div className = "main-container">
                    <ProductsList />
                    <Calculator />
                </div>
                :
                <h3 className='container-fluid mt-5 text-center'>Zaloguj się</h3>
            }
        </>
    )
}

export default Compose
