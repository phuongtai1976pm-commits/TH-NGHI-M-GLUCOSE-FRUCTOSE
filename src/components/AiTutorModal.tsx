import React, { useState } from 'react';
import { ChatMessage } from '../types';
import { Bot, Send, X, User, Sparkles, Loader2, HelpCircle } from 'lucide-react';

interface AiTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextInfo?: string;
}

export const AiTutorModal: React.FC<AiTutorModalProps> = ({ isOpen, onClose, contextInfo }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Chào em! Thầy là Trợ Lý AI Hóa Học 12. Em có thắc mắc gì về Glucose, Fructose hay các phản ứng thí nghiệm không? Hãy hỏi thầy nhé!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    'Tại sao Fructose không có nhóm -CHO mà vẫn tráng bạc được?',
    'Làm thế nào phân biệt Glucose và Fructose bằng phương pháp hóa học?',
    'Giải thích vì sao Glucose hòa tan Cu(OH)2 ở nhiệt độ thường?',
    'Viết phương trình phản ứng lên men Glucose?'
  ];

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!questionText) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: textToSend,
          context: contextInfo || 'Phòng thí nghiệm Glucose và Fructose Hóa học 12'
        })
      });

      const data = await res.json();
      const aiReply = data.answer || 'Giáo viên AI chưa thể trả lời ngay lúc này.';

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: 'Rất tiếc, đã xảy ra lỗi kết nối với Trợ lý AI Hóa Học. Vui lòng kiểm tra lại kết nối mạng hoặc thử lại sau.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-2xl h-[85vh] flex flex-col shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-indigo-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-700 flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Trợ Lý AI Hóa Học 12</h3>
              <p className="text-[11px] text-indigo-200">Giải đáp thắc mắc bài Carbohydrate (Glucose & Fructose)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-indigo-200 hover:text-white hover:bg-indigo-800 rounded-lg transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2.5 bg-slate-50 border-b border-slate-200 overflow-x-auto flex space-x-2 no-scrollbar">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp)}
              className="px-2.5 py-1 bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-900 rounded-full text-[10px] whitespace-nowrap transition border border-slate-200 font-medium shadow-2xs cursor-pointer"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 no-scrollbar bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-2.5 ${
                msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-indigo-900 text-white'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-indigo-700 text-white rounded-tr-none shadow-xs'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none whitespace-pre-wrap shadow-2xs'
                }`}
              >
                <p className="font-normal">{msg.text}</p>
                <span className="text-[9px] opacity-70 block mt-1 text-right">{msg.timestamp}</span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-2 text-xs text-indigo-800 bg-white p-3 rounded-xl w-max border border-slate-200 shadow-2xs">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
              <span className="font-medium">Thầy AI đang suy nghĩ câu trả lời...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Hỏi thầy AI bất kì điều gì về Glucose và Fructose..."
            className="flex-1 bg-slate-50 border border-slate-200 text-slate-800 px-3.5 py-2 rounded-lg text-xs focus:outline-none focus:border-indigo-500 transition"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="p-2.5 bg-indigo-700 hover:bg-indigo-800 disabled:opacity-40 text-white rounded-lg shadow-xs transition cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

