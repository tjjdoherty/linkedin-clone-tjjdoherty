import React, { useState, useMemo } from 'react';
import { PostStatusData, getStatus } from '../../../api/FirestoreAPI';
import './index.scss';
import ModalComponent from '../Modal';

// PostStatus - the typing and adding content to post a status. PostStatusData is from the Firestore API to update the database. PostStatusData = postStatus from vid

export default function PostStatus() {
    const [modalOpen, setModalOpen] = useState(false);
    const [status, setStatus] = useState("");
    const [allStatus, setAllStatus] = useState([]);
    const sendStatus = async () => {
        await PostStatusData(status);
        await setModalOpen(false);
        await setStatus("");
    };

    useMemo(() => {
        getStatus(setAllStatus)
    }, []);

    console.log(allStatus);
        
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
    </div>
    );
}