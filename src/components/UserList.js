import React, { useState } from "react";

const UserList = ({ users }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleDropdown = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="user-list-container">
            <ul className="user-list">
                {users.map((user, index) => (
                    <li key={user.id} className="user-item">
                        {/* Tombol untuk membuka dropdown */}
                        <button className="user-button" onClick={() => toggleDropdown(index)}>
                            {user.name}
                            <span className={`dropdown-icon ${openIndex === index ? "open" : ""}`}>&#9662;</span>
                        </button>

                        {/* Dropdown untuk menampilkan data repository */}
                        {openIndex === index && (
                            <div className="dropdown-content">
                                <h4>Repositories:</h4>
                                {user.data && user.data.length > 0 ? (
                                    <ul className="repo-list">
                                        {user.data.map((repo, repoIndex) => (
                                            <li key={repoIndex} className="repo-item">
                                                <strong>{repo.title}</strong>: {repo.description} (⭐ {repo.likes})
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No repositories found</p>
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
