import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import LinkedInLogo from '../../../assets/linkedInLogo.png';
import { BiSearchAlt2, BiHome, BiSolidBriefcaseAlt, BiMessageAltDetail } from 'react-icons/bi';
import { BsPeopleFill } from 'react-icons/bs';
import { IoMdNotificationsOutline } from 'react-icons/io';
import user from '../../../assets/userIcon.png';
import ProfilePopup from '../ProfilePopup';
import SearchUsers from '../SearchUsers';

//const goToRoute - this is the navigate function for all of the top bar icons. Line 2 import useNavigate from react router dom...no need for the helpers/useNavigate?

export default function Topbar({ currentUser }) {
    const [profilePopupOpen, setProfilePopupOpen] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    let navigate = useNavigate();

    const goToRoute = (route) => {
        navigate(route);
    }

    return (
        <div className="topbar-main">
            <img className="linkedInLogo" src={LinkedInLogo} alt='LinkedInLogo' />
            { isSearch ? <SearchUsers setIsSearch={setIsSearch} setSearchInput={setSearchInput} /> : 
            <div className="react-icons">    
                <BiSearchAlt2 
                    size={35} 
                    className="react-icon"
                    onClick={() => setIsSearch(true)}
                />
                <BiHome
                    size={35} 
                    className="react-icon" 
                    onClick={() => goToRoute("/home")} 
                />
                <BsPeopleFill 
                    size={35} 
                    className="react-icon"
                    onClick={() => goToRoute("/connections")}
                />
                <BiSolidBriefcaseAlt 
                    size={35} 
                    className="react-icon" 
                />
                <BiMessageAltDetail 
                    size={35} 
                    className="react-icon" 
                />
                <IoMdNotificationsOutline 
                    size={35} 
                    className="react-icon" 
                />
            </div> }
            
            <img 
                className="userLogo" 
                src={user} 
                alt='user' 
                onClick={() => setProfilePopupOpen(!profilePopupOpen)}
            />

            { searchInput.length === 0 ? ( 
                <></>
            ) : (
                <div className="search-results">

                </div>
            )}

            {profilePopupOpen && <ProfilePopup currentUser={currentUser}/>}
        </div>
    );
}