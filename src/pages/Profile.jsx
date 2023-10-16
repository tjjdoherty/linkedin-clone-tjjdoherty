import React, { useEffect, useState } from "react";
import ProfileComponent from "../components/ProfileComponent";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader/index";

// same behaviour as with home page - authenticate users, take them back to login if they dont have auth with useNavigate
// keep the page loading until you have an auth accessToken
// conditionally return the ProfileComponent (line 25) once you have the accessToken which turns loading to false (line 20)

export default function Profile({ currentUser }) {
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth, (response) => {
            if (!response?.accessToken) {
                navigate("/");
            } else {
                setLoading(false);
            }
        });
    }, []);

    return loading ? <Loader /> : <ProfileComponent currentUser={currentUser} />
}