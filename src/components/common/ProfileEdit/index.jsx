import React from "react";
import "./index.scss"

export default function ProfileEdit({onEdit}) {
    return (
        <div>                
            <div className="edit-btn">
                <button onClick={onEdit}>Go back</button>
            </div>
        </div>
        )
}