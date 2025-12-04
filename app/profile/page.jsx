"use client";

import { useUser } from "@clerk/nextjs";

export default function ProfilePage() {
    const { user, isLoaded, isSignedIn } = useUser();

    if (!isLoaded) return <div className="p-6">Loading...</div>;

    if (!isSignedIn)
        return <div className="p-6">Please log in to view profile.</div>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">Profile</h1>
            <p>Name: {user.fullName}</p>
            <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
            <img className="mt-4 w-24 rounded-full" src={user.imageUrl} alt={user.fullName} />
        </div>
    );
}
