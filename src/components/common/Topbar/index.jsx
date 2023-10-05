import React from 'react';
import './index.scss';
import LinkedInLogo from '../../../assets/linkedInLogo.png';
import { BiSearchAlt2, BiHome, BiSolidBriefcaseAlt, BiMessageAltDetail } from 'react-icons/bi';
import { BsPeopleFill } from 'react-icons/bs';
import { IoMdNotificationsOutline } from 'react-icons/io';
import user from '../../../assets/userIcon.png';

export default function Topbar() {
    return (
        <div className="topbar-main">
            <img className="linkedInLogo" src={LinkedInLogo} alt='LinkedInLogo' />
            <div className="react-icons">    
                <BiSearchAlt2 size={35} className="react-icon" />
                <BiHome size={35} className="react-icon" />
                <BsPeopleFill size={35} className="react-icon" />
                <BiSolidBriefcaseAlt size={35} className="react-icon" />
                <BiMessageAltDetail size={35} className="react-icon" />
                <IoMdNotificationsOutline size={35} className="react-icon" />
            </div>
            <img className="userLogo" src={user} alt='user' />
        </div>
    )
}