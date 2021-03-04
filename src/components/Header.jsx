import React from 'react';
import "../css/header.css";
import {Link} from 'react-router-dom';

//Linki potrzebne do Routera w App

function Header() {
    return (
        <div className= "header_wrapper">
           <div className="nav_bar">
            <a className= "home_link" href="#">Home</a>
               <ul className="nav_bar_list">
                   <Link to= "/">
                    <li className= "nav_bar_list_el">Wyceń</li>
                    </Link>
                    <Link to = "/dodaj">
                   <li className= "nav_bar_list_el">Dodaj produkt</li>
                   </Link>
               </ul>
           </div>
        </div>
    )
}

export default Header
