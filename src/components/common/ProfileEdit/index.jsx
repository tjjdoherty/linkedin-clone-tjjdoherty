import React, { useState } from "react";
import { editProfile } from "../../../api/FirestoreAPI";
import "./index.scss"

export default function ProfileEdit({ onEdit, currentUser }) {
    const [editInputs, setEditInputs] = useState(currentUser);
    const getInput = (event) => {
        // console.log(event);
        let { name, value } = event.target;
        let input = { [name]: value };
        setEditInputs({ ...editInputs, ...input });
    };

    // updateProfileData sends all the updates to Firestore and onEdit is the condition that toggles between the profile and profile edit page.

    const updateProfileData = async () => {
        await editProfile(currentUser?.userID, editInputs);
        await onEdit();
    }

    // console.log(currentUser);

    return (
        <div className="profile-card">
            <div className="edit-btn">
                <button onClick={onEdit}>Go back</button>
            </div>
            <div className="profile-edit-inputs">
                <label>Name</label>
                <input 
                    className="common-input" 
                    placeholder="Name" 
                    onChange={getInput}
                    name='name'
                    value={editInputs.name}
                />
                <label>Headline</label>
                <input 
                    className="common-input" 
                    placeholder="Headline" 
                    onChange={getInput} 
                    name='headline'
                    value={editInputs.headline}
                />        
                <label>Country</label>
                <input 
                    className="common-input" 
                    placeholder="Country" 
                    onChange={getInput}
                    name='country'
                    value={editInputs.country}
                />
                <label>City</label>
                <input 
                    className="common-input" 
                    placeholder="City" 
                    onChange={getInput}
                    name='city'
                    value={editInputs.city}
                />
                <label>Company</label>
                <input 
                    className="common-input" 
                    placeholder="Company" 
                    onChange={getInput} 
                    name='company'
                    value={editInputs.company}
                />
                <label>Industry</label>
                <input 
                    className="common-input" 
                    placeholder="Industry" 
                    onChange={getInput} 
                    name='industry'
                    value={editInputs.industry}
                />
                <label>College or University</label>
                <input 
                    className="common-input" 
                    placeholder="College or University" 
                    onChange={getInput} 
                    name='college'
                    value={editInputs.college}
                />
                <label>Website</label>
                <input 
                    className="common-input" 
                    placeholder="Website" 
                    onChange={getInput} 
                    name='website'
                    value={editInputs.website}
                />
                <label>About</label>
                <textarea 
                    className="common-textArea"
                    placeholder="About Me" 
                    onChange={getInput} 
                    rows={5}
                    cols={5}
                    name="aboutMe" 
                    value={editInputs.aboutMe} 
                />
                <label>Skills</label>
                <input 
                    className="common-input" 
                    placeholder="Skills include..." 
                    onChange={getInput} 
                    name='skills'
                    value={editInputs.skills}
                />
            </div>
            <div className="save-container">
                <button className="save-btn" onClick={updateProfileData} >Save</button>
            </div>
            
        </div>
    );
}