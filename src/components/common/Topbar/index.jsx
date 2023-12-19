import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import LinkedInLogo from '../../../assets/linkedInLogo.png';
import { BiSearchAlt2, BiHome, BiSolidBriefcaseAlt, BiMessageAltDetail } from 'react-icons/bi';
import { BsPeopleFill } from 'react-icons/bs';
import { IoMdNotificationsOutline } from 'react-icons/io';
import user from '../../../assets/userIcon.png';
import ProfilePopup from '../ProfilePopup';
import SearchUsers from '../SearchUsers';
import { getAllUsers } from '../../../api/FirestoreAPI';

//const goToRoute - this is the navigate function for all of the top bar icons. Line 2 import useNavigate from react router dom...no need for the helpers/useNavigate?

export default function Topbar({ currentUser }) {
    const [profilePopupOpen, setProfilePopupOpen] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    let navigate = useNavigate();

    const goToRoute = (route) => {
        navigate(route);
    }

    useEffect(() => {
        getAllUsers(setUsers);
    })

    const handleSearch = () => {
        if(searchInput !== '') {
            let searched = users.filter((user) => {
                return Object.values(user)
                .join('')
                .toLowerCase()
                .includes(searchInput.toLowerCase())
            });
            setFilteredUsers(searched);
        }
        else {
            setFilteredUsers(users);
        }
    };

    // this useEffect will run whenever search input changes, timeout is just to refresh it every 1 second

    useEffect(() => {
        let debounced = setTimeout(() => {
            handleSearch();
        }, 1000)

        return () => clearTimeout(debounced);
    }, [searchInput])

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
                    {filteredUsers.length === 0 ? (
                        <div className="search-inner">No Results Found</div>
                    ) : (
                        filteredUsers.map((user) => (
                            <div className="search-inner">
                                <img src={user.imageLink} />
                                <p classname="name">{user.name}</p>
                                
                            </div>
                            ))
                        )}
                </div>
            )}

            {profilePopupOpen && <ProfilePopup currentUser={currentUser}/>}
        </div>
    );
}