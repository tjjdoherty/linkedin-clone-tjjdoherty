import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../api/FirestoreAPI';
import ConnectedUsers from './common/ConnectedUsers';
import "../Sass/ConnectionsComponent.scss";

export default function ConnectionsComponent() {
    const [users, setUsers] = useState([]);
    const getCurrentUser = (id) => {
        console.log(id)
    }

    useEffect(() => {
        getAllUsers(setUsers);
    }, []);

  return (
    <div className="connections-main">
        {users.map((user) => {
        return <ConnectedUsers user={user} getCurrentUser={getCurrentUser} />
        })}
    </div>
  )
}
