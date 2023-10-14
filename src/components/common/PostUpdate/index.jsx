import React, { useState, useMemo } from 'react';
import { PostStatusData, getStatus } from '../../../api/FirestoreAPI';
import ModalComponent from '../Modal';
import { getUniqueID } from "../../../helpers/getUniqueId";
import PostsCard from "../PostsCard";
import { getCurrentTimeStamp } from '../../../helpers/useMoment';
import './index.scss';

// PostStatus - the typing and adding content to post a status. PostStatusData is from the Firestore API to update the database. PostStatusData = postStatus from vid

export default function PostStatus({ currentUser }) {
    let userEmail = localStorage.getItem('userEmail');
    const [modalOpen, setModalOpen] = useState(false);
    const [status, setStatus] = useState("");
    const [allStatus, setAllStatus] = useState([]);
    const sendStatus = async () => {
        let object = {
            status: status,
            timeStamp: getCurrentTimeStamp("LLL"),
            userEmail: userEmail,
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
                <PostsCard posts={posts}/>
            )
        })}
        </div>
    </div>
    );
}