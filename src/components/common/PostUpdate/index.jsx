import React, { useState, useMemo } from 'react';
import { PostStatusData, getStatus } from '../../../api/FirestoreAPI';
import ModalComponent from '../Modal';
import { getUniqueID } from "../../../helpers/getUniqueId";
import PostsCard from "../PostsCard";
import { getCurrentTimeStamp } from '../../../helpers/useMoment';
import './index.scss';

// PostStatus - the typing and adding content to post a status. PostStatusData is from the Firestore API to update the database. PostStatusData = postStatus from vid
// currentUser - passed from the firestore API file where the object containing name, email and password is handed down as state
// all of those data points in object (line 18) are there from the initial register component/firestore API so that they can be used on the front end for rendering in posts/comments!!

export default function PostStatus({ currentUser }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [status, setStatus] = useState("");
    const [allStatus, setAllStatus] = useState([]);
    const sendStatus = async () => {
        let object = {
            status: status,
            timeStamp: getCurrentTimeStamp("LLL"),
            userEmail: currentUser.email,
            userName: currentUser.name,
            postID: getUniqueID(),
        };
        await PostStatusData(object);
        await setModalOpen(false);
        await setStatus("");
    };

    useMemo(() => {
        getStatus(setAllStatus)
    }, []);


    return (
    <div className="post-status-main">
        <div className="post-status">
            <button className="open-post-modal" onClick={() => setModalOpen(true)}>
                Start a post...
            </button>
        </div>

        <ModalComponent 
            modalOpen={modalOpen} 
            setModalOpen={setModalOpen} 
            setStatus={setStatus}
            status={status}
            sendStatus={sendStatus}
        />
        <div>
        {allStatus.map((posts) => {
            return (
                <div key={posts.id}>
                    <PostsCard posts={posts}/>
                </div>
            )
        })}
        </div>
    </div>
    );
}