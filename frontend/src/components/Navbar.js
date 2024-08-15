import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Navbar() {
  const { token, logout } = useAuth();

  return (
    <nav>
      <Link to="/shop">Shop</Link>
      {!token ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      ) : (
        <>
          <Link to="/admin">Admin</Link>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
