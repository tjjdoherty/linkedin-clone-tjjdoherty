import React from 'react';
import { likePost } from '../../../api/FirestoreAPI';
import "./index.scss";
import { BiLike } from 'react-icons/bi';

export default function LikeButton({ userId, postId }) {
    const handleLike = () => {
        likePost(userId, postId)
    };



    return (
        <div className="like-container" onClick={handleLike}>
            <BiLike size={25}/>
            <p>Like</p>
        </div>
    )
}