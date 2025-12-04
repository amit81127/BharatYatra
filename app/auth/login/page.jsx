"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                <h1 className="text-3xl font-bold mb-2 text-gray-800">Welcome Back</h1>
                <p className="text-gray-500 mb-8">Login to continue your journey with Bharat Yatra</p>

                <button
                    className="w-full bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
                    Continue with Google
                </button>
            </div>
        </div>
    );
}
