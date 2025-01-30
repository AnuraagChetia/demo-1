import React, { useState } from "react";

const DataBase = (users) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Search function
  const filteredUsers = users.users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        ></input>
        <button>Search</button>
      </div>
      <div>
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            style={{
              border: "1px solid black",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img alt={user.FirstName} src={user.pfp} height={100} />
            <div style={{ padding: "10px" }}>
              <div>{`${user.firstName} ${user.lastName}`}</div>
              <div>{user.email}</div>
              <div>{user.phone}</div>
              <div>{user.role}</div>
            </div>
          </div>
        ))}
        {filteredUsers.length === 0 && <div>No users found</div>}
      </div>
    </>
  );
};

export default DataBase;
