"use client";

import React, { useState } from 'react';

interface Props {
  onSendMessage: (message: string) => void;
}

const ChatForm = ({ onSendMessage }: Props) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex gap-2 mt-4'>
      <input
        type="text"
        className="flex-1 px-4 border-2 py-2 rounded-lg focus:outline-none"
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message" />
      <button type="submit" className='px-4 py-2 bg-blue-500 text-white rounded-lg'>Send</button>
    </form>
  );
};

export default ChatForm;