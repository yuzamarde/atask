import React, { useState } from "react";
import { IconChevronDown, IconStar } from "@tabler/icons-react"; // Import icon dari Tabler

// Definisikan tipe data untuk repository
interface Repository {
    title: string;
    description: string;
    likes: string;
}

// Definisikan tipe data untuk user
interface User {
    id: string;
    name: string;
    data: Repository[];
}

// Definisikan tipe data untuk props komponen
interface UserListProps {
    users: User[];
    loading: boolean;
    searchPerformed: boolean;
}

const UserList: React.FC<UserListProps> = ({ users, loading, searchPerformed }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [likedRepos, setLikedRepos] = useState<{ [key: string]: boolean }>({});

    const toggleDropdown = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Fungsi untuk toggle like/unlike
    const handleLikeToggle = (userId: string, repoIndex: number) => {
        setLikedRepos((prevLikes) => {
            const key = `${userId}-${repoIndex}`;
            return {
                ...prevLikes,
                [key]: !prevLikes[key], // Toggle true/false
            };
        });
    };

    return (
        <div className="w-full max-w-md mx-auto mt-4">
            {loading ? (
                <p className="text-center text-gray-500 font-semibold">Searching...</p>
            ) : searchPerformed && users.length === 0 ? (

                <p className="text-center text-red-600 font-semibold">User not found</p>
            ) : (
                <ul className="space-y-3">
                    {users.map((user, index) => (
                        <li key={user.id} className="border rounded-lg bg-white shadow-md">
                            <button
                                className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-gray-100 focus:outline-none"
                                onClick={() => toggleDropdown(index)}
                            >
                                <span className="font-medium text-gray-700">{user.name}</span>
                                <IconChevronDown
                                    size={24}
                                    className={`transition-transform duration-300 ${openIndex === index ? "rotate-180" : "rotate-0"
                                        }`}
                                />
                            </button>

                            {openIndex === index && (
                                <div className="border-t bg-gray-50 p-4">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Repositories:</h4>

                                    {Array.isArray(user.data) && user.data.length > 0 ? (
                                        <ul className="space-y-2">
                                            {user.data.map((repo, repoIndex) => {
                                                const key = `${user.id}-${repoIndex}`;
                                                const isLiked = likedRepos[key] || false; // Cek apakah repository sudah di-like
                                                const likes = parseInt(repo.likes, 10) + (isLiked ? 1 : 0); // Jika di-like, tambahkan 1

                                                return (
                                                    <li key={repoIndex} className="flex flex-col p-2 bg-white border rounded shadow-sm gap-2">
                                                        <h3 className="text-left font-semibold">{repo.title}</h3>
                                                        <div className="text-left flex flex-row justify-between items-center">
                                                            <p>{repo.description}</p>
                                                            <button
                                                                className="flex flex-row text-s items-center gap-1 cursor-pointer"
                                                                onClick={() => handleLikeToggle(user.id, repoIndex)}
                                                            >
                                                                {likes}
                                                                <IconStar
                                                                    className="h-4 w-4"
                                                                    fill={isLiked ? "black" : "none"}
                                                                    stroke="currentColor"
                                                                />
                                                            </button>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-600 font-semibold">No repositories found</p>
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserList;
