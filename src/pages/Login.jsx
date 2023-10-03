import React, { useEffect, useState } from 'react';
import LoginComponent from "../components/LoginComponent";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";

// onAuthStateChange - if an accessToken is found (because a user provided valid credentials) then navigate them to the home page, now they're signed into the portal

// return statement below - if loading is true, show the loader, if not, it proceeds to the homepage

export default function Login() {
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth, (response) => {
            if (response?.accessToken) {
                navigate("/home");
                console.log("Logged in, no loader")
            } else {
                setLoading(false);
            }
        });
    }, []);
    return loading ? <Loader /> : <LoginComponent />;
}