import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";
import axios from "axios";

// Definisikan tipe data untuk repository
interface Repository {
  title: string;
  description: string;
  likes: string; // Bisa diubah ke number jika backend mengembalikannya sebagai angka
}

// Definisikan tipe data untuk user
interface User {
  id: string;
  name: string;
  data: Repository[];
}

const API_URL = process.env.REACT_APP_API_URL || ""; // Pastikan variabel environment tersedia

const App: React.FC = () => {
  const [users, setUsers] = useState < User[] > ([]); // State users dengan tipe array User
  const [loading, setLoading] = useState < boolean > (false);
  const [searchQuery, setSearchQuery] = useState < string > ("");
  const [searchPerformed, setSearchPerformed] = useState < boolean > (false); // Untuk mendeteksi apakah pencarian sudah dilakukan

  const fetchUsers = async (query: string) => {
    if (!query) return;
    setLoading(true);
    setSearchQuery(query);
    setSearchPerformed(true); // Setel menjadi true saat pencarian pertama kali dilakukan
    try {
      const response = await axios.get < User[] > (API_URL); // Pastikan response adalah array User
      if (response.data) {
        const filteredUsers = response.data
          .filter((user) => user.name.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 5);

        // Pastikan setiap user memiliki `data` meskipun kosong
        const usersWithDefaultData = filteredUsers.map((user) => ({
          ...user,
          data: Array.isArray(user.data) ? user.data : [], // Set ke array kosong jika undefined
        }));

        setUsers(usersWithDefaultData);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  return (
    <div className="app-container p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">GitHub Repositories Explorer</h1>
      <SearchBar onSearch={fetchUsers} />
      {searchQuery && (
        <div className="w-full rounded-lg mt-4">
          <p className="text-left">Showing users for "{searchQuery}"</p>
        </div>
      )}
      <UserList users={users} loading={loading} searchPerformed={searchPerformed} />
    </div>
  );
};

export default App;
