"use client";

import ChatForm from "@/components/ChatForm";
import Message from "@/components/Message";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socketClient";

interface Message {
  sender: string;
  content: string;
}

export default function Home() {
  const [room, setRoom] = useState<string>('');
  const [joined, setJoined] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  // useEffect(() => {
  //   socket.on('user-joined', (message: string) => {
  //     setMessages((prevMessages) => [...prevMessages, { sender: 'system', content: message }]);
  //   });

  //   socket.on('message', (data) => {
  //     setMessages((prevMessages) => [...prevMessages, data]);
  //   });

  //   return () => {
  //     socket.off('user-joined');
  //     socket.off('message');
  //   };
  // }, []);

  const handleSendMessage = (message: string) => {
    const data = { room, message, sender: userName };
    setMessages((prevMessages) => [...prevMessages, { sender: userName, content: message }]);
    socket.emit('message', data);
  };

  const handleJoinRoom = () => {
    if (room.length > 0 && userName.length > 0) {
      socket.emit('join-room', { room, username: userName });
      setJoined(true);
    }
  };

  return (
    <div className="flex mt-24 justify-center w-full">
      {!joined ? (
        <div className="flex w-full gap-2 max-w-3xl mx-auto flex-col items-center">
          <h1 className="mb-4 text-2xl font-bold">Join a room</h1>
          <input
            type="text"
            placeholder="Enter your username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-64 px-4 py-2 border-2 rounded-lg"
          />
          <input
            type="text"
            placeholder="Enter room name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-64 px-4 py-2 border-2 rounded-lg"
          />
          <button
            onClick={handleJoinRoom}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Join Room
          </button>
        </div>
      ) : (
        <div className="w-full max-w-3xl mx-auto">
          <h1 className="mb-4 text-2xl font-bold">Room: </h1>
          <div className="h-[500px] overflow-y-auto px-4 mb-4 bg-gray-200 border-2 rounded-lg">
            {messages.map((message, index) => (
              <Message
                key={index}
                sender={message.sender}
                message={message.content}
                isOwnMessage={message.sender === userName}
              />
            ))}
          </div>
          <ChatForm onSendMessage={handleSendMessage} />
        </div>
      )}
    </div>
  );
}
