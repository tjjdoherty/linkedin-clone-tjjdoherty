import React, { useMemo, useState } from 'react';
import { likePost, getLikesByUser } from '../../../api/FirestoreAPI';
import "./index.scss";
import { BiLike, BiSolidLike } from 'react-icons/bi';

export default function LikeButton({ userId, postId }) {
    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        likePost(userId, postId, liked);
    };

    useMemo (() => {
        getLikesByUser(userId, postId, setLikesCount, setLiked);
    }, [userId, postId])

    return (
        <div className="like-container" onClick={handleLike}>
            {liked ? <BiSolidLike size={25} color="blue"/> : <BiLike size={25}/>}
            <p>
                {liked ? (likesCount === 1 ? 'You like this' : `You and ${likesCount - 1} other${likesCount - 1 === 1 ? '' : 's' } like this`) : "Like"}
            </p> 
        </div> 
    )
}
// I did the styling of the likes similar top Facebook not LinkedIn per his video