import React from 'react';
import { useNavigate } from "react-router-dom";
import './index.scss';


// now we want to go to profile page when we click on a profile name link.

export default function PostsCard({ posts, id }) {
    let navigate = useNavigate();
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
        </div>
    );
}