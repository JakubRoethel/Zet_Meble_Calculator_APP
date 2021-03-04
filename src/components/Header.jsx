import React from 'react';
import {Link} from 'react-router-dom';

//Linki potrzebne do Routera w App

function Header() {
    return (
    <div className= "header_wrapper">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
         <a className="navbar-brand ms-5" href="#">Meble</a>
         <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
           <ul className="navbar-nav ms-2 mb-2 mb-lg-0">
             <li className="nav-item active">
             <Link className="nav-link" to='/'>Wyceń</Link>
             </li>
             <li className="nav-item">
               <Link className="nav-link" to={'/dodaj'}>Dodaj produkt</Link>
             </li>
           </ul>
         </div>
       </nav>
    </div>
    )
}

export default Header
