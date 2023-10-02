import { React, useEffect } from 'react';
import HomeComponent from "../components/HomeComponent";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";

// onAuthStateChanged - if there is no longer an access token, or it doesn't exist in the first place, navigate the user back to the login (/) page

export default function Home() {
    let navigate = useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth, (response) => {
            if (!response?.accessToken) {
                navigate("/");
            } else {
                return <Loader />;
            }
        });
    }, []);
    return <HomeComponent />;
}