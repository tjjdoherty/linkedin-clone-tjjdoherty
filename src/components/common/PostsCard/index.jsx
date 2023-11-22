import React, { useState, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { getCurrentUser, getAllUsers } from "../../../api/FirestoreAPI";
import LikeButton from "../LikeButton";
import './index.scss';


// now we want to go to profile page when we click on a profile name link.

export default function PostsCard({ posts, id }) {
    let navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    const [allUsers, setAllUsers] = useState([]);
    useMemo(() => {
        getCurrentUser(setCurrentUser);
        getAllUsers(setAllUsers);
    }, [])

    return (
        <div className="posts-card" key={id}>
            <div className="user-picture-wrapper">
                <img
                alt="profile-picture-preview"
                className="profile-picture-preview"
                src={allUsers
                .filter((item) => item.userID === posts.userID)
                .map((item) => item.imageLink)[0]} 
                />
                <div>
                    <p 
                        className="name" 
                        onClick={() => 
                            navigate('/profile', {
                                state: { id: posts?.userID, email: posts.userEmail },
                            })
                        }>
                        {posts.userName}
                    </p>
                    <p className="timeStamp">{posts.timeStamp}</p>
                </div >
            </div>
            <p className="status">{posts.status}</p>

            <LikeButton currentUser={currentUser} userId={currentUser?.userID} postId={posts.id}/>
        </div>
    );
}