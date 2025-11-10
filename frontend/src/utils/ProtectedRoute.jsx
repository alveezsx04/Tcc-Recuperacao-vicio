import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('user-token');

    if (!token) {
        return <Navigate to="/cadastro" state={{show: 'login'}} replace />;
    }

    return children;
}

export default ProtectedRoute;