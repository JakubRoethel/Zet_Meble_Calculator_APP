import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import { UserContext } from './UserContext';
import firebase from '../firebase/firebase'

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
    <div className= "header-wrapper">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
         <div className="collapse navbar-collapse d-flex justify-content-md-between" id="navbarTogglerDemo03">
           <ul className="navbar-nav ms-2 mb-2 mb-lg-0">
              {user != undefined ?
                 <>
                 <li className="nav-item active">
                 <Link className="nav-link" to='/'>Home</Link>
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
           {user != undefined ?
           <div className='d-flex align-items-center'>
             <span> Witaj {user.email}</span>
             <Link onClick={userLogOut} className="nav-link" to={'/'} >Wyloguj</Link>
           </div>
           : 
           <Link onClick={userLogOut} className="nav-link" to={'/zaloguj'} >Zaloguj</Link>
          }
         </div>
       </nav>
    </div>
    )
}

export default Header
