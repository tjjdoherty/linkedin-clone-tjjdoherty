import React, { useState, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../../api/FirestoreAPI";
import LikeButton from "../LikeButton";
import './index.scss';


// now we want to go to profile page when we click on a profile name link.

export default function PostsCard({ posts, id }) {
    let navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    useMemo(() => {
        getCurrentUser(setCurrentUser)
    }, [])
    return (
        <div className="posts-card" key={id}>
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
            <p className="status">{posts.status}</p>

            <LikeButton currentUser={currentUser} userId={currentUser?.userID} postId={posts.id}/>
        </div>
    );
}