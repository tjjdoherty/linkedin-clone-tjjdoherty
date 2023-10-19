import React, { useState, useMemo } from "react";
import { getStatus } from '../../../api/FirestoreAPI';
import "./index.scss";
import PostsCard from "../PostsCard";

// earlier error - "Objects are not valid as a react child" like in PostUpdate, currentUser is passing down the entire object and we need to access just the name for rendering as a child
// starts all the way back in Firestore API

// now we bring in the status posts below the profile card, but only to see the posts WE created not all posts. so we filter using userEmail matching to the post in the database

// the className post-status-main is only declared in postUpdate scss not here (profileCard), why is it impacting the styling when it hasn't been linked?

export default function ProfileCard({ currentUser, onEdit }) {
    const [allStatus, setAllStatus] = useState([]);

    useMemo(() => {
        getStatus(setAllStatus)
    }, []);

    return ( 
        <>
            <div className="profile-card">
                <div className="edit-btn">
                    <button onClick={onEdit}>Edit</button>
                </div>
                <div className="profile-info">
                    <div>
                        <h3 className="userName">{currentUser.name}</h3>
                        <p className="heading">{currentUser.headline}</p>
                        <p className="location">{currentUser.location}</p>
                    </div>
                    <div className="right-info">
                        <p className="college">{currentUser.college}</p>
                        <p className="company">{currentUser.company}</p>
                    </div>
                </div>
            </div>
            
            <div className="post-status-main">
                {allStatus
                .filter((item) => {
                    return item.userEmail === localStorage.getItem('userEmail')
                })
                .map((posts) => {
                    return (
                    <div key={posts.id}>
                        <PostsCard posts={posts}/>
                    </div>
                )
                })}
            </div>
        </>
    )
}