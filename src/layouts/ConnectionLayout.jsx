import React, { useState, useMemo } from 'react';
import Connections from '../pages/Connections';
import { getCurrentUser } from "../api/FirestoreAPI";
import Topbar from '../components/common/Topbar'

export default function ConnectionsLayout() {
    const [currentUser, setCurrentUser] = useState({});
    useMemo(() => {
        getCurrentUser(setCurrentUser);
    }, [])
    return (
        <div>
            <Topbar currentUser={currentUser} />
            <Connections currentUser={currentUser} />
        </div>
    )
}