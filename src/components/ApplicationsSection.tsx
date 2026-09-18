import React from 'react';
import { APPLICATIONS } from '../data/chemistryData';
import { Activity, Utensils, Sparkles, Zap, HeartPulse, CheckCircle2 } from 'lucide-react';

export const ApplicationsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-5 h-5 text-emerald-600" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-amber-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-indigo-600" />;
      case 'Zap': return <Zap className="w-5 h-5 text-indigo-600" />;
      default: return <HeartPulse className="w-5 h-5 text-indigo-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>Trạng Thái Tự Nhiên & Ứng Dụng Đời Sống (SGK Trang 24)</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1 max-w-3xl">
          Glucose có nhiều trong quả chín (đặc biệt quả nho - gọi là đường nho), mật ong, máu người (0.1%). Fructose có nhiều trong trái cây (táo, lựu, lê) và mật ong (chiếm 40%).
        </p>
      </div>

      {/* Applications Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {APPLICATIONS.map((app, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 hover:border-indigo-300 rounded-xl p-5 shadow-sm transition-all flex items-start space-x-4"
          >
            <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100 shrink-0">
              {getIcon(app.icon)}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 mb-1">{app.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{app.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Box */}
      <div className="bg-slate-900 text-white rounded-xl p-6 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-indigo-300 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Sơ Đồ Tóm Tắt Ứng Dụng Hóa 12</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <span className="font-bold text-indigo-300 block">Dịch Truyền 5%</span>
            <span className="text-[10px] text-slate-300 mt-0.5 block">Tĩnh mạch giải độc</span>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <span className="font-bold text-amber-300 block">Tráng Ruột Phích</span>
            <span className="text-[10px] text-slate-300 mt-0.5 block">Phản ứng tráng gương</span>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <span className="font-bold text-emerald-300 block">Sản Xuất Rượu/Cồn</span>
            <span className="text-[10px] text-slate-300 mt-0.5 block">Lên men Glucose</span>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <span className="font-bold text-indigo-200 block">Thực Phẩm & Bánh Kẹo</span>
            <span className="text-[10px] text-slate-300 mt-0.5 block">Đường ăn, mứt ngọt</span>
          </div>
        </div>
      </div>
    </div>
  );
};

