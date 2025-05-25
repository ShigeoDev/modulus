import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface MessageComposerProps {
  onEncrypt: (message: string) => void;
  encryptedMessage?: string;
}

export function MessageComposer({ onEncrypt, encryptedMessage }: MessageComposerProps) {
  const [message, setMessage] = useState("");
  const [linkWarning, setLinkWarning] = useState(false);
  const MAX_MESSAGE_LENGTH = 280;

  // Helper function to detect links or domain endings
  const containsLink = (text: string) => {
    // Matches http(s)://, www., or common domain endings
    return /(https?:\/\/|www\.|\.[a-z]{2,6}(\b|\/|:|\?))/i.test(text);
  };

  return (
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
              onClick={() => onEncrypt(message)} 
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
  );
} 