import React, { useState, createContext, useContext, useEffect } from 'react';

// custom hook for notification
const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState({
        message: '',
        type: '',
        show: false,
        isHomePage: true,
        duration: 4000,
    });

    useEffect(() => {
        if (notification.show) {
            const timer = setTimeout(() => {
                setNotification(prev => ({ ...prev,message: '', type: '', show: false,}));
            }, notification.duration);
            return () => clearTimeout(timer);
        }
    }, [notification.show]);

    return (
        <NotificationContext.Provider value={{ notification, setNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    return useContext(NotificationContext);
};