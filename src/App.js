import React, { useState } from "react";
import "./App.css";
const port = process.env.PORT || 3001;

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");
    fetch(`http://localhost:${port}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data.message);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <h1>Gary's AI Factoids</h1>
      <p>Feeling bored? gary can teach you something!</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          placeholder="e.g. can you tell me something about cats?"
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button type="submit">Teach me</button>
      </form>
      {loading && (
        <p className="response">
          {" "}
          <b>Thinking...</b>{" "}
        </p>
      )}
      {!loading && response && (
        <div className="response">
          <b>Gary:</b> {response}
        </div>
      )}
    </div>
  );
}

export default App;
