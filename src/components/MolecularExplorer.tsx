import React, { useState } from 'react';
import { MOLECULES } from '../data/chemistryData';
import { Atom, RefreshCw, Layers, Sparkles, Check, Info } from 'lucide-react';

export const MolecularExplorer: React.FC = () => {
  const [selectedCarb, setSelectedCarb] = useState<'glucose' | 'fructose'>('glucose');
  const [selectedStructureType, setSelectedStructureType] = useState<'open' | 'ring-alpha' | 'ring-beta'>('open');
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const currentMolecule = MOLECULES.find(
    m => m.carbohydrate === selectedCarb && m.type === selectedStructureType
  ) || MOLECULES[0];

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Atom className="w-6 h-6 text-indigo-600" />
            <h2 className="text-base sm:text-lg font-bold text-slate-800">
              Cấu Tạo Phân Tử Glucose & Fructose (Hóa Học 12)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Mô hình trực quan công thức cấu tạo dạng mạch hở (Fischer) và mạch vòng (Haworth α, β). Nhấp vào từng nhóm chức để xem vai trò hóa học trong bài học.
          </p>
        </div>

        {/* Carbohydrate Selector Switch */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setSelectedCarb('glucose')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              selectedCarb === 'glucose'
                ? 'bg-indigo-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            GLUCOSE (C₆H₁₂O₆)
          </button>
          <button
            onClick={() => setSelectedCarb('fructose')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              selectedCarb === 'fructose'
                ? 'bg-indigo-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            FRUCTOSE (C₆H₁₂O₆)
          </button>
        </div>
      </div>

      {/* Main Structural Visualizer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Form Selector & Equilibrium */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Dạng Cấu Trúc Khai Triển</span>
            </h3>

            <div className="space-y-2">
              {[
                { type: 'open', label: 'Dạng Mạch Hở (Fischer)', badge: 'Chứa -CHO / >C=O' },
                { type: 'ring-alpha', label: 'Dạng Vòng α-Saccharide', badge: 'Chứa -OH Hemiacetal α' },
                { type: 'ring-beta', label: 'Dạng Vòng β-Saccharide', badge: 'Chứa -OH Hemiacetal β' },
              ].map((item) => {
                const isActive = selectedStructureType === item.type;
                return (
                  <button
                    key={item.type}
                    onClick={() => {
                      setSelectedStructureType(item.type as any);
                      setActiveGroup(null);
                    }}
                    className={`w-full text-left p-3 rounded-lg border transition flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-indigo-50 border-2 border-indigo-500 text-indigo-900 shadow-xs'
                        : 'bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold">{item.label}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{item.badge}</p>
                    </div>
                    {isActive && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Equilibrium Box */}
          <div className="bg-amber-50/90 border-l-4 border-amber-500 rounded-xl p-4 shadow-xs space-y-2 text-xs text-amber-950">
            <div className="flex items-center space-x-2 text-amber-900 font-bold">
              <RefreshCw className="w-4 h-4 text-amber-600" />
              <span>Cân Bằng Chuyển Hóa Kiềm (OH⁻)</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-amber-200 text-center font-mono text-indigo-900 font-bold">
              Glucose <span className="text-amber-600">⇌ (Môi trường OH⁻) ⇌</span> Fructose
            </div>
            <p className="text-amber-900 leading-relaxed text-[11px] font-medium">
              Trong môi trường kiềm (NH₃, NaOH), Glucose và Fructose chuyển hóa qua lại lẫn nhau. Vì vậy, Fructose vẫn tráng bạc và hòa tan Cu(OH)₂!
            </p>
          </div>
        </div>

        {/* Center Visualizer Card */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                  {currentMolecule.formula}
                </span>
                <h3 className="text-base font-bold text-slate-800 mt-1">
                  {currentMolecule.name}
                </h3>
              </div>
              <span className="text-xs text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 font-semibold">
                {selectedCarb === 'glucose' ? 'Aldohexose' : 'Ketohexose'}
              </span>
            </div>

            {/* VISUAL CHEMICAL STRUCTURE DIAGRAM */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center min-h-[280px] relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

              {/* Fischer / Haworth Visual Drawing Component */}
              {selectedStructureType === 'open' ? (
                <div className="font-mono text-slate-800 text-sm space-y-1.5 text-center relative z-10">
                  {selectedCarb === 'glucose' ? (
                    <>
                      <div
                        onClick={() => setActiveGroup('Nhóm Aldehyde (-CHO)')}
                        className={`p-1.5 rounded border cursor-pointer transition ${
                          activeGroup === 'Nhóm Aldehyde (-CHO)'
                            ? 'bg-rose-100 border-rose-500 text-rose-900 font-bold shadow-xs scale-105'
                            : 'bg-rose-50 border-rose-200 text-rose-800 hover:bg-rose-100'
                        }`}
                      >
                        C1: CH=O (Aldehyde)
                      </div>
                      <div className="text-slate-400">|</div>
                      <div
                        onClick={() => setActiveGroup('5 Nhóm Hydroxy (-OH)')}
                        className="p-1.5 bg-indigo-50 border border-indigo-200 rounded text-indigo-900 cursor-pointer hover:bg-indigo-100 transition"
                      >
                        C2: H - C - OH
                      </div>
                      <div className="text-slate-400">|</div>
                      <div
                        onClick={() => setActiveGroup('5 Nhóm Hydroxy (-OH)')}
                        className="p-1.5 bg-indigo-50 border border-indigo-200 rounded text-indigo-900 cursor-pointer hover:bg-indigo-100 transition"
                      >
                        C3: HO - C - H
                      </div>
                      <div className="text-slate-400">|</div>
                      <div
                        onClick={() => setActiveGroup('5 Nhóm Hydroxy (-OH)')}
                        className="p-1.5 bg-indigo-50 border border-indigo-200 rounded text-indigo-900 cursor-pointer hover:bg-indigo-100 transition"
                      >
                        C4: H - C - OH
                      </div>
                      <div className="text-slate-400">|</div>
                      <div
                        onClick={() => setActiveGroup('5 Nhóm Hydroxy (-OH)')}
                        className="p-1.5 bg-indigo-50 border border-indigo-200 rounded text-indigo-900 cursor-pointer hover:bg-indigo-100 transition"
                      >
                        C5: H - C - OH
                      </div>
                      <div className="text-slate-400">|</div>
                      <div
                        onClick={() => setActiveGroup('5 Nhóm Hydroxy (-OH)')}
                        className="p-1.5 bg-indigo-50 border border-indigo-200 rounded text-indigo-900 cursor-pointer hover:bg-indigo-100 transition"
                      >
                        C6: CH₂OH (Ancol)
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-1.5 bg-indigo-50 border border-indigo-200 rounded text-indigo-900">
                        C1: CH₂OH
                      </div>
                      <div className="text-slate-400">|</div>
                      <div
                        onClick={() => setActiveGroup('Nhóm Ketone (>C=O)')}
                        className={`p-1.5 rounded border cursor-pointer transition ${
                          activeGroup === 'Nhóm Ketone (>C=O)'
                            ? 'bg-amber-100 border-amber-500 text-amber-900 font-bold shadow-xs scale-105'
                            : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
                        }`}
                      >
                        C2: C = O (Ketone)
                      </div>
                      <div className="text-slate-400">|</div>
                      <div className="p-1.5 bg-indigo-50 border border-indigo-200 rounded text-indigo-900">
                        C3: HO - C - H
                      </div>
                      <div className="text-slate-400">|</div>
                      <div className="p-1.5 bg-indigo-50 border border-indigo-200 rounded text-indigo-900">
                        C4: H - C - OH
                      </div>
                      <div className="text-slate-400">|</div>
                      <div className="p-1.5 bg-indigo-50 border border-indigo-200 rounded text-indigo-900">
                        C5: H - C - OH
                      </div>
                      <div className="text-slate-400">|</div>
                      <div className="p-1.5 bg-indigo-50 border border-indigo-200 rounded text-indigo-900">
                        C6: CH₂OH
                      </div>
                    </>
                  )}
                </div>
              ) : (
                /* HAWORTH RING DRAWING */
                <div className="relative flex flex-col items-center justify-center p-4">
                  <div className="w-48 h-36 border-4 border-indigo-500 rounded-[40%] bg-indigo-50/60 flex items-center justify-center relative shadow-xs">
                    <span className="text-xs font-bold text-indigo-900">
                      {selectedStructureType === 'ring-alpha' ? 'Dạng vòng α' : 'Dạng vòng β'}
                    </span>
                    {/* Ring carbon markers */}
                    <div className="absolute -top-3 left-6 bg-white border border-slate-300 px-2 py-0.5 text-[10px] text-slate-700 rounded font-mono shadow-xs">
                      C5
                    </div>
                    <div className="absolute -bottom-3 right-8 bg-white border border-slate-300 px-2 py-0.5 text-[10px] text-slate-700 rounded font-mono shadow-xs">
                      C2
                    </div>
                    <div className="absolute top-10 -right-4 bg-emerald-500 border border-emerald-600 text-white px-2 py-0.5 text-[10px] font-bold rounded shadow-xs animate-pulse">
                      -OH Hemiacetal
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-4 text-center">
                    Vòng 6 cạnh (Pyranose) hoặc 5 cạnh (Furanose) với nhóm -OH hemiacetal/hemiketal hoạt động mạnh.
                  </p>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-600 mt-4 leading-relaxed font-medium">
              {currentMolecule.description}
            </p>
          </div>

          {/* Functional Groups Interactive Cards */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Nhóm Chức Quyết Định Tính Chất Hóa Học:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentMolecule.functionalGroups.map((fg, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveGroup(fg.name)}
                  className={`text-left p-3 rounded-lg border transition cursor-pointer ${
                    activeGroup === fg.name
                      ? 'bg-indigo-50 border-2 border-indigo-500 text-indigo-900 shadow-xs'
                      : 'bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">{fg.name}</span>
                    <span
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded font-bold bg-white border border-slate-200"
                    >
                      {fg.formula}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {fg.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

