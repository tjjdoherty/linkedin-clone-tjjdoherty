import React, { useState } from "react";
import { RegisterAPI, GoogleSignInAPI } from "../api/AuthAPI";
import { postUserData } from "../api/FirestoreAPI";
import '../Sass/LoginComponent.scss';
import LinkedInLogo from "../assets/linkedInLogo.png";
import GoogleButton from 'react-google-button';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function RegisterComponent() {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({});
    const register = async () => {
        try {
            let result = await RegisterAPI(credentials.email, credentials.password);
            toast.success('Account Created!');
            postUserData({name: credentials.name, email: credentials.email, password: credentials.password});
            navigate('/home');
            localStorage.setItem('userEmail', result.user.email);
        } catch (err) {
            console.log(err);
            toast.error('Cannot Create Account')
        }
    };

    // above ^ postUserData is storing the name, email and password, this is where it will enter the Firestore database

    const googleSignIn = () => {
        let response = GoogleSignInAPI();
        console.log(response);
        navigate("/home");
    };

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