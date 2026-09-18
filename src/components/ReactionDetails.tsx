import React from 'react';
import { TestTubeContent } from '../types';
import { EXPERIMENTS } from '../data/chemistryData';
import { FileText, Eye, Lightbulb, BookOpen, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface ReactionDetailsProps {
  tubeContent: TestTubeContent;
  activeExperimentId?: string;
}

export const ReactionDetails: React.FC<ReactionDetailsProps> = ({
  tubeContent,
  activeExperimentId
}) => {
  const activeExp = EXPERIMENTS.find(e => e.id === activeExperimentId);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm space-y-4 h-full overflow-y-auto no-scrollbar">
      {/* Header Title */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-indigo-600" />
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Giải Thích & Phương Trình Hóa Học
          </h2>
        </div>
        {activeExp && (
          <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
            {activeExp.badge}
          </span>
        )}
      </div>

      {activeExp ? (
        <div className="space-y-4 text-xs text-slate-700">
          {/* Observation Section */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
            <div className="flex items-center space-x-2 text-indigo-900 font-bold mb-1.5">
              <Eye className="w-4 h-4 text-indigo-600" />
              <span>Hiện Tượng Quan Sát Thí Nghiệm</span>
            </div>
            <p className="text-slate-700 leading-relaxed font-normal">
              {activeExp.phenomenon}
            </p>
          </div>

          {/* Chemical Explanation */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
            <div className="flex items-center space-x-2 text-indigo-900 font-bold mb-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Giải Thích Bản Chất Hóa Học</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {activeExp.chemicalExplanation}
            </p>
          </div>

          {/* Chemical Equations Callout */}
          <div className="bg-indigo-50/90 p-3.5 rounded-lg border-l-4 border-indigo-500 shadow-xs space-y-2">
            <div className="flex items-center space-x-2 text-indigo-950 font-bold">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Phương Trình Hóa Học Minh Họa</span>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-indigo-200 font-mono text-indigo-950 overflow-x-auto text-[11px] leading-relaxed shadow-2xs">
              <p className="font-semibold text-slate-500 text-[9px] mb-1 uppercase tracking-wider">Phương trình dạng nhóm chức:</p>
              {activeExp.chemicalEquation}
            </div>

            <div className="bg-white/80 p-2 rounded-lg border border-indigo-200 font-mono text-indigo-900 text-[11px]">
              <p className="font-semibold text-slate-500 text-[9px] mb-1 uppercase tracking-wider">Dạng tóm tắt gọn:</p>
              {activeExp.simplifiedEquation}
            </div>
          </div>

          {/* Distinguishing Note Callout */}
          {activeExp.distinguishingNote && (
            <div className="bg-amber-50/90 p-3.5 rounded-lg border-l-4 border-amber-500 shadow-xs text-amber-950">
              <div className="flex items-center space-x-2 font-bold mb-1 text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Lưu Ý Trọng Tâm Lớp 12 & THPT Quốc Gia</span>
              </div>
              <p className="leading-relaxed text-xs text-amber-900 font-medium">
                {activeExp.distinguishingNote}
              </p>
            </div>
          )}

          {/* Summary Box matching theme */}
          <div className="bg-slate-900 text-white rounded-lg p-3.5 shadow-sm space-y-1">
            <p className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ghi Nhớ Trọng Tâm Carbohydrate:</span>
            </p>
            <p className="text-xs text-slate-200 leading-relaxed font-normal">
              • Glucose & Fructose là monosaccharide tiêu biểu.<br />
              • Phân biệt bằng nước Bromine: Glucose làm mất màu nước Bromine, Fructose thì không!
            </p>
          </div>
        </div>
      ) : (
        <div className="py-8 text-center text-slate-400 text-xs">
          <p>Hãy chọn một thí nghiệm mẫu hoặc thêm hóa chất vào ống nghiệm để xem giải thích phản ứng chi tiết.</p>
        </div>
      )}
    </div>
  );
};

