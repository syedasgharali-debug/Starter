import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { translations } from '../translations/translations';
import { MessageSquare, X, Send, Bot, User, CheckCircle2 } from 'lucide-react';

interface KlaraChatbotProps {
  currentLang: Language;
  onRequestQuote: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

export const KlaraChatbot: React.FC<KlaraChatbotProps> = ({ currentLang, onRequestQuote }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[currentLang];
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial welcome message
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: t.chatWelcome,
      },
    ]);
  }, [currentLang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          language: currentLang,
          history: [...messages, userMsg],
        }),
      });

      const data = await response.json();
      const botReply = data.reply || t.chatWelcome;

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: botReply,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Entschuldigung, es gab ein Verbindungsproblem. Sie können uns auch direkt telefonisch unter 044 589 72 88 erreichen.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.includes('@')) {
      setEmailSent(true);
      setTimeout(() => {
        setEmailSent(false);
        setEmailInput('');
      }, 4000);
    }
  };

  const chips = [t.chatChip1, t.chatChip2, t.chatChip3, t.chatChip4, t.chatChip5];

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-tr from-[#245f49] via-[#2f815f] to-[#3d9970] text-white shadow-2xl hover:scale-105 transition-all flex items-center justify-center group ring-4 ring-[#3d9970]/20"
        aria-label="Toggle Klara AI Assistant"
      >
        {isOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <div className="relative flex items-center justify-center">
            <MessageSquare className="w-7 h-7 group-hover:rotate-6 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#df6029] rounded-full border-2 border-white animate-pulse" />
          </div>
        )}
      </button>

      {/* Floating Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[360px] sm:w-[400px] max-w-[calc(100vw-32px)] h-[560px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#08271e] via-[#123d2e] to-[#08271e] text-white p-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-[#3d9970] text-white flex items-center justify-center font-bold text-lg border-2 border-white/40 shadow-inner">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#08271e]" />
              </div>
              <div>
                <strong className="block text-base font-bold">{t.chatTitle}</strong>
                <span className="text-xs text-[#a8cfbd] font-medium block">{t.chatSub}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 bg-[#f7f8f9] space-y-3.5 text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-[#245f49] text-white flex items-center justify-center flex-shrink-0 text-xs mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#245f49] text-white rounded-br-none'
                      : 'bg-white border border-gray-200 text-[#142032] rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-[#142032] text-white flex items-center justify-center flex-shrink-0 text-xs mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 justify-start items-center text-xs text-gray-500 italic">
                <div className="w-7 h-7 rounded-full bg-[#245f49] text-white flex items-center justify-center">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <span>Klara antwortet...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 bg-gray-50 border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {chips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (chip === t.chatChip5) {
                    onRequestQuote();
                  } else {
                    handleSendMessage(chip);
                  }
                }}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-[#eef8f3] hover:bg-[#d5ebe0] text-[#2d5c46] text-xs font-semibold border border-[#cfe3d8] transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Email Lead Capture */}
          <div className="px-3.5 py-2 bg-[#eef8f3] border-t border-[#d6ebe1]">
            {emailSent ? (
              <div className="flex items-center gap-2 text-xs text-[#2d7d5d] font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{t.chatEmailSuccess}</span>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="flex items-center gap-2">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="E-Mail für Rückmeldung"
                  className="flex-1 px-2.5 py-1.5 rounded-lg border border-gray-300 text-xs bg-white"
                  required
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-[#3d9970] hover:bg-[#2f8a68] text-white text-xs font-bold transition-colors"
                >
                  {t.chatEmailSubmit}
                </button>
              </form>
            )}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-gray-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.chatPlaceholder}
              className="flex-1 px-3.5 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#3d9970]"
            />
            <button
              type="submit"
              disabled={loading || !inputText.trim()}
              className="p-2.5 rounded-xl bg-[#245f49] hover:bg-[#1a4a38] text-white disabled:opacity-40 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
