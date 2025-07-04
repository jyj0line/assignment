"use client";

import { useState } from "react";
import { Button } from "react-bootstrap";

import { signOutPSF } from "@/app/lib/SFs/PSFs/authPSFs";

export const LogoutButton = () => {
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        await signOutPSF();
        setLoading(false);
    }
    
    return (
        <Button
            variant="primary"
            disabled={loading}
            onClick={handleLogout}
        >
            {loading ? "Logging out..." : "Logout"}
        </Button>
    )
}