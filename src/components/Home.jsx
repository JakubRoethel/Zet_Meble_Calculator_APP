import React, {useContext} from 'react';
import logo from "../image/logo.jpg";
import {UserContext} from "./UserContext";
import {Link} from 'react-router-dom';

function Home() {
    const [user, setUser] = useContext(UserContext)
    return (
        <>
        {user != undefined ? 
            <div className="d-flex align-items-center justify-content-center w-100 wrapper-logo">
                <img src={logo} alt="Logo"></img>
            </div>
            :
            <div className="d-flex align-items-center justify-content-center w-100 h-50 wrapper-logo flex-column">
                <img src={logo} alt="Logo"></img>
                <Link className='btn btn-primary' to={'/zaloguj'} > Zaloguj się</Link>
            </div>

        }
        </>
    )
}

export default Home
