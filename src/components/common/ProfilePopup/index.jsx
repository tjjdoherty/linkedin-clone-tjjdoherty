import React from "react";
import { onLogout } from "../../../api/AuthAPI";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import "./index.scss"

export default function ProfilePopup({ currentUser }) {
    let navigate = useNavigate();
    return (
        <div className="popup-card">
             <Button className="common-btn" title='View Profile'/>
             <div className="popup-options">
                 <p
                 className="popup-option"
                 onClick={() =>
                     navigate("/profile", {
                         state: { id: currentUser?.userID, },
                     })
                 }
                 >
                     Profile
                 </p>
                 <p className="popup-option" onClick={onLogout}>
                     Logout
                 </p>
             </div>
         </div>
    )
}