import React, { useState } from "react";
import { LoginAPI } from "../api/AuthAPI";
import '../Sass/LoginComponent.scss';

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
            <h1>LoginComponent</h1>
            <div className="auth-inputs">
                <input
                    onChange={(event) =>
                        setCredentials({ ...credentials, email: event.target.value})
                    }
                    className='common-input' 
                    placeholder='Enter your email'
                />
                <input 
                    onChange={(event) => 
                        setCredentials({ ...credentials, password: event.target.value})
                    }
                    className='common-input'
                    placeholder='Enter your password'
                />
            </div>
            <button onClick={login} className="login-btn">
                    Log in to LinkedIn
            </button>
        </div>
    );
}