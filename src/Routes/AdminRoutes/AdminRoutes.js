import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useAdmin from '../../Hooks/useAdmin';


const AdminRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <h1 className='text-5xl font-bold text-center mt-7'>Loading.....</h1>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace />
};

export default AdminRoutes;