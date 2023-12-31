import React, { useState, useMemo } from "react";
import { getSingleStatus, getSingleUser } from '../../../api/FirestoreAPI';
import PostsCard from "../PostsCard";
import { HiOutlinePencil } from 'react-icons/hi';
import { useLocation } from "react-router-dom";
import { uploadImage as uploadImageAPI } from "../../../api/ImageUpload";
import FileUploadModal from "../FileUploadModal";
import "./index.scss";

// 4:49:58 - useLocation saves the email (for single user) and post ID (for single status) these are used to map a single user or single status respectively.

// earlier error - "Objects are not valid as a react child" like in PostUpdate, currentUser is passing down the entire object and we need to access just the name for rendering as a child
// now we bring in the status posts below the profile card, but only to see the posts WE created not all posts. so we filter using userEmail matching to the post in the database

// the className post-status-main is only declared in postUpdate scss not here (profileCard), why is it impacting the styling when it hasn't been linked?

export default function ProfileCard({ currentUser, onEdit }) {
    let location = useLocation();
    const [allStatus, setAllStatus] = useState([]);
    const [currentProfile, setCurrentProfile] = useState({});
    const [currentImage, setCurrentImage] = useState({});
    const [progress, setProgress] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);

    const getImage = (event) => {
        setCurrentImage(event.target.files[0]);
    }

    const uploadImage = () => {
        uploadImageAPI(currentImage, currentUser?.userID, setModalOpen, setProgress, setCurrentImage);
    }

    useMemo(() => {
        if (location?.state?.id) {
            getSingleStatus(setAllStatus, location?.state?.id);
        }

        if (location?.state?.email) {
            getSingleUser(setCurrentProfile, location?.state?.email);
        }
    }, []);


    return ( 
        <>
            <FileUploadModal 
                modalOpen={modalOpen} 
                setModalOpen={setModalOpen} 
                getImage={getImage} 
                uploadImage={uploadImage}
                currentImage={currentImage}
                progress={progress}
            />
            <div className="profile-card">
                <div className="edit-btn">
                    <HiOutlinePencil className="edit-icon" onClick={onEdit}/>
                </div>
                <div className="profile-info">
                    <div>
                        <img 
                            onClick={() => setModalOpen(true)}
                            className="profile-picture" 
                            src={
                                Object.values(currentProfile).length === 0
                                ? currentUser.imageLink
                                : currentProfile?.imageLink
                            } 
                            alt="Profile Picture"
                        />
                        <h3 className="userName">
                            {Object.values(currentProfile).length === 0
                                ? currentUser.name 
                                : currentProfile?.name}
                        </h3>
                        <p className="heading">
                            {Object.values(currentProfile).length === 0
                                ? currentUser.headline 
                                : currentProfile?.headline}
                        </p>
                        <p className="location">
                            {Object.values(currentProfile).length === 0
                                ? `Greater ${currentUser.city} area, ${currentUser.country}` 
                                : `Greater ${currentProfile?.city} area, ${currentProfile?.country}`}
                        </p>
                        <a  className="website"
                            target='_blank'
                            href={Object.values(currentProfile).length === 0
                                ? `${currentUser.website}` 
                                : currentProfile?.website
                            }
                        >
                            {Object.values(currentProfile).length === 0
                                ? `${currentUser.website}` 
                                : currentProfile?.website}
                        </a>
                    </div>

                    <div className="right-info">
                        <p className="college">
                            {Object.values(currentProfile).length === 0
                                ? currentUser.college 
                                : currentProfile?.college}
                        </p>
                        <p className="company">
                            {Object.values(currentProfile).length === 0
                                ? currentUser.company 
                                : currentProfile?.company}
                        </p>
                    </div>
                </div>
                <p className="about-me">
                            {Object.values(currentProfile).length === 0
                                ? currentUser.aboutMe 
                                : currentProfile?.aboutMe}
                </p>
                <p className="skills">
                    <span className="skill-label">Key Skills:&nbsp;</span>
                            {Object.values(currentProfile).length === 0
                                ? currentUser.skills
                                : currentProfile?.skills}
                </p>
            </div>
            
            <div className="post-status-main">
                {allStatus
                .filter((item) => {
                    return item.userEmail === (Object.values(currentProfile).length === 0
                    ? currentUser.email
                    : currentProfile.email)
                })
                .map((posts) => {
                    return (
                    <div key={posts.id}>
                        <PostsCard posts={posts}/>
                    </div>
                )
                })}
            </div>
        </>
    )
}