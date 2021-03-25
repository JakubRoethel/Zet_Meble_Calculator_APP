import React, { useContext } from 'react'
import ProductsList from './ProductsList'
import Calculator from './Calculator'
import '../css/compose.css'
import {UserContext} from "./UserContext"


// Narazie trzyma mi ProductList i Calculator Przekazuje go w ściece Route w App

function Compose() {
    const [user,setUSer]= useContext(UserContext)
    // console.log(user)
    return (
        <>
            {user != undefined ? 
                <div className = "main_container">
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
