import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function Modulus() {
  const [message, setMessage] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [decryptInputs, setDecryptInputs] = useState<{ [key: number]: string }>({});
  const [isMobileComposeOpen, setIsMobileComposeOpen] = useState(false);
  const [linkWarning, setLinkWarning] = useState(false);
  const MAX_MESSAGE_LENGTH = 280;

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

  const encryptMessage = async () => {
    const res = await fetch("/api/encrypt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, publicKey }),
    });
    const data = await res.json();
    setEncryptedMessage(data.encrypted);
  };

  const handleDecrypt = async (messageId: number) => {
    const privateKey = decryptInputs[messageId];
    if (!privateKey) return;
    
    // Here you would typically call your decrypt API
    console.log(`Decrypting message ${messageId} with key: ${privateKey}`);
    // const res = await fetch("/api/decrypt", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ message: encryptedMessage, privateKey }),
    // });
    // const data = await res.json();
    // Handle decrypted message...
  };

  const handleClose = () => {
    setIsMobileComposeOpen(false);
  };

  // Helper function to detect links or domain endings
  const containsLink = (text: string) => {
    // Matches http(s)://, www., or common domain endings
    return /(https?:\/\/|www\.|\.[a-z]{2,6}(\b|\/|:|\?))/i.test(text);
  };

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Header Section */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Modulus
            </h1>
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold cursor-pointer hover:bg-gray-400 transition-colors">
              U
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Message Feed Section */}
          <div className="flex-1 space-y-4 order-1">
            {tempMessages.map((msg) => (
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

          {/* Desktop Message Composition Panel */}
          <div className="hidden lg:block w-96 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              {/* Message Input Box */}
              <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] bg-gray-50">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                  U
                </div>

                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Textarea
                      className="resize-none"
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val.length <= MAX_MESSAGE_LENGTH) {
                          if (containsLink(val)) {
                            setLinkWarning(true);
                          } else {
                            setLinkWarning(false);
                            setMessage(val);
                          }
                        }
                      }}
                      placeholder="What's your encrypted message?"
                    />

                    {/* Character Counter and Link Warning */}
                    <div className="flex justify-between items-center">
                      {linkWarning && (
                        <span className="text-xs text-red-500">Links are not allowed in messages.</span>
                      )}
                      <span className={`text-sm ${message.length > MAX_MESSAGE_LENGTH * 0.9 ? 'text-red-500' : 'text-gray-500'}`}>
                        {message.length}/{MAX_MESSAGE_LENGTH}
                      </span>
                    </div>
                  </div>

                  {/* Send Button */}
                  <div className="flex justify-center w-full">
                    <Button 
                      onClick={encryptMessage} 
                      className="w-full max-w-md"
                      disabled={!message.trim() || message.length > MAX_MESSAGE_LENGTH || linkWarning}
                    >
                      Encrypt & Post
                    </Button>
                  </div>
                </div>
              </div>

              {/* Encrypted Message Output */}
              {encryptedMessage && (
                <div className="bg-gray-100 p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-gray-200">
                  <h3 className="font-semibold mb-2">Encrypted Message:</h3>
                  <pre className="whitespace-pre-wrap break-words text-sm">
                    {encryptedMessage}
                  </pre>
                </div>
              )}

              {/* How it Works Section */}
              <div className="bg-gray-50 p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-gray-200">
                <h3 className="font-semibold mb-4">How Modulus Works</h3>
                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Write Your Message</p>
                      <p className="text-sm text-gray-600">Type your message in the composition box above. This will be encrypted before being sent.</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Get Your Public Key</p>
                      <p className="text-sm text-gray-600">After sending, you'll receive a public key. This key is used to encrypt messages for you.</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Share Your Key</p>
                      <p className="text-sm text-gray-600">Share your public key with others. They can use it to send you encrypted messages that only you can read.</p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Decrypt Messages</p>
                      <p className="text-sm text-gray-600">Use your private key to decrypt messages sent to you. Keep your private key secure and never share it.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Compose Button */}
      <button
        onClick={() => setIsMobileComposeOpen(true)}
        className="fixed bottom-6 left-6 lg:hidden w-14 h-14 rounded-full bg-gray-900 text-white shadow-lg flex items-center justify-center hover:bg-gray-800 transition-colors duration-200 z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>

      {/* Mobile Compose Modal */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 lg:hidden transition-all duration-300 ease-in-out ${
          isMobileComposeOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div 
          className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out ${
            isMobileComposeOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">New Message</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Modal Content */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Textarea
                className="resize-none"
                rows={4}
                value={message}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val.length <= MAX_MESSAGE_LENGTH) {
                    if (containsLink(val)) {
                      setLinkWarning(true);
                    } else {
                      setLinkWarning(false);
                      setMessage(val);
                    }
                  }
                }}
                placeholder="What's your encrypted message?"
              />

              {/* Character Counter and Link Warning */}
              <div className="flex justify-between items-center">
                {linkWarning && (
                  <span className="text-xs text-red-500">Links are not allowed in messages.</span>
                )}
                <span className={`text-sm ${message.length > MAX_MESSAGE_LENGTH * 0.9 ? 'text-red-500' : 'text-gray-500'}`}>
                  {message.length}/{MAX_MESSAGE_LENGTH}
                </span>
              </div>
            </div>

            {/* Send Button */}
            <div className="flex justify-center w-full">
              <Button 
                onClick={() => {
                  encryptMessage();
                  handleClose();
                }}
                className="w-full max-w-md transition-colors duration-200"
                disabled={!message.trim() || message.length > MAX_MESSAGE_LENGTH || linkWarning}
              >
                Encrypt & Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

