// PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ element: Element }) => {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? <Element /> : <Navigate to="/login" />;
};

export default PrivateRoute;
