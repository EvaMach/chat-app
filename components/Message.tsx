import React from 'react';

interface Props {
  sender: string;
  message: string;
  isOwnMessage: boolean;
}

const Message = ({ sender, message, isOwnMessage }: Props) => {
  const isSystemMessage = sender === 'system';

  const alignMessage = (): string => {
    if (isSystemMessage) {
      return 'justify-center';
    } if (isOwnMessage) {
      return 'justify-end';
    }
    return 'justify-start';
  };

  const colorMessage = (): string => {
    if (isSystemMessage) {
      return 'bg-gray-800 text-white text-center text-xs';
    } if (isOwnMessage) {
      return 'bg-blue-500 text-white';
    }
    return 'bg-white text-black';
  };

  return (
    <div className={`flex ${alignMessage()} mb-3`}>
      <div className={`max-w-xs px-4 py-2 ${colorMessage()} rounded-lg`}>
        {!isSystemMessage && <p className='text-sm font-bold'>{sender}</p>}
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;