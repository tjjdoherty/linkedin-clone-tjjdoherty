import React from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";
import './index.scss';

export default function SearchUsers( { setIsSearch, setSearchInput } ) {
    return (
        <div className="search-users">
            <input 
                placeholder="Search users..." 
                onChange={(event) => {setSearchInput(event.target.value)}} 
            />

            < IoIosCloseCircleOutline 
                className="close-icon" 
                size={20} 
                onClick={() => {
                    setIsSearch(false);
                    setSearchInput("")
                }}
            />
        </div>
    )
}