import React, { useState, useMemo } from "react";
import { getCurrentUser} from "../api/FirestoreAPI";
import Topbar from "../components/common/Topbar";
import Profile from "../pages/Profile";

// i was getting a previous bug where clicking profile Popup (in topbar) was causing a crash - because i didn't pass currentUser props to Topbar as well as profile

export default function ProfileLayout() {
    const [currentUser, setCurrentUser] = useState({});
    useMemo(() => {
        getCurrentUser(setCurrentUser);
    }, []);
    return (
        <div>
            <Topbar currentUser={currentUser}/>
            <Profile currentUser={currentUser} />
        </div>
    );
    
}