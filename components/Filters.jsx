"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Filters({ categories = [] }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get("category") || "all";

    const handleCategoryChange = (category) => {
        const params = new URLSearchParams(searchParams);
        if (category === "all") {
            params.delete("category");
        } else {
            params.set("category", category);
        }
        router.replace(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex flex-wrap gap-2">
            <button
                onClick={() => handleCategoryChange("all")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${currentCategory === "all"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
            >
                All
            </button>
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize ${currentCategory === cat
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}
