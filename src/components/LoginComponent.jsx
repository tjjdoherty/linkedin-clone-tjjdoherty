import React, { useState } from "react";
import { LoginAPI, GoogleSignInAPI } from "../api/AuthAPI";
import '../Sass/LoginComponent.scss';
import LinkedInLogo from "../assets/linkedInLogo.png";
import GoogleButton from 'react-google-button';
import { toast } from "react-toastify"

export default function LoginComponent() {
    const [credentials, setCredentials] = useState({});
    const login = async () => {
        try {
            let result = await LoginAPI(credentials.email, credentials.password);
            toast.success('Signed in to LinkedIn!');
        } catch (err) {
            console.log(err);
            toast.error('Unable to login. Check your email or password.')
        }
    };
    

    const googleSignIn = () => {
        let response = GoogleSignInAPI();
        console.log(response);
    };

    // see 00:31:11
    return (
            <div className="login-wrapper">
                <img src={LinkedInLogo} className="linkedInLogo"/>
                <div className="login-wrapper-inner">

                    <h1 className="heading">Sign in</h1>
                    <p className="sub-heading">Stay updated on your professional world</p>

                    <div className="auth-inputs">
                        <input
                            onChange={(event) =>
                                setCredentials({ ...credentials, email: event.target.value})
                            }
                            type='email'
                            className='common-input' 
                            placeholder='Email or Phone'
                        />
                        <input 
                            onChange={(event) => 
                                setCredentials({ ...credentials, password: event.target.value})
                            }
                            type='password'
                            className='common-input'
                            placeholder='Password'
                        />
                    </div>

                    <button onClick={login} className="login-btn">
                            Sign in
                    </button>
                </div>
                <hr className="hr-text" data-content="or"></hr>
                <div className="google-btn-container">
                    <GoogleButton
                    className="google-btn"
                    onClick={googleSignIn}
                    />

                    <p className="go-to-signup">New to LinkedIn? <span className="join-now">Join now</span></p>
                </div>
            </div>
    );
}