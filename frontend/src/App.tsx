import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { MessageFeed } from "./components/MessageFeed";
import { MessageComposer } from "./components/MessageComposer";
import Login from "./login/login";
import Register from "./register/register";

function MainContent() {
  const [encryptedMessage, setEncryptedMessage] = useState("");

  // Temporary messages for the feed
  const tempMessages = [
    {
      id: 1,
      user: "Alice",
      message: "Just encrypted my first message! 🔐",
      timestamp: "2h",
      likes: 12
    },
    {
      id: 2,
      user: "Bob",
      message: "The encryption is working perfectly!",
      timestamp: "4h",
      likes: 8
    },
    {
      id: 3,
      user: "Charlie",
      message: "Secure communication made easy with CipherSpace",
      timestamp: "1d",
      likes: 24
    },
    {
      id: 4,
      user: "David",
      message: "Finally, a secure way to share sensitive information!",
      timestamp: "2d",
      likes: 15
    },
    {
      id: 5,
      user: "Eve",
      message: "The UI is so clean and intuitive. Love it!",
      timestamp: "3d",
      likes: 19
    },
  ];

  const encryptMessage = async (message: string) => {
    const res = await fetch("/api/encrypt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setEncryptedMessage(data.encrypted);
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <MessageFeed messages={tempMessages} />
          
          {/* Desktop Message Composition Panel */}
          <div className="hidden lg:block w-96 flex-shrink-0">
            <MessageComposer 
              onEncrypt={encryptMessage}
              encryptedMessage={encryptedMessage}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<MainContent />} />
    </Routes>
  );
}

