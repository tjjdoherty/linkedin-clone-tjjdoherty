import React, { useState, useMemo } from 'react';
import { PostStatusData, getStatus, updatePost } from '../../../api/FirestoreAPI';
import ModalComponent from '../Modal';
import { getUniqueID } from "../../../helpers/getUniqueId";
import PostsCard from "../PostsCard";
import { getCurrentTimeStamp } from '../../../helpers/useMoment';
import './index.scss';

// PostStatus - the typing and adding content to post a status. PostStatusData is from the Firestore API to update the database. PostStatusData = postStatus from vid
// currentUser - passed from the firestore API file where the object containing name, email and password is handed down as state
// all of those data points in object (line 18) are there from the initial register component/firestore API so that they can be used on the front end for rendering in posts/comments!!
// added userID (line 24 so you can see your own posts when you jump to the profile page via the name link in a single post)

export default function PostStatus({ currentUser }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [status, setStatus] = useState("");
    const [allStatus, setAllStatus] = useState([]);
    const [currentPost, setCurrentPost] = useState({});
    const [isEdit, setIsEdit] = useState(false);

    const sendStatus = async () => {
        let object = {
            status: status,
            timeStamp: getCurrentTimeStamp("LLL"),
            userEmail: currentUser.email,
            userName: currentUser.name,
            userID: currentUser.userID,
            postID: getUniqueID(),
        };
        await PostStatusData(object);
        await setModalOpen(false);
        await setStatus("");
        await setIsEdit(false);
    };

    const getEditData = (posts) => {
        setIsEdit(true);
        setStatus(posts.status);
        setModalOpen(true);
        setCurrentPost(posts);
    }

    const updateStatus = () => {
        console.log(status);

        updatePost(currentPost.id, status);
        setModalOpen(false);
    }

    useMemo(() => {
        getStatus(setAllStatus)
    }, []);


    return (
    <div className="post-status-main">
        <div className="user-headline">
            <img src={currentUser.imageLink} alt="image-link" />
            <p classname='name'>{currentUser.name}</p>
            <p className='headline'>{currentUser.headline}</p>

        </div>
        <div className="post-status">
        <img src={currentUser.imageLink} alt="image-link" />
            <button className="open-post-modal" onClick={() => {
                setIsEdit(false);
                setModalOpen(true)
                }}
            >
                Start a post...
            </button>
        </div>

        <ModalComponent 
            modalOpen={modalOpen} 
            setModalOpen={setModalOpen} 
            setStatus={setStatus}
            status={status}
            sendStatus={sendStatus}
            isEdit={isEdit}
            updateStatus={updateStatus}
        />
        <div>
        {allStatus.map((posts) => {
            return (
                <div key={posts.id}>
                    <PostsCard posts={posts} getEditData={getEditData} />
                </div>
            )
        })}
        </div>
    </div>
    );
}