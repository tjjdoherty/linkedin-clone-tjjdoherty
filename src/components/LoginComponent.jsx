import React, { useState } from "react";
import { LoginAPI } from "../api/AuthAPI";
import '../Sass/LoginComponent.scss';
import LinkedInLogo from "../assets/linkedInLogo.png";

export default function LoginComponent() {
    const [credentials, setCredentials] = useState({});
    const login = async () => {
        try {
            let result = await LoginAPI(credentials.email, credentials.password);
            console.log(result.user);
        } catch (err) {
            console.log(err);
        }
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
                        placeholder='Enter your password'
                    />
                </div>
                
                <button onClick={login} className="login-btn">
                        Sign in
                </button>
            </div>
        </div>
    );
}