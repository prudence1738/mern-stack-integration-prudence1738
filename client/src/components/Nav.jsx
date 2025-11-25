import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Nav() {
  const { user, logout } = useApp();
  return (
    <nav>
      <div className="container">
        <Link to="/">Blog</Link>
        <Link to="/posts/new">Create</Link>
        {user ? (
          <>
            <span style={{ marginLeft: 10 }}>{user.username}</span>
            <button onClick={logout} style={{ marginLeft: 8 }}>Logout</button>
          </>
        ) : (
          <span style={{ marginLeft: 10 }}>Not logged</span>
        )}
      </div>
    </nav>
  );
}
