import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";
import axios from "axios";
import "./App.css"; // Tambahkan style untuk halaman utama

const API_URL = "https://67c963810acf98d0708a0e5a.mockapi.io/users"; // MockAPI.io

const App = () => {
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async (query) => {
    if (!query) return;
    setLoading(true);
    setSearchQuery(query);
    try {
      const response = await axios.get(API_URL);
      if (response.data) {
        const filteredUsers = response.data.filter((user) =>
          user.name.toLowerCase().includes(query.toLowerCase())
        );
        setUsers(filteredUsers.slice(0, 5));
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  const fetchRepos = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      if (response.data && response.data.data) {
        setRepos(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching repos:", error);
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>GitHub Repositories Explorer</h1>
      <SearchBar onSearch={fetchUsers} />
      {searchQuery &&
        <div className="user-list-container">
          <p>Showing users for "{searchQuery}"</p>
        </div>
      }
      {loading && <p>Loading...</p>}
      <UserList users={users} onSelectUser={fetchRepos} />
    </div>
  );
};

export default App;
