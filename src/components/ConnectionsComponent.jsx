import React, { useEffect, useState } from 'react';
import { getAllUsers, addConnection } from '../api/FirestoreAPI';
import ConnectedUsers from './common/ConnectedUsers';
import "../Sass/ConnectionsComponent.scss";

export default function ConnectionsComponent({ currentUser }) {
    const [users, setUsers] = useState([]);

    const getCurrentUser = (targetID) => {
        addConnection(currentUser.userID, targetID)
    }

    useEffect(() => {
        getAllUsers(setUsers);
    }, []);


  return (
    <div className="connections-main">
        {users.map((user) => {
            return user.userID === currentUser.userID ? (
                <></>
            ) : (
                <ConnectedUsers 
                    user={user} 
                    currentUser={currentUser} 
                    getCurrentUser={getCurrentUser} 
                />
            );
        })}
    </div>
  )
}
