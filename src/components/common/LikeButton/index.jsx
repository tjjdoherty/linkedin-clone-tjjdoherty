import React from 'react';
import "./index.scss";
import { BiLike } from 'react-icons/bi';

export default function LikeButton() {
    return (
        <div className="like-container">
            <BiLike size={25}/>
            <p>Like</p>
        </div>
    )
}