import React, { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.message));
  };

  
  return (
    <div className="App">
      <h1>Gary's AI Jokes</h1>
      <p>
        feeling down? How about a quick joke from Gary Delaney? see if he can make
        you smile!
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          placeholder="Ask gary for a joke"
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div className="joke-response">
          <b>Gary:</b> {response}
        </div>
      )}
    </div>
  );
}

export default App;
