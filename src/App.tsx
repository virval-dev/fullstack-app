import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const apiUrl = "http://localhost:3001";

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    axios.get(`${apiUrl}/api/data`).then((res) => {
      setData(res.data.data);
    });
  }, []);

  function addItems(e: any) {
    // Check if name is empty
    if (!name) {
      alert("Please enter name");
      return;
    }

    const newItem = { id: count, name: name };

    // Send a POST request to the backend API
    axios.post(`${apiUrl}/api/data`, newItem).then((res) => {
      // Update the data on the frontend
      setData([...data, newItem]);
      setName("");
      setCount(count + 1);
    });
  }

  return (
    <div className="App">
      <h1>Fullstack App</h1>
      {data.map((item: any) => (
        <div key={item.id}>{item.name}</div>
      ))}
      <form onSubmit={addItems}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;
