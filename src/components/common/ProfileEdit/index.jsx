import React, { useState } from "react";
import { editProfile } from "../../../api/FirestoreAPI";
import "./index.scss"

export default function ProfileEdit({ onEdit, currentUser }) {
    const [editInputs, setEditInputs] = useState({});
    const getInput = (event) => {
        // console.log(event);
        let { name, value } = event.target;
        let input = { [name]: value };
        setEditInputs({ ...editInputs, ...input });
    };

    // console.log(editInputs);

    const updateProfileData = () => {
        editProfile(currentUser?.userID, editInputs);
    }

    return (
        <div className="profile-card">
            <div className="edit-btn">
                <button onClick={onEdit}>Go back</button>
            </div>
            <div className="profile-edit-inputs">
                <input 
                    className="common-input" 
                    placeholder="Name" 
                    onChange={getInput}
                    name='Name'
                />

                <input 
                    className="common-input" 
                    placeholder="Headline" 
                    onChange={getInput} 
                    name='headline'
                />

                <input 
                    className="common-input" 
                    placeholder="Location" 
                    onChange={getInput}
                    name='location'
                />

                <input 
                    className="common-input" 
                    placeholder="Company" 
                    onChange={getInput} 
                    name='company'
                />
                
                <input 
                    className="common-input" 
                    placeholder="College" 
                    onChange={getInput} 
                    name='college'
                />
            </div>
            <div className="save-container">
                <button className="save-btn" onClick={updateProfileData} >Save</button>
            </div>
            
        </div>
    );
}