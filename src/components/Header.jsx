import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import { UserContext } from './UserContext';
import firebase from '../firebase/firebase'
import "../css/header.css";
import logo from "../image/logo.jpg";


//Linki potrzebne do Routera w App

function Header() {

  const [user,setUser] = useContext(UserContext)


  const userLogOut = () => {

    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log("sign-out")
    }).catch((error) => {
      // An error happened.
    });
    setUser(undefined)
  }

    // console.log(user)

    return (


      <nav class="navbar navbar-expand-lg navbar-light header">
      <button class="navbar-toggler ms-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
   
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <ul class="navbar-nav me-auto ms-2 mb-2 mb-lg-0">
        {user != null ?
                 <>
                 <li className="nav-item active">
                 <Link className="nav-link link" to='/'>Home</Link>
                 </li>
                <li className="nav-item active">
                  <Link className="nav-link" to='/wyceń'>Wyceń</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/dodaj'}>Dodaj produkt</Link>
                </li>
                <li>
                  <Link className="nav-link"  to={'/wyceny'}>Zapisane wyceny</Link>
                </li>
                </>
                :
                null
              }
        </ul>

        {user != null ?
           <div className='d-flex align-items-center'>
             <span> Witaj {user.email}</span>
             <Link onClick={userLogOut} className="nav-link log-out" to={'/'} >Wyloguj</Link>
           </div>
           : 
           <Link onClick={userLogOut} className="nav-link" to={'/zaloguj'} >Zaloguj</Link>
          }
      </div>
    </nav>
    
    )
}

export default Header
