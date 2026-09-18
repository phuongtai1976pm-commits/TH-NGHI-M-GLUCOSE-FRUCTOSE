import React from 'react';
import { TabType } from '../types';
import { Beaker, Atom, BookOpen, CheckSquare, Sparkles, Bot, HelpCircle, Volume2, VolumeX } from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  openAiTutor: () => void;
  openGuide: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openAiTutor,
  openGuide,
  soundEnabled,
  setSoundEnabled
}) => {
  const tabs = [
    { id: 'workbench', label: 'Thí Nghiệm Ảo', icon: Beaker },
    { id: 'molecules', label: 'Cấu Tạo Phân Tử', icon: Atom },
    { id: 'theory', label: 'Lý Thuyết & Phản Ứng', icon: BookOpen },
    { id: 'quiz', label: 'Luyện Tập Trắc Nghiệm', icon: CheckSquare },
    { id: 'applications', label: 'Ứng Dụng Thực Tế', icon: Sparkles },
  ];

  return (
    <header className="bg-indigo-900 text-white shadow-md border-b border-indigo-950 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg border border-white/30 shadow-inner flex items-center justify-center">
              <Beaker className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-bold text-base sm:text-lg text-white tracking-wide uppercase leading-none">
                  LABO ẢO: CARBOHYDRATE
                </h1>
                <span className="bg-indigo-800 text-indigo-100 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-indigo-700/60 hidden sm:inline-block">
                  GDPT 2018
                </span>
              </div>
              <p className="text-xs text-indigo-200 mt-1">
                Chương trình Hóa học 12 — Bài 4: Glucose & Fructose
              </p>
            </div>
          </div>

          {/* Action buttons right */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 sm:p-2 text-indigo-200 hover:text-white bg-indigo-800/80 hover:bg-indigo-800 rounded-full transition"
              title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-300" /> : <VolumeX className="w-4 h-4 text-indigo-400" />}
            </button>

            <button
              onClick={openGuide}
              className="bg-indigo-700 hover:bg-indigo-800 text-white px-3.5 py-1.5 rounded-full text-xs font-medium transition shadow-sm flex items-center space-x-1.5"
              title="Hướng dẫn sử dụng"
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-200" />
              <span className="hidden sm:inline">Hướng dẫn</span>
            </button>

            <button
              onClick={openAiTutor}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1.5 rounded-full text-xs font-bold transition shadow-sm flex items-center space-x-1.5 active:scale-95"
            >
              <Bot className="w-4 h-4" />
              <span>TRỢ LÝ AI HÓA 12</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 overflow-x-auto py-2 no-scrollbar border-t border-indigo-800/60">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-white text-indigo-900 font-bold shadow-sm'
                    : 'text-indigo-200 hover:text-white hover:bg-indigo-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-900' : 'text-indigo-300'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

