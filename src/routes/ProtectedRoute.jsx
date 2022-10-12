import React from 'react';
import {useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ()=>{
    const location = useLocation();
    const { loggedIn } = useAuth();

    return loggedIn ? ( <Outlet/> ) : ( <Navigate to='/login' state={{ from: location }} replace />)
}

export default ProtectedRoute;