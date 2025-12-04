"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
    const { data: session } = useSession();

    if (!session)
        return <div className="p-6">Please log in to view profile.</div>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">Profile</h1>
            <p>Name: {session.user.name}</p>
            <p>Email: {session.user.email}</p>
            <img className="mt-4 w-24 rounded-full" src={session.user.image} alt={session.user.name} />
        </div>
    );
}
