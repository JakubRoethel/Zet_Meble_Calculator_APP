import React, {useContext,useState} from 'react'
import firebase from '../firebase/firebase'
import "firebase/auth";
import {UserContext} from "./UserContext"
import logo from "../image/logo.jpg"
import "../css/loginPage.css"

function LoginPage() {


    const [user, setUser] = useContext(UserContext)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const handleInputs = (e) => {
        if(e.target.id == "inputEmail"){
            setEmail(e.target.value)
            // console.log(e.target.value)
        } else if (e.target.id == "inputPassword"){
            setPassword(e.target.value)
            // console.log(e.target.value)
        }
    }

    const createUserWithEmailAndPasswordHandler = (e,email,password) => {
        e.preventDefault();

        firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    setUser(user);
                    // console.log("w trakcie autoryzacji")
                    // console.log(user);
                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log('Not signed');
                    // console.log(error)
                });
                console.log('inside');
            setEmail("");
            setPassword("");

        // firebase.auth().createUserWithEmailAndPassword(email, password)
        //     .then((userCredential) => {
        //         // Signed in
        //         var user = userCredential.user;
        //         setUser(user);
        //         console.log(user);
        //         // ...
        //     })
        //     .catch((error) => {
        //         var errorCode = error.code;
        //         var errorMessage = error.message;
        //         console.log(errorMessage);
        //         // ..
        //     });

    };


    return (
        <>
        {user === undefined ? 
        <>
        <main className="form-signin w-100 m-5 d-flex justify-content-center align-items-center">
            <form onSubmit={(e) => createUserWithEmailAndPasswordHandler(e,email,password)} className='my-form w-25'>
                <h1 className="h3 mb-3 fw-normal">Logowanie</h1>
                <input name="email"  onChange={handleInputs} type="email" id="inputEmail" className="form-control mb-3" placeholder="Email address" required autofocus />
                <input name="password"  onChange={handleInputs} type="password" id="inputPassword" class="form-control mb-3" placeholder="Password" required />
                <div className="d-flex justify-content-center">
                    <button className="w-50 btn btn-lg btn-primary" type="submit">Zaloguj mnie</button>
                </div>
            </form>
        </main>
        </> :
                <div className="w-100">
                    <div className="d-flex align-items-center justify-content-center w-100 wrapper-logo ">
                        <img src={logo} alt="Logo"></img>
                    </div>

                </div>
        }
        </>
    )
}

export default LoginPage
