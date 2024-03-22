import React from 'react';
import PropTypes from 'prop-types';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) return children;
  // eslint-disable-next-line no-else-return
  else return <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
