import React, {useContext} from 'react';
import logo from "../image/logo.jpg"
import {UserContext} from "./UserContext"

function Home() {
    const [user, setUser] = useContext(UserContext)
    return (
        <>
        {user != undefined ? 
            <div className="d-flex align-items-center justify-content-center w-100 wrapper-logo">
                <img src={logo} alt="Logo"></img>
            </div>
            :
            <div className="d-flex align-items-center justify-content-center w-100 wrapper-logo flex-column">
                <h3 className='container-fluid mt-5 text-center'>Zaloguj się</h3>
                <img src={logo} alt="Logo"></img>
            </div>

        }
        </>
    )
}

export default Home
