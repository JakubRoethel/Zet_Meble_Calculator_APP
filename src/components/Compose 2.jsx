import React from 'react'
import ProductsList from './ProductsList'
import Calculator from './Calculator'
import '../css/compose.css'


// Narazie trzyma mi ProductList i Calculator Przekazuje go w ściece Route w App

function Compose() {
    return (
        <div className = "main_container">
            <ProductsList />
            <Calculator />
        </div>
    )
}

export default Compose
