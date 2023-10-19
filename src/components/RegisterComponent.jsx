import React, { useState } from "react";
import { RegisterAPI, GoogleSignInAPI } from "../api/AuthAPI";
import { postUserData } from "../api/FirestoreAPI";
import '../Sass/LoginComponent.scss';
import LinkedInLogo from "../assets/linkedInLogo.png";
import GoogleButton from 'react-google-button';
import { useNavigate } from "react-router-dom";
import { getUniqueID } from "../helpers/getUniqueId";
import { toast } from "react-toastify";

export default function RegisterComponent() {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({});
    const register = async () => {
        try {
            let result = await RegisterAPI(credentials.email, credentials.password);
            toast.success('Account Created!');
            postUserData({
                userID: getUniqueID(),
                name: credentials.name,
                email: credentials.email, 
                password: credentials.password
            });
            localStorage.setItem('userEmail', result.user.email);
            navigate('/home');
        } catch (err) {
            console.log(err);
            toast.error('Cannot Create Account')
        }
    };

    // above ^ postUserData is storing the unique ID (to match your own post/profile), name, email and password, this is where it will enter the Firestore database

    const googleSignIn = () => {
        let response = GoogleSignInAPI();
        console.log(response);
        navigate("/home");
    };

    // each of the fields below in input labels uses setCredentials add to the credentials `object literal` one by one. first name, then email, then password
    // it's captured in the credentials state as an object, and then the register onClick function in "Agree and Join" sets off adding it to the database with postUserData 
    // this sends the credentials up to the firebase 

    return (
            <div className="login-wrapper">
                <img src={LinkedInLogo} className="linkedInLogo"/>
                <div className="login-wrapper-inner">

                    <h1 className="heading">Make the most of your professional life</h1>

                    <div className="auth-inputs">
                        <input
                            onChange={(event) =>
                                setCredentials({ ...credentials, name: event.target.value})
                            }
                            type='text'
                            className='common-input' 
                            placeholder='Your Name'
                        />
                        <input
                            onChange={(event) =>
                                setCredentials({ ...credentials, email: event.target.value})
                            }
                            type='email'
                            className='common-input' 
                            placeholder='Email or Phone number'
                        />
                        <input 
                            onChange={(event) => 
                                setCredentials({ ...credentials, password: event.target.value})
                            }
                            type='password'
                            className='common-input'
                            placeholder='Password (6 or more characters)'
                        />
                    </div>

                    <button onClick={register} className="login-btn">
                            Agree & Join
                    </button>
                </div>
                <hr className="hr-text" data-content="or"></hr>
                <div className="google-btn-container">
                    <GoogleButton
                    className="google-btn"
                    onClick={googleSignIn}
                    />

                    <p className="go-to-signup">Already on LinkedIn? <span className="join-now" onClick={() => navigate('/')}>Sign in</span></p>
                </div>
            </div>
    );
}