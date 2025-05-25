import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Message {
  id: number;
  user: string;
  message: string;
  timestamp: string;
  likes: number;
}

interface MessageFeedProps {
  messages: Message[];
}

export function MessageFeed({ messages }: MessageFeedProps) {
  const [decryptInputs, setDecryptInputs] = useState<{ [key: number]: string }>({});

  const handleDecrypt = async (messageId: number) => {
    const privateKey = decryptInputs[messageId];
    if (!privateKey) return;
    
    // Here you would typically call your decrypt API
    console.log(`Decrypting message ${messageId} with key: ${privateKey}`);
  };

  return (
    <div className="flex-1 space-y-4 order-1">
      {messages.map((msg) => (
        <div key={msg.id} className="border border-gray-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] bg-gray-50 hover:bg-gray-100 transition-colors">
          {/* Individual Message Card */}
          <div className="flex items-start gap-4 p-4">
            {/* User Avatar */}
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
              {msg.user[0]}
            </div>

            {/* Message Content */}
            <div className="flex-1 min-w-0">
              {/* User Info and Timestamp */}
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold">{msg.user}</span>
                <span className="text-gray-500 text-sm">· {msg.timestamp}</span>
              </div>

              {/* Message Text */}
              <p className="text-gray-800 mb-3 break-words">{msg.message}</p>

              {/* Like Button */}
              <div className="flex items-center gap-6 text-gray-500">
                <button 
                  className="flex items-center gap-2 hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(`Liked message ${msg.id}`);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  <span>{msg.likes}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Decrypt Section */}
          <div className="px-4 pb-4">
            <div className="flex gap-2 items-center">
              <Input
                type="password"
                placeholder="Enter private key to decrypt"
                value={decryptInputs[msg.id] || ''}
                onChange={(e) => {
                  setDecryptInputs(prev => ({
                    ...prev,
                    [msg.id]: e.target.value
                  }));
                }}
                className="flex-1"
              />
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDecrypt(msg.id);
                }}
                disabled={!decryptInputs[msg.id]}
              >
                Decrypt
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 