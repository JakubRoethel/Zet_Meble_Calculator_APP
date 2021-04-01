import React, {useContext} from 'react';
import logo from "../image/logo.jpg";
import {UserContext} from "./UserContext";
import {Link} from 'react-router-dom';
import "../css/home.css"

function Home() {
    const [user, setUser] = useContext(UserContext)
    console.log(user)
    return (
        <>
        {user != undefined ? 
        <div className='wrapper image-wrapper'>
            <div className="box">
               <h2 >ZetMeble</h2>
               <p>Konfigurator wycen</p>
           </div>
        </div>
            :
            <div className='wrapper image-wrapper'>
                 <div className="box">
                    <h2 >ZetMeble</h2>
                    <p>Konfigurator wycen</p>
                   <Link className="btn btn-outline-light btn-lg" to={'/zaloguj'} >Zaloguj</Link>
                </div>
            </div>
        }
        </>
    )
}

export default Home
