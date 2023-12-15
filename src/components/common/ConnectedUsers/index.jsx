import React, { useEffect, useState } from 'react';
import { getConnections } from '../../../api/FirestoreAPI';

export default function ConnectedUsers({ user, currentUser, getCurrentUser }) {
  const [ isConnected, setIsConnected ] = useState(false);
  
  useEffect(() => {
    getConnections(currentUser.userID, user.userID, setIsConnected);
}, [currentUser.userID, user.userID]);
  
  return isConnected ? (
    <></> )
    : (
    <div className="grid-child" onClick={() => getCurrentUser(user.userID)}>
        <p>{user.name}</p>
        <p>{user.headline}</p>
    </div>
  )
}
