import React, { useState } from "react";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState<string>("");

    // Fungsi untuk memicu pencarian
    const handleSearch = () => {
        if (query.trim() !== "") {
            onSearch(query);
        }
    };

    // Menjalankan pencarian saat tombol "Enter" ditekan
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="flex flex-col items-center space-y-3 py-4">
            <input
                type="text"
                placeholder="Search MockAPI users..."
                value={query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
                onClick={handleSearch}
                className="w-full max-w-md bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;
