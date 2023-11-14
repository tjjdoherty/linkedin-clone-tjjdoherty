import React, { useMemo, useState } from 'react';
import { likePost, getLikesByUser } from '../../../api/FirestoreAPI';
import "./index.scss";
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { AiOutlineComment } from 'react-icons/ai';

export default function LikeButton({ userId, postId }) {
    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [showCommentBox, setShowCommentBox] = useState(false);

    const handleLike = () => {
        likePost(userId, postId, liked);
    };

    useMemo (() => {
        getLikesByUser(userId, postId, setLikesCount, setLiked);
    }, [userId, postId])

    return (
        <div className="like-comment-container">
            <div className="hr-line">
                <hr />
            </div>
            <div className="like-comment">
                <div 
                className="likes-comment-inner" 
                onClick={handleLike}
                >
                    {liked ? <BiSolidLike size={25} color="blue"/> : <BiLike size={25}/>}
                    <p>
                        {liked ? (likesCount === 1 ? 'You like this' : `You and ${likesCount - 1} other${likesCount - 1 === 1 ? '' : 's' } like this`) : "Like"}
                    </p>
                </div>
                
                <div 
                className="likes-comment-inner" 
                onClick={() => setShowCommentBox(!showCommentBox)}
                >
                    {
                        <AiOutlineComment 
                            size={30} 
                            color={showCommentBox ? "#0a66c2" : "#212121"} 
                        />
                    }

                    <p className={showCommentBox ? "blue" : "black"}>Comment</p>
                </div>
            </div>
            {showCommentBox ? ( 
                <>
                    <input className="comment-input" placeholder="Add a comment..." />
                    <button className="add-comment-btn">Add Comment</button>
                </>
            ) : (
                <></>
                )}
        </div>
    )
}
// I did the styling of the likes similar top Facebook not LinkedIn per his video