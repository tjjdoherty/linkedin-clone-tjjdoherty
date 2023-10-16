import React from "react";
import "./index.scss";

// initially failed - "Objects are not valid as a react child" like in PostUpdate, currentUser is passing down the entire object and we need to access just the name for rendering as a child
// starts all the way back in Firestore API

export default function ProfileCard({ currentUser }) {
    return ( 
        <div className="profile-card">
            <h3 className="username">{currentUser.name}</h3>
            <p>{currentUser.email}</p>
        </div>
    )
}