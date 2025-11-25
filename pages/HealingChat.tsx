import React, { useState, useRef, useEffect } from 'react';
import { chatWithAdvisor } from '../services/geminiService';
import { ChatMessage, LoadingState } from '../types';
import { Send, User, Sparkles, RefreshCw } from 'lucide-react';

const HealingChat: React.FC = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'welcome',
            role: 'model',
            text: '안녕하세요! 건강하고 행복한 하루를 응원하는 AI 상담사입니다. 무엇이 궁금하신가요? (예: "소화가 잘 되는 음식을 알려줘", "잠이 잘 오는 차는 뭐야?")',
            timestamp: Date.now()
        }
    ]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            text: input,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        // Format history for API
        const history = messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));

        const responseText = await chatWithAdvisor(userMsg.text, history);

        const modelMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: responseText,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, modelMsg]);
        setLoading(false);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-5rem)] bg-offWhite">
            {/* Header Area */}
            <div className="bg-white shadow-sm p-4 border-b border-gray-100 flex items-center justify-center">
                <Sparkles className="text-accent w-6 h-6 mr-2" />
                <h1 className="text-xl font-bold text-gray-800 font-serif">건강 상담소</h1>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex items-start space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-gray-200' : 'bg-primary'}`}>
                            {msg.role === 'user' ? (
                                <User className="text-gray-600 w-6 h-6" />
                            ) : (
                                <Sparkles className="text-white w-6 h-6" />
                            )}
                        </div>
                        <div
                            className={`max-w-[80%] lg:max-w-[60%] p-5 rounded-2xl text-lg leading-relaxed shadow-sm ${
                                msg.role === 'user'
                                    ? 'bg-white text-gray-800 rounded-tr-none'
                                    : 'bg-white border-2 border-secondary text-gray-800 rounded-tl-none'
                            }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                            <RefreshCw className="text-white w-5 h-5 animate-spin" />
                        </div>
                        <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm text-gray-500">
                            답변을 생각하고 있습니다...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white p-4 border-t border-gray-200">
                <div className="max-w-4xl mx-auto flex items-center gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="궁금한 내용을 입력하세요..."
                        className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 text-lg rounded-full focus:ring-primary focus:border-primary block w-full p-4 pl-6 outline-none transition"
                        disabled={loading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={loading || !input.trim()}
                        className="p-4 rounded-full bg-accent hover:bg-opacity-90 text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition transform active:scale-95"
                    >
                        <Send className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HealingChat;