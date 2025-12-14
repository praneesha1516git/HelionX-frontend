import { Outlet , Navigate } from "react-router";
import { useUser } from "@clerk/clerk-react";

export default function ProtectedLayout() {
    const { isSignedIn , isLoaded , user} = useUser(); 

    if (!isLoaded) {
        return null; // or a loading spinner

    }

    if(!isSignedIn){
        return <Navigate to = "/sign-in"  />
    }

    return <Outlet />;
}