import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { getCurrentUserDetails, isLoggedIn} from '../auth';
import { useLocation } from 'react-router-dom';
const RequiredAuth = ({allowedRoles}) => {
    const location = useLocation();
    const user = getCurrentUserDetails()

    return (  
                
                
                isLoggedIn ? ( 
                        allowedRoles?.includes(user?.role) ? 
                        <Outlet/>
                        :
                        <Navigate to="/unauthorized" state={{from:location}} replace />
                )
                :
                        <Navigate to="/login" state={{from:location}} replace />
        
        )
}

export default RequiredAuth