import React from 'react';

export default function ConnectedUsers({ user, getCurrentUser }) {
  return (
    <div className="grid-child" onClick={() => getCurrentUser(user.id)}>
        <p>{user.name}</p>
        <p>{user.headline}</p>
    </div>

  )
}
