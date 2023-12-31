import React, { useEffect, useState } from 'react';
import ConnectionsComponent from '../components/ConnectionsComponent';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader/index";

// onAuthStateChanged - if there is no longer an access token, or it doesn't exist in the first place, navigate the user back to the login (/) page

export default function Connections({ currentUser }) {
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
    return loading ? <Loader /> : <ConnectionsComponent currentUser={currentUser}/>;
}