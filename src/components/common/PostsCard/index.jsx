import React from 'react';
import './index.scss';

export default function PostsCard({ posts }) {
    return(
        <div>
            <p>{posts.status}</p>
        </div>
    )
}

// how does this above work without defining posts, or importing / calling the firebase API here?