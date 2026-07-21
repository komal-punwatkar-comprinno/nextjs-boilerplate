"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import {
  Button,
  Card,
  Badge,
  Avatar,
  Input,
  Icon,
} from "@/components";
import { useSearch } from "@/hooks";

// --- Types ---

interface Message {
  id: string;
  text: string;
  sender: "me" | "them";
  time: string;
}

interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
}

// --- Mock Data ---

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    name: "Alice Martin",
    lastMessage: "Sounds good! Let me check the design files.",
    time: "2m ago",
    unread: 3,
    online: true,
    messages: [
      { id: "1a", text: "Hey! How's the redesign going?", sender: "them", time: "10:30 AM" },
      { id: "1b", text: "Pretty well! Just finishing up the homepage.", sender: "me", time: "10:32 AM" },
      { id: "1c", text: "Can you share the Figma link?", sender: "them", time: "10:33 AM" },
      { id: "1d", text: "Sure, I'll send it over in a sec.", sender: "me", time: "10:34 AM" },
      { id: "1e", text: "Sounds good! Let me check the design files.", sender: "them", time: "10:35 AM" },
    ],
  },
  {
    id: "2",
    name: "Bob Chen",
    lastMessage: "The PR is ready for review when you get a chance.",
    time: "15m ago",
    unread: 1,
    online: true,
    messages: [
      { id: "2a", text: "I pushed the auth changes to the feature branch.", sender: "them", time: "9:45 AM" },
      { id: "2b", text: "Nice, I'll take a look this afternoon.", sender: "me", time: "9:50 AM" },
      { id: "2c", text: "No rush, just wanted to let you know.", sender: "them", time: "9:51 AM" },
      { id: "2d", text: "The PR is ready for review when you get a chance.", sender: "them", time: "10:20 AM" },
    ],
  },
  {
    id: "3",
    name: "Carol Davis",
    lastMessage: "Meeting moved to 3 PM tomorrow.",
    time: "1h ago",
    unread: 0,
    online: false,
    messages: [
      { id: "3a", text: "Hey, quick update on the sprint planning.", sender: "them", time: "8:00 AM" },
      { id: "3b", text: "What's up?", sender: "me", time: "8:05 AM" },
      { id: "3c", text: "Meeting moved to 3 PM tomorrow.", sender: "them", time: "8:06 AM" },
      { id: "3d", text: "Got it, thanks for the heads up!", sender: "me", time: "8:10 AM" },
    ],
  },
  {
    id: "4",
    name: "David Kim",
    lastMessage: "Let's sync up on the database schema later.",
    time: "3h ago",
    unread: 0,
    online: true,
    messages: [
      { id: "4a", text: "Did you see the new DB requirements?", sender: "them", time: "7:00 AM" },
      { id: "4b", text: "Yes, I have some questions about the relations.", sender: "me", time: "7:15 AM" },
      { id: "4c", text: "Let's sync up on the database schema later.", sender: "them", time: "7:20 AM" },
      { id: "4d", text: "Works for me. After lunch?", sender: "me", time: "7:22 AM" },
      { id: "4e", text: "Perfect, talk then.", sender: "them", time: "7:25 AM" },
    ],
  },
  {
    id: "5",
    name: "Eva Torres",
    lastMessage: "The client approved the mockups! 🎉",
    time: "5h ago",
    unread: 2,
    online: false,
    messages: [
      { id: "5a", text: "Just got off the call with the client.", sender: "them", time: "6:00 AM" },
      { id: "5b", text: "How did it go?", sender: "me", time: "6:05 AM" },
      { id: "5c", text: "They loved everything!", sender: "them", time: "6:06 AM" },
      { id: "5d", text: "The client approved the mockups! 🎉", sender: "them", time: "6:07 AM" },
    ],
  },
  {
    id: "6",
    name: "Frank Lee",
    lastMessage: "I'll deploy to staging tonight.",
    time: "1d ago",
    unread: 0,
    online: false,
    messages: [
      { id: "6a", text: "Staging server is ready for the new build.", sender: "them", time: "Yesterday" },
      { id: "6b", text: "Great. Any downtime expected?", sender: "me", time: "Yesterday" },
      { id: "6c", text: "Nope, zero-downtime deploy.", sender: "them", time: "Yesterday" },
      { id: "6d", text: "I'll deploy to staging tonight.", sender: "them", time: "Yesterday" },
    ],
  },
];

export default function MessagesPage() {
  const { query, setQuery } = useSearch();
  const [activeConversationId, setActiveConversationId] = useState(MOCK_CONVERSATIONS[0]!.id);
  const [messageInput, setMessageInput] = useState("");
  const [conversationsState, setConversationsState] = useState(MOCK_CONVERSATIONS);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter conversations by search
  const filteredConversations = useMemo(() => {
    if (!query) return conversationsState;
    return conversationsState.filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.lastMessage.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, conversationsState]);

  // Active conversation
  const activeConversation = conversationsState.find((c) => c.id === activeConversationId);

  // Scroll to bottom of messages when they change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages.length]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !activeConversation) return;

    const newMessage: Message = {
      id: `${activeConversation.id}-${Date.now()}`,
      text: messageInput.trim(),
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setConversationsState((prev) =>
      prev.map((c) =>
        c.id === activeConversationId
          ? { ...c, messages: [...c.messages, newMessage], lastMessage: newMessage.text, time: "Just now" }
          : c
      )
    );
    setMessageInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-[calc(100vh-10rem)] gap-4">
      {/* Left Panel — Conversation List */}
      <Card className="flex w-80 shrink-0 flex-col overflow-hidden">
        <Card.Header>
          <Input
            placeholder="Search conversations..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            leftAddon={<Icon name="search" size="sm" />}
          />
        </Card.Header>
        <Card.Body className="flex-1 overflow-y-auto !p-0">
          <div className="divide-y divide-zinc-100 dark:divide-[#2D3640]">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                type="button"
                onClick={() => setActiveConversationId(conversation.id)}
                className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-[#2A3441] ${
                  conversation.id === activeConversationId
                    ? "bg-zinc-50 dark:bg-[#2A3441]"
                    : ""
                }`}
              >
                <div className="relative shrink-0">
                  <Avatar name={conversation.name} size="sm" />
                  {conversation.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-[#242B33]" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-900 dark:text-[#E8EDF2]">
                      {conversation.name}
                    </span>
                    <span className="text-xs text-zinc-400 dark:text-[#9FAEC1]">
                      {conversation.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className="truncate text-xs text-zinc-500 dark:text-[#9FAEC1]">
                      {conversation.lastMessage}
                    </p>
                    {conversation.unread > 0 && (
                      <Badge variant="danger" className="ml-2 shrink-0">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </button>
            ))}
            {filteredConversations.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-zinc-500 dark:text-[#9FAEC1]">
                No conversations found.
              </div>
            )}
          </div>
        </Card.Body>
      </Card>

      {/* Right Panel — Chat Area */}
      <Card className="flex flex-1 flex-col overflow-hidden">
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <Card.Header className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar name={activeConversation.name} size="sm" />
                  {activeConversation.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-[#242B33]" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-[#E8EDF2]">
                    {activeConversation.name}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-[#9FAEC1]">
                    {activeConversation.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
            </Card.Header>

            {/* Messages Area */}
            <Card.Body className="flex-1 overflow-y-auto space-y-3">
              {activeConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                      message.sender === "me"
                        ? "bg-zinc-900 text-white dark:bg-[#4CCBBF] dark:text-[#1F2937]"
                        : "bg-zinc-100 text-zinc-900 dark:bg-[#2D3640] dark:text-[#E8EDF2]"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`mt-1 text-[10px] ${
                        message.sender === "me"
                          ? "text-zinc-300 dark:text-[#1F2937]/60"
                          : "text-zinc-400 dark:text-[#9FAEC1]"
                      }`}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </Card.Body>

            {/* Message Input */}
            <Card.Footer className="flex items-center gap-2">
              <div className="flex-1">
                <Input
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                leftIcon={<Icon name="paper-airplane" size="sm" />}
                size="md"
              >
                Send
              </Button>
            </Card.Footer>
          </>
        ) : (
          <Card.Body className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <Icon name="chat-bubble-left" size="xl" className="mx-auto text-zinc-300 dark:text-[#9FAEC1]" />
              <p className="mt-2 text-sm text-zinc-500 dark:text-[#9FAEC1]">
                Select a conversation to start chatting
              </p>
            </div>
          </Card.Body>
        )}
      </Card>
    </div>
  );
}
