import React, { useEffect, useState } from "react";

function App() {
  const [health, setHealth] = useState(null);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then(setHealth)
      .catch(console.error);

    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch(console.error);
  }, []);

  const addUser = async () => {
    if (!name.trim()) return;
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const newUser = await res.json();
    setUsers([...users, newUser]);
    setName("");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Docker Fullstack Demo</h1>

      <section>
        <h2>Health</h2>
        <pre>{JSON.stringify(health, null, 2)}</pre>
      </section>

      <section>
        <h2>Users</h2>
        <input
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={addUser} style={{ marginLeft: "0.5rem" }}>
          Add User
        </button>
        <ul>
          {users.map((u) => (
            <li key={u._id}>{u.name}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
