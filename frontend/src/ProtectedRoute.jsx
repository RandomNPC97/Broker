import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axiosInstance from './api';
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isVerified, setIsVerified] = useState(null);

    useEffect(() => {
        const checkAuthAndVerification = async () => {
            try {
                await auth();
                if (isAuthenticated) {
                    await checkVerification();
                }
            } catch {
                setIsAuthenticated(false);
                setIsVerified(false);
            }
        };

        checkAuthAndVerification();
    }, [isAuthenticated]);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        try {
            const res = await axiosInstance.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem('access_token', res.data.access);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.log(error);
            setIsAuthenticated(false);
        }
    };

    const auth = async () => {
        const access_token = localStorage.getItem('access_token');
        if (!access_token) {
            setIsAuthenticated(false);
            return;
        }
        const decoded = jwtDecode(access_token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthenticated(true);
        }
    };

    const checkVerification = async () => {
        try {
            const res = await axiosInstance.get("/api/check-verified/");
            if (res.status === 200 && res.data.is_verified) {
                setIsVerified(true);
            } else {
                setIsVerified(false);
            }
        } catch (error) {
            console.log(error);
            setIsVerified(false);
        }
    };

    if (isAuthenticated === null || isVerified === null) {
        return (
            <div className="flex items-center justify-center h-screen bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600"></div>
            </div>
        );
    }

    if (isAuthenticated && isVerified) {
        return element;
    }

    return isAuthenticated && !isVerified ? <Navigate to="/verification" /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
