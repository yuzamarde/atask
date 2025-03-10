import React, { useState } from "react";
import { IconChevronDown, IconStar } from "@tabler/icons-react"; // Import icon dari Tabler

const UserList = ({ users, loading, searchPerformed }) => {
    const [openIndex, setOpenIndex] = useState(null);
    const [likedRepos, setLikedRepos] = useState({});

    const toggleDropdown = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };


    // Fungsi untuk toggle like/unlike
    const handleLikeToggle = (userId, repoIndex) => {
        setLikedRepos((prevLikes) => {
            const key = `${userId}-${repoIndex}`;
            const isLiked = prevLikes[key]; // Cek apakah sudah di-like

            return {
                ...prevLikes,
                [key]: isLiked ? undefined : 1, // Jika sudah like, hapus. Jika belum, tambahkan like.
            };
        });
    };

    return (
        <div className="w-full max-w-md mx-auto mt-4">
            {/* Tampilkan loading hanya jika sedang mencari */}
            {loading ? (
                <p className="text-center text-gray-500 font-semibold">Searching...</p>
            ) : searchPerformed && users.length === 0 ? (
                /* Tampilkan "User not found" hanya setelah pencarian dilakukan */
                <p className="text-center text-red-600 font-semibold">User not found</p>
            ) : (
                <ul className="space-y-3">
                    {users.map((user, index) => (
                        <li key={user.id} className="border rounded-lg bg-white shadow-md">
                            {/* Tombol untuk membuka dropdown */}
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

                            {/* Dropdown untuk menampilkan data repository */}
                            {openIndex === index && (
                                <div className="border-t bg-gray-50 p-4">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Repositories:</h4>

                                    {/* Pastikan data ada atau tampilkan pesan jika tidak */}
                                    {Array.isArray(user.data) && user.data.length > 0 ? (
                                        <ul className="space-y-2">
                                            {user.data.map((repo, repoIndex) => {
                                                const key = `${user.id}-${repoIndex}`;
                                                const isLiked = likedRepos[key] !== undefined; // Cek apakah repository sudah di-like
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
