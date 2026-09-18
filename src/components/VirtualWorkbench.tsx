import React, { useState } from 'react';
import { TestTubeContent, ExperimentDefinition } from '../types';
import { REAGENTS } from '../data/chemistryData';
import { Flame, Waves, RefreshCw, Sparkles, Thermometer, CheckCircle2, FlaskConical } from 'lucide-react';

interface VirtualWorkbenchProps {
  tube1: TestTubeContent;
  tube2: TestTubeContent;
  targetTube: 'tube1' | 'tube2' | 'both';
  onSelectTargetTube: (target: 'tube1' | 'tube2' | 'both') => void;
  activeExperiment?: ExperimentDefinition;
  onShakeTube: () => void;
  onToggleBurner: () => void;
  onToggleWaterBath: () => void;
  onResetTube: () => void;
  soundEnabled: boolean;
  onAddReagent: (id: string) => void;
}

export const VirtualWorkbench: React.FC<VirtualWorkbenchProps> = ({
  tube1,
  tube2,
  targetTube,
  onSelectTargetTube,
  activeExperiment,
  onShakeTube,
  onToggleBurner,
  onToggleWaterBath,
  onResetTube,
  onAddReagent
}) => {
  const [isShaking, setIsShaking] = useState(false);

  const handleShake = () => {
    setIsShaking(true);
    onShakeTube();
    setTimeout(() => setIsShaking(false), 800);
  };

  const currentStep = activeExperiment?.steps[tube1.currentStepIndex];
  const maxTemp = Math.max(tube1.temperatureC, tube2.temperatureC);
  const isAnyHeated = tube1.isHeated || tube2.isHeated;
  const isAnyWaterBath = tube1.isInWaterBath || tube2.isInWaterBath;

  // Render individual Glass Test Tube component
  const renderSingleTube = (tube: TestTubeContent, tubeNum: 1 | 2) => {
    const isTargeted = targetTube === (tubeNum === 1 ? 'tube1' : 'tube2') || targetTube === 'both';
    const totalVolume = tube.addedReagents.reduce((sum, r) => sum + r.volumeMl, 0);

    return (
      <div
        key={tube.id}
        onClick={() => onSelectTargetTube(tubeNum === 1 ? 'tube1' : 'tube2')}
        className={`relative flex flex-col items-center cursor-pointer group transition-all duration-300 p-2 rounded-xl ${
          isTargeted ? 'bg-indigo-50/70 ring-2 ring-indigo-500 shadow-sm' : 'hover:bg-slate-100/60'
        }`}
      >
        {/* Tube Top Target Tag */}
        <div className="mb-2 flex items-center space-x-1">
          <span
            className={`text-[11px] font-bold px-2 py-0.5 rounded-full border transition ${
              isTargeted
                ? 'bg-indigo-600 text-white border-indigo-700 shadow-2xs'
                : 'bg-white text-slate-600 border-slate-300 group-hover:border-indigo-400'
            }`}
          >
            {tube.label}
          </span>
        </div>

        {/* GLASS TEST TUBE CONTAINER */}
        <div className="relative w-16 h-64 border-x-2 border-b-2 border-slate-300/90 rounded-b-2xl bg-white/80 shadow-md overflow-hidden flex flex-col justify-end backdrop-blur-xs">
          {/* Glass Reflection Highlight */}
          <div className="absolute top-0 inset-x-0 h-2 bg-slate-200/80 rounded-t border-b border-slate-300 z-10" />
          <div className="absolute left-1 top-0 bottom-0 w-1 bg-white/70 pointer-events-none z-10" />

          {/* Silver Mirror Coating Layer (for Tollens reaction) */}
          {tube.hasSilverMirror && (
            <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-slate-200 to-slate-400 opacity-95 shadow-[inset_0_0_12px_rgba(255,255,255,0.9)] z-20 flex flex-col items-center justify-center animate-fade-in border-x border-slate-100">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent opacity-90 pointer-events-none animate-pulse" />
              <div className="text-[10px] text-slate-900 font-extrabold rotate-90 tracking-wider uppercase whitespace-nowrap bg-white/95 px-2 py-0.5 rounded shadow-xs border border-slate-300 z-10 select-none">
                ✨ Lớp Gương Bạc Ag
              </div>
            </div>
          )}

          {/* Gas Bubbles Animation (For Fermentation CO2) */}
          {tube.hasBubbles && (
            <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
              <div className="absolute bottom-6 left-3 w-3 h-3 bg-amber-200/90 border border-white/80 rounded-full animate-bounce shadow-xs" />
              <div className="absolute bottom-14 right-3 w-2.5 h-2.5 bg-amber-100/90 border border-white/80 rounded-full animate-pulse shadow-xs" />
              <div className="absolute bottom-24 left-4 w-3.5 h-3.5 bg-white/95 border border-amber-300 rounded-full animate-ping shadow-xs" />
              <div className="absolute bottom-36 right-4 w-2 h-2 bg-amber-200/90 border border-white/80 rounded-full animate-bounce shadow-xs" />
              <div className="absolute bottom-48 left-2 w-2.5 h-2.5 bg-white/90 rounded-full animate-pulse" />
              <div className="absolute top-2 right-2 bg-amber-600/90 text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow-xs uppercase tracking-wider">
                CO₂ ↑
              </div>
            </div>
          )}

          {/* LIQUID COLUMN INSIDE TEST TUBE */}
          {tube.liquidLevelPercent > 0 ? (
            <div
              className="w-full transition-all duration-700 relative overflow-hidden"
              style={{
                height: `${tube.liquidLevelPercent}%`,
                background: tube.liquidColor,
              }}
            >
              {/* Liquid Surface Meniscus Line & Wave Effect */}
              <div className="absolute top-0 inset-x-0 h-2 bg-white/50 border-t-2 border-indigo-400/80 animate-pulse shadow-xs" />

              {/* Volume Label Badge on Liquid Surface */}
              <div className="absolute top-1 left-1 bg-indigo-900/80 text-white text-[8px] font-mono px-1 rounded">
                {totalVolume} mL
              </div>

              {/* Precipitate at bottom of tube */}
              {tube.precipitate && (
                <div
                  className="absolute bottom-0 inset-x-0 h-9 border-t border-white/50 flex items-center justify-center transition-all duration-500 shadow-md z-10"
                  style={{ backgroundColor: tube.precipitate.color }}
                >
                  <span className="text-[8px] font-extrabold text-white px-1 text-center leading-tight drop-shadow-md">
                    {tube.precipitate.label}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-[9px] text-slate-400 italic">
              Trống
            </div>
          )}

          {/* Volume Measurement Graduation Lines */}
          <div className="absolute inset-y-6 right-1 flex flex-col justify-between text-[8px] text-slate-400 font-mono pointer-events-none select-none z-10">
            <span>- 10ml</span>
            <span>- 8ml</span>
            <span>- 6ml</span>
            <span>- 4ml</span>
            <span>- 2ml</span>
          </div>
        </div>

        {/* Tube Phenomenon Status Tag */}
        <div className="mt-2 text-center max-w-[120px]">
          {tube.addedReagents.length === 0 ? (
            <span className="text-[10px] text-slate-400 font-medium">Chưa có hóa chất</span>
          ) : tube.statusText.includes('MẤT MÀU') ? (
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-300 shadow-2xs block animate-pulse">
              ✨ MẤT MÀU ĐỎ NÂU
            </span>
          ) : tube.statusText.includes('GIỮ NGUYÊN') ? (
            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-300 shadow-2xs block">
              🔴 Giữ Màu Đỏ Nâu
            </span>
          ) : tube.precipitate?.type === 'brick-red' ? (
            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-300 shadow-2xs block">
              🔥 Cu₂O Đỏ Gạch
            </span>
          ) : tube.hasSilverMirror ? (
            <span className="text-[10px] font-bold text-slate-900 bg-gradient-to-r from-slate-100 via-white to-slate-200 px-2 py-0.5 rounded-full border border-slate-400 shadow-2xs block animate-pulse">
              🪞 Lớp Bạc Ag Sáng Bóng
            </span>
          ) : (tube.isHeated || tube.isInWaterBath) && (tube.heatingSeconds !== undefined && tube.heatingSeconds > 0 && !tube.hasSilverMirror) ? (
            <span className="text-[10px] font-bold text-orange-800 bg-orange-100 px-2 py-0.5 rounded-full border border-orange-300 shadow-2xs block">
              🔥 Đun nóng ({tube.heatingSeconds}s/30s)
            </span>
          ) : tube.hasBubbles ? (
            <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 shadow-2xs block animate-bounce">
              🫧 Sủi Bọt Khí CO₂
            </span>
          ) : tube.statusText.includes('xanh lam') ? (
            <span className="text-[10px] font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-300 shadow-2xs block">
              💙 Phức Xanh Lam
            </span>
          ) : (
            <span className="text-[10px] font-semibold text-slate-600 truncate block">
              {totalVolume} mL dung dịch
            </span>
          )}
        </div>

        {/* Burner Flame directly underneath tube if heated */}
        {tube.isHeated && (
          <div className="mt-1 flex flex-col items-center animate-fade-in">
            <div className="w-6 h-8 relative flex items-center justify-center">
              <div className="absolute bottom-0 w-5 h-7 bg-gradient-to-t from-blue-600 via-amber-500 to-yellow-300 rounded-t-full animate-pulse blur-xs" />
              <div className="absolute bottom-0 w-2.5 h-4 bg-cyan-300 rounded-t-full animate-bounce" />
            </div>
            <div className="w-10 h-2 bg-slate-700 rounded-b" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm flex flex-col justify-between h-full relative overflow-hidden">
      {/* Top Banner / Active Experiment Header */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b border-slate-100 pb-3">
          <div>
            <span className="bg-slate-100 text-slate-600 text-[11px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              {activeExperiment ? activeExperiment.badge : 'THỰC HÀNH THÍ NGHIỆM'}
            </span>
            <h2 className="text-sm sm:text-base font-bold text-slate-800 mt-1">
              {activeExperiment ? activeExperiment.title : 'Bàn Thực Hành Thí Nghiệm Hóa Học'}
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 font-medium flex items-center space-x-1">
              <Thermometer className={`w-3.5 h-3.5 ${maxTemp > 30 ? 'text-amber-600 animate-pulse' : 'text-blue-600'}`} />
              <span>{maxTemp}°C</span>
            </span>

            <button
              onClick={onResetTube}
              className="px-3 py-1 text-xs font-bold text-slate-700 hover:bg-slate-100 bg-white rounded-full border border-slate-300 transition flex items-center space-x-1 cursor-pointer"
              title="Rửa sạch cả 2 ống nghiệm"
            >
              <RefreshCw className="w-3.5 h-3.5 text-indigo-600" />
              <span>Làm Sạch Cả 2 Ống</span>
            </button>
          </div>
        </div>

        {/* Experiment Steps Tracker */}
        {activeExperiment && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 mb-2">
            <div className="flex items-center justify-between text-xs text-slate-700 mb-1">
              <span className="font-bold text-indigo-900">
                Tiến Trình: Bước {tube1.currentStepIndex + 1} / {activeExperiment.steps.length}
              </span>
              {tube1.completed || tube2.completed ? (
                <span className="text-emerald-700 font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Hoàn Thành Thí Nghiệm So Sánh!</span>
                </span>
              ) : (
                <span className="text-amber-700 font-semibold animate-pulse">
                  Đang thao tác...
                </span>
              )}
            </div>

            {/* Current instruction highlight */}
            {currentStep && !(tube1.completed || tube2.completed) && (
              <div className="flex items-center justify-between bg-indigo-50/90 border border-indigo-200 rounded-lg p-2 text-xs text-indigo-950">
                <span className="line-clamp-2">
                  <strong className="text-indigo-900">Yêu cầu SGK:</strong> {currentStep.actionPrompt}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* TUBE TARGET SELECTION CONTROLS */}
      <div className="flex items-center justify-center space-x-2 my-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
        <span className="text-[11px] font-bold text-slate-500 uppercase mr-1">Thao tác trên:</span>
        <button
          onClick={() => onSelectTargetTube('tube1')}
          className={`px-3 py-1 rounded-md text-xs font-bold transition cursor-pointer ${
            targetTube === 'tube1' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-200'
          }`}
        >
          {tube1.label}
        </button>
        <button
          onClick={() => onSelectTargetTube('tube2')}
          className={`px-3 py-1 rounded-md text-xs font-bold transition cursor-pointer ${
            targetTube === 'tube2' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-200'
          }`}
        >
          {tube2.label}
        </button>
        <button
          onClick={() => onSelectTargetTube('both')}
          className={`px-3 py-1 rounded-md text-xs font-bold transition cursor-pointer ${
            targetTube === 'both' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-200'
          }`}
        >
          Cả 2 Ống
        </button>
      </div>

      {/* CENTER LAB STAGE - DUAL TEST TUBES & ENVIRONMENT */}
      <div className="my-1 flex-1 min-h-[300px] bg-slate-50 rounded-xl border border-slate-200 relative flex items-center justify-center p-4 overflow-hidden shadow-inner">
        {/* Dot grid background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '24px 24px' }} />

        {/* Thermal Glow background if heated or waterbath */}
        {isAnyHeated && (
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-orange-500/20 via-red-500/10 to-transparent animate-pulse pointer-events-none" />
        )}
        {isAnyWaterBath && (
          <div className="absolute bottom-6 w-80 h-36 bg-indigo-100/60 border-t-2 border-indigo-300 rounded-t-3xl backdrop-blur-xs flex items-center justify-center pointer-events-none">
            <span className="text-[10px] text-indigo-900 font-bold font-mono absolute top-2 bg-white px-2 py-0.5 rounded border border-indigo-200 shadow-xs">
              Cốc ngâm nước nóng (65°C)
            </span>
          </div>
        )}

        {/* DUAL TEST TUBES RACK CONTAINER */}
        <div className={`relative flex items-center justify-center space-x-12 z-10 transition-transform duration-300 ${isShaking ? 'animate-bounce' : ''}`}>
          
          {/* Dual Tube Wooden/Metal Stand Base */}
          <div className="absolute -bottom-3 w-80 h-4 bg-slate-200 border border-slate-300 rounded-full shadow-inner flex items-center justify-center -z-10">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
              Giá Đỡ 2 Ống Nghiệm Kiểm Chứng
            </span>
          </div>

          {/* Tube 1 */}
          {renderSingleTube(tube1, 1)}

          {/* Tube 2 */}
          {renderSingleTube(tube2, 2)}
        </div>

        {/* Reagent Composition Floating Card */}
        <div className="absolute top-2 left-2 bg-white/95 border border-slate-200 rounded-lg p-2 max-w-[190px] shadow-xs text-slate-800 text-[10px]">
          <p className="font-bold uppercase tracking-wider text-indigo-900 border-b border-slate-100 pb-1 mb-1">
            Chất có trong {targetTube === 'both' ? 'cả 2 ống' : targetTube === 'tube1' ? tube1.label : tube2.label}:
          </p>
          {((targetTube === 'tube2' ? tube2 : tube1).addedReagents.length === 0) ? (
            <p className="text-slate-400 italic">Ống nghiệm chưa có chất</p>
          ) : (
            <div className="space-y-0.5">
              {(targetTube === 'tube2' ? tube2 : tube1).addedReagents.map((item, idx) => {
                const reg = REAGENTS.find(r => r.id === item.reagentId);
                return (
                  <div key={idx} className="flex items-center justify-between font-medium text-slate-700">
                    <span className="truncate">{reg?.name || item.reagentId}</span>
                    <span className="text-indigo-700 font-mono font-bold ml-1">{item.volumeMl}mL</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Main Status Description Bar */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 my-1 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FlaskConical className="w-4 h-4 text-indigo-600 shrink-0" />
          <p className="text-xs font-medium text-slate-700 leading-tight">
            <strong className="text-indigo-900">Hiện tượng:</strong> {targetTube === 'tube2' ? tube2.statusText : tube1.statusText}
          </p>
        </div>
      </div>

      {/* BOTTOM WORKBENCH ACTION CONTROLS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
        <button
          onClick={onToggleBurner}
          className={`py-2 px-3 rounded-lg font-bold text-xs transition cursor-pointer shadow-xs flex items-center justify-center space-x-1.5 ${
            isAnyHeated
              ? 'bg-rose-600 text-white animate-pulse'
              : 'bg-slate-800 hover:bg-slate-900 text-white'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-300" />
          <span>{isAnyHeated ? 'TẮT ĐÈN CỒN' : 'ĐUN NÓNG'}</span>
        </button>

        <button
          onClick={handleShake}
          className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 py-2 px-3 rounded-lg text-xs font-bold transition shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer"
        >
          <Waves className="w-4 h-4 text-slate-500" />
          <span>LẮC ĐỀU</span>
        </button>

        <button
          onClick={onToggleWaterBath}
          className={`py-2 px-3 rounded-lg font-bold text-xs transition cursor-pointer shadow-xs flex items-center justify-center space-x-1.5 ${
            isAnyWaterBath
              ? 'bg-indigo-700 text-white'
              : 'bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>{isAnyWaterBath ? 'RÚT NƯỚC NÓNG' : 'NGÂM NƯỚC NÓNG'}</span>
        </button>

        <button
          onClick={() => onAddReagent('distilled_water')}
          className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 py-2 px-3 rounded-lg text-xs font-bold transition shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span>+ NƯỚC CẤT</span>
        </button>
      </div>
    </div>
  );
};
