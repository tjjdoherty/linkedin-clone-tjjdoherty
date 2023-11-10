import React, { useMemo, useState } from 'react';
import { likePost, getLikesByUser } from '../../../api/FirestoreAPI';
import "./index.scss";
import { BiLike } from 'react-icons/bi';

export default function LikeButton({ userId, postId }) {
    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        likePost(userId, postId);
    };

    // console.log(likesCount);

    useMemo (() => {
        getLikesByUser(userId, postId, setLikesCount, setLiked);
    }, [userId, postId])

    return (
        <div className="like-container" onClick={handleLike}>
            <BiLike size={25}/>
            <p>Like</p>
            {likesCount}
        </div>
    )
}