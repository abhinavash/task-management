import React, { useEffect } from 'react';
import authStore from '../store/authStore';
import { Navigate } from 'react-router-dom';
export default function RequiredAuth(props) {
    const store = authStore();

    useEffect(() => {
        if (store.loggedIn === null) {
            store.checkAuth();
        }
    }, [store]);

    if (store.loggedIn === null) {
        // Authentication check is in progress, you can render a loading indicator or return null
        return null;
    }

    if (store.loggedIn === null) {
        return <div>loading...</div>;
    }

    if (store.loggedIn === false) {
        return <Navigate to="/login"/>;
    }

    return <div>{props.children}</div>;
}
