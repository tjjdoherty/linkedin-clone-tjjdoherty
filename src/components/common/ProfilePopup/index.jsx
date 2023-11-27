import React from "react";
import { onLogout } from "../../../api/AuthAPI";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import "./index.scss"

// I don't use getCurrentUser because I have passed down currentUser from the firestore API via layouts --> Page (profile) --> Profile and Topbar have currentUser as props
// Guide uses getCurrentUser which is also possible by using a useState hook in here (5:09:00 in YT vid)

export default function ProfilePopup({ currentUser }) {
    let navigate = useNavigate();
    return (
        <div className="popup-card">
            <p className="name">{currentUser.name}</p>
            <p className="headline">{currentUser.headline}</p>
             <Button 
                className="common-btn" 
                title='View Profile'
                onClick={() =>
                navigate("/profile", {
                    state: { id: currentUser?.userID },
                    })
                }
            />
            <Button title="Log out" onClick={onLogout} />                 
        </div>
    )
}