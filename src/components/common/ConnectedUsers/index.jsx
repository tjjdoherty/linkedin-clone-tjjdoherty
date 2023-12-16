import React, { useEffect, useState } from 'react';
import { IoPersonAdd } from "react-icons/io5";
import { getConnections } from '../../../api/FirestoreAPI';

export default function ConnectedUsers({ user, currentUser, getCurrentUser }) {
  const [ isConnected, setIsConnected ] = useState(false);
  
  useEffect(() => {
    getConnections(currentUser.userID, user.userID, setIsConnected);
}, [currentUser.userID, user.userID]);
  
  return isConnected ? (
    <></> )
    : (
    <div className="grid-child">
        <img src={user.imageLink} />
        <p className="name">{user.name}</p>
        <p className="headline">{user.headline}</p>

        <button onClick={() => getCurrentUser(user.userID)}>
          <IoPersonAdd size={20} /> 
          Connect
        </button>
    </div>
  )
}