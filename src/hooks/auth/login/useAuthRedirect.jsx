import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function useAuthRedirect() {
    const navigate = useNavigate();

    const redirectByRole = (role) => {
        switch (role) {
            case "ADMIN":
                navigate("/admin");
                break;

            case "USER":
                navigate("/home-private");
                break;

            default:
                navigate("/");
                break;
        }

    }

    return { redirectByRole };
}
