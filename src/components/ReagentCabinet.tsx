import React from 'react';
import { Reagent, ExperimentDefinition } from '../types';
import { REAGENTS, EXPERIMENTS } from '../data/chemistryData';
import { Droplet, Sparkles, Beaker, PlayCircle, Info } from 'lucide-react';

interface ReagentCabinetProps {
  onAddReagent: (reagentId: string) => void;
  activeExperimentId?: string;
  onSelectPresetExperiment: (exp: ExperimentDefinition) => void;
  currentStepIndex: number;
}

export const ReagentCabinet: React.FC<ReagentCabinetProps> = ({
  onAddReagent,
  activeExperimentId,
  onSelectPresetExperiment,
  currentStepIndex
}) => {
  const activeExp = EXPERIMENTS.find(e => e.id === activeExperimentId);
  const currentStep = activeExp?.steps[currentStepIndex];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col h-full space-y-4">
      {/* Header preset experiments */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Thí Nghiệm Mẫu SGK 12
            </h2>
          </div>
          <span className="text-[10px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200 font-semibold">
            5 Bài chuẩn
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {EXPERIMENTS.map((exp, idx) => {
            const isSelected = activeExperimentId === exp.id;
            return (
              <button
                key={exp.id}
                onClick={() => onSelectPresetExperiment(exp)}
                className={`text-left p-2.5 rounded-lg border transition flex items-start space-x-2.5 relative overflow-hidden group cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-50/90 border-2 border-indigo-500 text-indigo-900 shadow-xs'
                    : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100/80 hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700 group-hover:bg-slate-300'
                  }`}
                >
                  {idx + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold truncate text-slate-800">{exp.title.split(':')[1] || exp.title}</p>
                    <span className="text-[9px] font-bold text-indigo-600 bg-indigo-100/80 px-1.5 py-0.2 rounded border border-indigo-200">
                      {exp.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">{exp.subTitle}</p>
                </div>
                {isSelected && (
                  <PlayCircle className="w-4 h-4 text-indigo-600 shrink-0 self-center" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* Reagent Cabinet / Shelf */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Beaker className="w-4 h-4 text-indigo-600" />
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Khu Vực Hóa Chất
            </h2>
          </div>
          <span className="text-[10px] text-slate-400">Nhấp để thêm vào ống nghiệm</span>
        </div>

        {/* Current step hint if active experiment */}
        {currentStep && currentStep.requiredReagentId && (
          <div className="mb-3 p-2.5 bg-indigo-50 border border-indigo-200 rounded-lg text-xs text-indigo-900 flex items-center space-x-2">
            <Info className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="line-clamp-2">
              <strong className="text-indigo-950">Bước {currentStep.stepNumber}:</strong> {currentStep.instruction}
            </span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 overflow-y-auto pr-1 flex-1 no-scrollbar">
          {REAGENTS.map((reagent) => {
            const isNextNeeded = currentStep?.requiredReagentId === reagent.id;
            return (
              <button
                key={reagent.id}
                onClick={() => onAddReagent(reagent.id)}
                className={`p-2.5 rounded-lg border text-left transition-all flex flex-col justify-between group relative overflow-hidden cursor-pointer ${
                  isNextNeeded
                    ? 'bg-amber-50 border-2 border-amber-500 text-amber-950 shadow-xs ring-2 ring-amber-200 animate-bounce-subtle'
                    : 'bg-white border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 text-slate-700 shadow-xs'
                }`}
              >
                {/* Visual bottle color indicator */}
                <div className="flex items-center justify-between w-full mb-1">
                  <div className="flex items-center space-x-1.5 min-w-0">
                    <div
                      className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-inner shrink-0"
                      style={{ backgroundColor: reagent.color }}
                    />
                    <span className="text-xs font-extrabold text-indigo-950 truncate">
                      {reagent.name}
                    </span>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200 shrink-0">
                    {reagent.concentration}
                  </span>
                </div>

                <p className="text-[11px] font-mono font-bold text-slate-600">
                  {reagent.formula}
                </p>

                <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 font-normal">
                  {reagent.description}
                </p>

                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 group-hover:text-indigo-600 font-medium">
                  <span className="flex items-center space-x-1">
                    <Droplet className="w-3 h-3 text-indigo-500" />
                    <span>+ 1 mL</span>
                  </span>
                  {isNextNeeded && (
                    <span className="text-amber-700 font-bold animate-pulse">Thêm ngay</span>
                  )}
                </div>

                {isNextNeeded && (
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-amber-500 rounded-bl-full shadow-xs" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

