import React, { useEffect, useState } from 'react';
import { getAllUsers, addConnection, getConnections } from '../api/FirestoreAPI';
import ConnectedUsers from './common/ConnectedUsers';
import "../Sass/ConnectionsComponent.scss";

export default function ConnectionsComponent({ currentUser }) {
    const [users, setUsers] = useState([]);
    const [isConnected, setIsConnected] = useState(false);

    const getCurrentUser = (targetID) => {

        addConnection(currentUser.userID, targetID)
    }

    useEffect(() => {
        getAllUsers(setUsers);
    }, []);

    // useEffect(() => {
    //     getConnections(currentUser.userID, targetID, setIsConnected);
    // }, [currentUser.userID, targetID]);

    //  console.log(isConnected);

  return (
    <div className="connections-main">
        {users.map((user) => {
            return user.id === currentUser.userID ? (
                <></>
            ) : (
                <ConnectedUsers user={user} getCurrentUser={getCurrentUser} />
            );
        })}
    </div>
  )
}
