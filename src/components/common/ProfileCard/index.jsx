import React from "react";
import "./index.scss";

// initially failed - "Objects are not valid as a react child" like in PostUpdate, currentUser is passing down the entire object and we need to access just the name for rendering as a child
// starts all the way back in Firestore API

export default function ProfileCard({ currentUser, onEdit }) {
    return ( 
        <>
            <div className="profile-card">
                <div className="edit-btn">
                    <button onClick={onEdit}>Edit</button>
                </div>
                <h3 className="userName">{currentUser.name}</h3>
                <p className="userEmail">{currentUser.email}</p>
            </div>
        </>
    )
}