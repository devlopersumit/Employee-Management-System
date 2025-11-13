import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ allowedRole, children }) {
    const userData = localStorage.getItem('user');
    let user = null;

    if (userData) {
        try {
            user = JSON.parse(userData);
        } catch {
            // stored value is not JSON (e.g. a token or malformed string) — treat as unauthenticated
            user = null;
        }
    }

    if (!user) return React.createElement(Navigate, { to: '/', replace: true });

    if (allowedRole) {
        const allowed = Array.isArray(allowedRole) ? allowedRole : [allowedRole];
        if (!user.role || !allowed.includes(user.role)) return React.createElement(Navigate, { to: '/', replace: true });
    }

    return children;
}