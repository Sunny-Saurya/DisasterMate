import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User, Trash2, Sparkles, AlertCircle } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';

const DisasterChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '👋 Hello! I\'m DisasterMate AI, your emergency assistance companion. I can help you with:\n\n• Emergency procedures (earthquakes, floods, fires)\n• First aid guidance\n• Disaster preparedness tips\n• Evacuation planning\n• Safety instructions\n\nHow can I help you stay safe today?',
            timestamp: new Date().toISOString()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            fetchSuggestions();
            inputRef.current?.focus();
        }
    }, [isOpen]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const fetchSuggestions = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/chatbot/suggestions`);
            const data = await response.json();
            if (data.success) {
                setSuggestions(data.data.slice(0, 4));
            }
        } catch (error) {
            console.error('Failed to fetch suggestions:', error);
        }
    };

    const sendMessage = async (text) => {
        if (!text.trim()) return;

        const userMessage = {
            role: 'user',
            content: text,
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/chatbot/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: text,
                    sessionId: sessionId
                })
            });

            const data = await response.json();

            if (data.success) {
                setSessionId(data.data.sessionId);
                const assistantMessage = {
                    role: 'assistant',
                    content: data.data.response,
                    timestamp: data.data.timestamp
                };
                setMessages(prev => [...prev, assistantMessage]);
            } else {
                throw new Error(data.message || 'Failed to get response');
            }
        } catch (error) {
            console.error('Chatbot error:', error);
            const errorMessage = {
                role: 'assistant',
                content: '⚠️ Sorry, I encountered an error. Please try again or check your connection.',
                timestamp: new Date().toISOString(),
                isError: true
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(inputMessage);
    };

    const handleSuggestionClick = (suggestion) => {
        sendMessage(suggestion);
    };

    const clearChat = async () => {
        try {
            await fetch(`${API_BASE_URL}/chatbot/clear`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sessionId })
            });
        } catch (error) {
            console.error('Failed to clear chat:', error);
        }

        setMessages([
            {
                role: 'assistant',
                content: '👋 Chat cleared! How can I help you with disaster preparedness or emergency procedures?',
                timestamp: new Date().toISOString()
            }
        ]);
        setSessionId(null);
    };

    return (
        <>
            {/* Floating Chat Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 group"
                    aria-label="Open DisasterMate AI Chat"
                >
                    <div className="relative">
                        {/* Pulse animation */}
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-ping opacity-75"></div>
                        
                        {/* Main button */}
                        <div className="relative bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-110">
                            <Bot className="w-7 h-7" />
                        </div>

                        {/* Sparkle effect */}
                        <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-pulse" />
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        DisasterMate AI Assistant
                    </div>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Bot className="w-8 h-8" />
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">DisasterMate AI</h3>
                                <p className="text-xs text-red-100">Emergency Assistant</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={clearChat}
                                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                aria-label="Clear chat"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                aria-label="Close chat"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                            >
                                {/* Avatar */}
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                    message.role === 'user' 
                                        ? 'bg-blue-500' 
                                        : message.isError 
                                        ? 'bg-red-500' 
                                        : 'bg-gradient-to-br from-red-500 to-orange-500'
                                }`}>
                                    {message.role === 'user' ? (
                                        <User className="w-5 h-5 text-white" />
                                    ) : message.isError ? (
                                        <AlertCircle className="w-5 h-5 text-white" />
                                    ) : (
                                        <Bot className="w-5 h-5 text-white" />
                                    )}
                                </div>

                                {/* Message bubble */}
                                <div
                                    className={`flex-1 px-4 py-3 rounded-2xl ${
                                        message.role === 'user'
                                            ? 'bg-blue-500 text-white rounded-tr-none'
                                            : message.isError
                                            ? 'bg-red-50 text-red-900 rounded-tl-none border border-red-200'
                                            : 'bg-white text-gray-800 rounded-tl-none shadow-sm border border-gray-100'
                                    }`}
                                >
                                    <div className="text-sm whitespace-pre-wrap leading-relaxed">
                                        {message.content}
                                    </div>
                                    <div className={`text-xs mt-2 ${
                                        message.role === 'user' 
                                            ? 'text-blue-100' 
                                            : message.isError
                                            ? 'text-red-400'
                                            : 'text-gray-400'
                                    }`}>
                                        {new Date(message.timestamp).toLocaleTimeString('en-US', { 
                                            hour: '2-digit', 
                                            minute: '2-digit' 
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Loading indicator */}
                        {isLoading && (
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Suggestions (show only if no messages or after initial message) */}
                        {messages.length <= 1 && suggestions.length > 0 && (
                            <div className="space-y-2 pt-2">
                                <p className="text-xs text-gray-500 font-medium">Suggested questions:</p>
                                {suggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="w-full text-left px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:border-red-300 transition-colors"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="border-t border-gray-200 p-4 bg-white">
                        <form onSubmit={handleSubmit} className="flex gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Ask about emergencies, first aid..."
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !inputMessage.trim()}
                                className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Send message"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default DisasterChatbot;
