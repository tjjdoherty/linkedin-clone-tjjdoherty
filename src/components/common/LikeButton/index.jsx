import React, { useMemo, useState } from 'react';
import { likePost, getLikesByUser, postComment, getComments } from '../../../api/FirestoreAPI';
import "./index.scss";
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { AiOutlineComment } from 'react-icons/ai';
import { getCurrentTimeStamp } from '../../../helpers/useMoment';
import { useNavigate } from "react-router-dom";



export default function LikeButton({ currentUser, userId, postId }) {
    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    let navigate = useNavigate();

    const handleLike = () => {
        likePost(userId, postId, liked);
    };

    const getComment = (event) => {
        setComment(event.target.value);
    };

    const addComment = () => {
        postComment(postId, comment, getCurrentTimeStamp('LLL'), currentUser?.name);
        setComment("");
    }

    // useMemo getComments populates the comments array as a state, the logic is done in FirestoreAPI

    useMemo (() => {
        getLikesByUser(userId, postId, setLikesCount, setLiked);
        getComments(postId, setComments);
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
                    <input 
                        onChange={getComment} 
                        className="comment-input" 
                        placeholder="Add a comment..."
                        name="comment"
                        value={comment}
                    />
                    <button className="add-comment-btn" onClick={addComment}>
                        Add Comment
                    </button>

                    {comments.length > 0 ? comments.map((comment) => {
                        return (
                            <div className="all-comments">
                                <p 
                                    className='comment-name' 
                                    onClick={() => 
                                        navigate('/profile', {
                                        state: { id: currentUser?.userID, email: currentUser.userEmail },
                                        }) 
                                    }
                                >
                                {comment.name}
                                </p>
                            <p className='comment-body'>{comment.comment}</p>

                            <p className='comment-timeStamp'>{comment.timeStamp}</p>
                            </div>
                        )
                    }) : <></>}
                </>
            ) : (
                <></>
                )}
        </div>
    )
}
// I did the styling of the likes similar top Facebook not LinkedIn per his video