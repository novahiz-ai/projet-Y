
import React from 'react';
import ChatMessage from './ChatMessage';
import ChatLoadingIndicator from './ChatLoadingIndicator';

interface Message {
  text: string;
  isAssistant: boolean;
  time: string;
}

interface ChatMessageListProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages, isLoading, messagesEndRef }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
      {messages.map((msg, idx) => (
        <ChatMessage key={idx} msg={msg} />
      ))}
      {isLoading && <ChatLoadingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessageList;
