import React from 'react';
import './index.scss';
import LinkedInLogo from '../../../assets/linkedInLogo.png';

export default function Topbar() {
    return (
        <div className="topbar-main">
            <img className="linkedInLogo" src={LinkedInLogo} alt='LinkedInLogo' />
            Topbar
        </div>
    )
}