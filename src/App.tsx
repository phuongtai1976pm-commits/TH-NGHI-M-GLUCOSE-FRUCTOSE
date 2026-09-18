/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType, TestTubeContent, ExperimentDefinition } from './types';
import { EXPERIMENTS, REAGENTS } from './data/chemistryData';
import { Navbar } from './components/Navbar';
import { ReagentCabinet } from './components/ReagentCabinet';
import { VirtualWorkbench } from './components/VirtualWorkbench';
import { ReactionDetails } from './components/ReactionDetails';
import { MolecularExplorer } from './components/MolecularExplorer';
import { QuizSection } from './components/QuizSection';
import { ApplicationsSection } from './components/ApplicationsSection';
import { AiTutorModal } from './components/AiTutorModal';
import { GuideModal } from './components/GuideModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('workbench');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [aiTutorOpen, setAiTutorOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);

  // Active Experiment State
  const [activeExperimentId, setActiveExperimentId] = useState<string>('exp4_bromine_water');
  const activeExp = EXPERIMENTS.find(e => e.id === activeExperimentId);

  // Target Tube Selection for Workbench: 'tube1' | 'tube2' | 'both'
  const [targetTube, setTargetTube] = useState<'tube1' | 'tube2' | 'both'>('both');

  // Initial Dual Test Tube States
  const [tube1, setTube1] = useState<TestTubeContent>({
    id: 'tube1',
    label: 'Ống 1 (Glucose)',
    addedReagents: [
      { reagentId: 'br2_water', volumeMl: 1 },
      { reagentId: 'glucose_2', volumeMl: 2 }
    ],
    liquidColor: 'rgba(240, 248, 255, 0.4)', // Decolorized / transparent
    liquidLevelPercent: 55,
    temperatureC: 25,
    statusText: '✨ Glucose làm MẤT MÀU ĐỎ NÂU của nước Bromine! (Dung dịch chuyển sang trong suốt)',
    currentStepIndex: 2,
    completed: true,
    hasSilverMirror: false,
    isHeated: false,
    isInWaterBath: false,
    hasBubbles: false
  });

  const [tube2, setTube2] = useState<TestTubeContent>({
    id: 'tube2',
    label: 'Ống 2 (Fructose)',
    addedReagents: [
      { reagentId: 'br2_water', volumeMl: 1 },
      { reagentId: 'fructose_2', volumeMl: 2 }
    ],
    liquidColor: 'rgba(180, 50, 10, 0.95)', // Distinct Reddish-brown
    liquidLevelPercent: 55,
    temperatureC: 25,
    statusText: '🔴 GIỮ NGUYÊN MÀU ĐỎ NÂU! Fructose không phản ứng với nước Bromine.',
    currentStepIndex: 2,
    completed: true,
    hasSilverMirror: false,
    isHeated: false,
    isInWaterBath: false,
    hasBubbles: false
  });

  // Sound Synth Feedback
  const playSound = (type: 'pour' | 'heat' | 'success' | 'shake') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'pour') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'success') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'shake') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(220, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      }
    } catch (e) {
      // Audio fallback
    }
  };

  // Helper calculation for single tube chemistry state
  const calculateTubeState = (
    prev: TestTubeContent,
    reagentId?: string,
    action?: 'heat' | 'waterbath' | 'shake'
  ): TestTubeContent => {
    let updatedReagents = [...prev.addedReagents];

    if (reagentId) {
      const existing = updatedReagents.find(r => r.reagentId === reagentId);
      if (existing) {
        updatedReagents = updatedReagents.map(r =>
          r.reagentId === reagentId ? { ...r, volumeMl: r.volumeMl + 1 } : r
        );
      } else {
        updatedReagents.push({ reagentId, volumeMl: 1 });
      }
    }

    const totalVol = updatedReagents.reduce((sum, r) => sum + r.volumeMl, 0);
    const newLevel = totalVol === 0 ? 0 : Math.min(88, 18 + totalVol * 14);

    let isHeated = action === 'heat' ? !prev.isHeated : prev.isHeated;
    let isInWaterBath = action === 'waterbath' ? !prev.isInWaterBath : prev.isInWaterBath;
    let temperatureC = isHeated ? 90 : isInWaterBath ? 65 : 25;

    let hasSilverMirror = prev.hasSilverMirror;
    let hasBubbles = prev.hasBubbles;
    let precipitate = prev.precipitate;
    let liquidColor = 'linear-gradient(180deg, rgba(224, 242, 254, 0.85) 0%, rgba(186, 230, 253, 0.9) 100%)';
    let statusText = 'Đang thao tác thí nghiệm...';

    const hasNaOH = updatedReagents.some(r => r.reagentId === 'naoh_10');
    const hasCuSO4 = updatedReagents.some(r => r.reagentId === 'cuso4_5');
    const hasGlucose = updatedReagents.some(r => r.reagentId === 'glucose_2');
    const hasFructose = updatedReagents.some(r => r.reagentId === 'fructose_2');
    const hasAgNO3 = updatedReagents.some(r => r.reagentId === 'agno3_1');
    const hasNH3 = updatedReagents.some(r => r.reagentId === 'nh3_5');
    const hasBr2 = updatedReagents.some(r => r.reagentId === 'br2_water');
    const hasYeast = updatedReagents.some(r => r.reagentId === 'yeast_enzyme');

    // Reaction Rules:
    // 1. Bromine Water Reaction
    if (hasBr2) {
      if (hasGlucose) {
        liquidColor = 'rgba(240, 248, 255, 0.4)'; // Decolorized / clear
        precipitate = undefined;
        statusText = '✨ Glucose làm MẤT MÀU ĐỎ NÂU của nước Bromine! (Dung dịch chuyển sang trong suốt)';
      } else if (hasFructose && !hasGlucose) {
        liquidColor = 'rgba(180, 50, 10, 0.95)'; // Remains reddish brown
        precipitate = undefined;
        statusText = '🔴 GIỮ NGUYÊN MÀU ĐỎ NÂU! Fructose không phản ứng với nước Bromine.';
      } else {
        liquidColor = 'rgba(180, 50, 10, 0.95)';
        statusText = 'Nước Bromine có màu ĐỎ NÂU đặc trưng.';
      }
    }

    // 2. Cu(OH)2 Reaction
    else if (hasNaOH && hasCuSO4) {
      if (hasGlucose || hasFructose) {
        if (isHeated) {
          liquidColor = 'rgba(254, 243, 199, 0.6)';
          precipitate = {
            color: '#b91c1c',
            label: 'Kết tủa Cu₂O (Đỏ gạch)',
            type: 'brick-red'
          };
          statusText = 'Đun nóng: Phức xanh lam bị oxi hóa tạo kết tủa Cu₂O màu đỏ gạch!';
        } else {
          liquidColor = 'rgba(14, 165, 233, 0.9)'; // Bright blue complex
          precipitate = undefined;
          statusText = 'Cu(OH)₂ tan ra tạo dung dịch phức đồng-saccharide màu xanh lam tươi!';
        }
      } else {
        liquidColor = 'rgba(37, 99, 235, 0.85)';
        precipitate = {
          color: '#1d4ed8',
          label: 'Kết tủa Cu(OH)₂ (Xanh lam)',
          type: 'blue-complex'
        };
        statusText = 'Phản ứng giữa NaOH và CuSO₄ tạo kết tủa Cu(OH)₂ màu xanh lam tươi.';
      }
    }

    // 3. Tollens Silver Mirror Reaction
    else if (hasAgNO3 && hasNH3) {
      if (prev.hasSilverMirror || (prev.heatingSeconds && prev.heatingSeconds >= 30)) {
        hasSilverMirror = true;
        liquidColor = 'rgba(226, 232, 240, 0.6)';
        statusText = '🪞 Đun nóng đủ 30 giây: Lớp bạc kim loại Ag sáng bóng bám chặt vào thành ống nghiệm!';
      } else if (hasGlucose || hasFructose) {
        if (isHeated || isInWaterBath) {
          liquidColor = 'rgba(241, 245, 249, 0.7)';
          const sec = prev.heatingSeconds || 0;
          statusText = `🔥 Đang đun nóng ống nghiệm... (${sec}s/30s)`;
        } else {
          liquidColor = 'rgba(241, 245, 249, 0.7)';
          statusText = 'Đã hòa trộn phức Tollens và đường. Hãy bấm "ĐUN NÓNG" hoặc "NGÂM NƯỚC NÓNG" trong 30 giây để quan sát lớp bạc Ag.';
        }
      } else {
        liquidColor = 'rgba(241, 245, 249, 0.6)';
        statusText = 'Tạo dung dịch phức Tollens [Ag(NH₃)₂]OH trong suốt.';
      }
    }

    // 4. Fermentation Reaction (Both Glucose and Fructose undergo alcoholic fermentation)
    else if ((hasGlucose || hasFructose) && hasYeast) {
      const sugarName = hasGlucose && hasFructose ? 'Glucose & Fructose' : hasGlucose ? 'Glucose' : 'Fructose';
      if (isInWaterBath || isHeated) {
        hasBubbles = true;
        liquidColor = 'rgba(254, 243, 199, 0.8)';
        statusText = `🫧 Lên men ${sugarName}: Dưới tác dụng của enzyme men rượu (30-35°C), ${sugarName} lên men tạo Ethanol (C₂H₅OH) và sủi bọt khí CO₂↑ liên tục!`;
      } else {
        liquidColor = 'rgba(254, 243, 199, 0.7)';
        statusText = `Hỗn dịch ${sugarName} và Men rượu sẵn sàng. Bấm "NGÂM NƯỚC NÓNG" hoặc "ĐUN NÓNG" nhẹ (30-35°C) để enzyme lên men sủi bọt khí CO₂!`;
      }
    }

    return {
      ...prev,
      addedReagents: updatedReagents,
      liquidColor,
      liquidLevelPercent: newLevel,
      precipitate,
      hasSilverMirror,
      hasBubbles,
      isHeated,
      isInWaterBath,
      temperatureC,
      heatingSeconds: prev.heatingSeconds || 0,
      statusText,
      completed: true
    };
  };

  // Reset Both Test Tubes
  const handleResetTube = () => {
    setTube1({
      id: 'tube1',
      label: 'Ống 1 (Glucose)',
      addedReagents: [],
      liquidColor: 'linear-gradient(180deg, rgba(224, 242, 254, 0.85) 0%, rgba(186, 230, 253, 0.9) 100%)',
      liquidLevelPercent: 0,
      temperatureC: 25,
      heatingSeconds: 0,
      statusText: 'Ống 1 đã được rửa sạch.',
      currentStepIndex: 0,
      completed: false
    });

    setTube2({
      id: 'tube2',
      label: 'Ống 2 (Fructose)',
      addedReagents: [],
      liquidColor: 'linear-gradient(180deg, rgba(224, 242, 254, 0.85) 0%, rgba(186, 230, 253, 0.9) 100%)',
      liquidLevelPercent: 0,
      temperatureC: 25,
      heatingSeconds: 0,
      statusText: 'Ống 2 đã được rửa sạch.',
      currentStepIndex: 0,
      completed: false
    });
  };

  // Switch Preset Experiment & Pre-populate standard SGK dual-tube setups
  const handleSelectPresetExperiment = (exp: ExperimentDefinition) => {
    setActiveExperimentId(exp.id);

    if (exp.id === 'exp4_bromine_water') {
      // Bromine water comparison
      setTube1({
        id: 'tube1',
        label: 'Ống 1 (Glucose)',
        addedReagents: [
          { reagentId: 'br2_water', volumeMl: 1 },
          { reagentId: 'glucose_2', volumeMl: 2 }
        ],
        liquidColor: 'rgba(240, 248, 255, 0.4)',
        liquidLevelPercent: 55,
        temperatureC: 25,
        statusText: '✨ Glucose làm MẤT MÀU ĐỎ NÂU của nước Bromine! (Trong suốt)',
        currentStepIndex: 2,
        completed: true
      });

      setTube2({
        id: 'tube2',
        label: 'Ống 2 (Fructose)',
        addedReagents: [
          { reagentId: 'br2_water', volumeMl: 1 },
          { reagentId: 'fructose_2', volumeMl: 2 }
        ],
        liquidColor: 'rgba(180, 50, 10, 0.95)',
        liquidLevelPercent: 55,
        temperatureC: 25,
        statusText: '🔴 GIỮ NGUYÊN MÀU ĐỎ NÂU! Fructose không phản ứng với nước Bromine.',
        currentStepIndex: 2,
        completed: true
      });
    } else if (exp.id === 'exp1_cuoh2_cold') {
      // Cu(OH)2 cold comparison
      setTube1({
        id: 'tube1',
        label: 'Ống 1 (Glucose)',
        addedReagents: [
          { reagentId: 'naoh_10', volumeMl: 2 },
          { reagentId: 'cuso4_5', volumeMl: 1 },
          { reagentId: 'glucose_2', volumeMl: 3 }
        ],
        liquidColor: 'rgba(14, 165, 233, 0.9)',
        liquidLevelPercent: 68,
        temperatureC: 25,
        statusText: 'Cu(OH)₂ tan ra tạo dung dịch phức đồng-glucose màu xanh lam tươi.',
        currentStepIndex: 3,
        completed: true
      });

      setTube2({
        id: 'tube2',
        label: 'Ống 2 (Fructose)',
        addedReagents: [
          { reagentId: 'naoh_10', volumeMl: 2 },
          { reagentId: 'cuso4_5', volumeMl: 1 },
          { reagentId: 'fructose_2', volumeMl: 3 }
        ],
        liquidColor: 'rgba(14, 165, 233, 0.9)',
        liquidLevelPercent: 68,
        temperatureC: 25,
        statusText: 'Fructose cũng hòa tan Cu(OH)₂ tạo dung dịch phức xanh lam tươi.',
        currentStepIndex: 3,
        completed: true
      });
    } else if (exp.id === 'exp2_cuoh2_heat') {
      // Cu(OH)2 heat vs cold comparison
      setTube1({
        id: 'tube1',
        label: 'Ống 1 (Đun Nóng)',
        addedReagents: [
          { reagentId: 'naoh_10', volumeMl: 2 },
          { reagentId: 'cuso4_5', volumeMl: 1 },
          { reagentId: 'glucose_2', volumeMl: 3 }
        ],
        liquidColor: 'rgba(254, 243, 199, 0.6)',
        liquidLevelPercent: 68,
        temperatureC: 90,
        isHeated: true,
        precipitate: { color: '#b91c1c', label: 'Kết tủa Cu₂O (Đỏ gạch)', type: 'brick-red' },
        statusText: '🔥 Đun nóng: Xuất hiện kết tủa Cu₂O màu đỏ gạch!',
        currentStepIndex: 3,
        completed: true
      });

      setTube2({
        id: 'tube2',
        label: 'Ống 2 (Nhiệt độ thường)',
        addedReagents: [
          { reagentId: 'naoh_10', volumeMl: 2 },
          { reagentId: 'cuso4_5', volumeMl: 1 },
          { reagentId: 'glucose_2', volumeMl: 3 }
        ],
        liquidColor: 'rgba(14, 165, 233, 0.9)',
        liquidLevelPercent: 68,
        temperatureC: 25,
        statusText: 'Ở nhiệt độ thường: Giữ nguyên màu xanh lam tươi.',
        currentStepIndex: 3,
        completed: true
      });
    } else if (exp.id === 'exp3_tollens_mirror') {
      // Tollens silver mirror comparison (Both Glucose and Fructose react due to alkaline NH3 isomerization)
      setTube1({
        id: 'tube1',
        label: 'Ống 1 (Glucose)',
        addedReagents: [
          { reagentId: 'agno3_1', volumeMl: 2 },
          { reagentId: 'nh3_5', volumeMl: 1 },
          { reagentId: 'glucose_2', volumeMl: 2 }
        ],
        liquidColor: 'rgba(226, 232, 240, 0.6)',
        liquidLevelPercent: 60,
        temperatureC: 65,
        isInWaterBath: true,
        hasSilverMirror: true,
        statusText: '🪞 Sau 30 giây ngâm nước nóng: Lớp bạc kim loại Ag sáng bóng bám chặt vào thành ống nghiệm!',
        currentStepIndex: 3,
        completed: true
      });

      setTube2({
        id: 'tube2',
        label: 'Ống 2 (Fructose)',
        addedReagents: [
          { reagentId: 'agno3_1', volumeMl: 2 },
          { reagentId: 'nh3_5', volumeMl: 1 },
          { reagentId: 'fructose_2', volumeMl: 2 }
        ],
        liquidColor: 'rgba(226, 232, 240, 0.6)',
        liquidLevelPercent: 60,
        temperatureC: 65,
        isInWaterBath: true,
        hasSilverMirror: true,
        statusText: '🪞 Sau 30 giây: Fructose trong môi trường kiềm NH₃ chuyển thành Glucose và cũng tạo lớp bạc Ag sáng bóng!',
        currentStepIndex: 3,
        completed: true
      });
    } else if (exp.id === 'exp5_fermentation') {
      // Fermentation comparison
      setTube1({
        id: 'tube1',
        label: 'Ống 1 (Glucose + Men)',
        addedReagents: [
          { reagentId: 'glucose_2', volumeMl: 5 },
          { reagentId: 'yeast_enzyme', volumeMl: 1 }
        ],
        liquidColor: 'rgba(254, 243, 199, 0.8)',
        liquidLevelPercent: 75,
        temperatureC: 32,
        isInWaterBath: true,
        hasBubbles: true,
        statusText: '🫧 Lên men Glucose: Khí CO₂ sủi bọt liên tục!',
        currentStepIndex: 2,
        completed: true
      });

      setTube2({
        id: 'tube2',
        label: 'Ống 2 (Nước Cất + Men)',
        addedReagents: [
          { reagentId: 'distilled_water', volumeMl: 5 },
          { reagentId: 'yeast_enzyme', volumeMl: 1 }
        ],
        liquidColor: 'rgba(254, 243, 199, 0.7)',
        liquidLevelPercent: 75,
        temperatureC: 32,
        isInWaterBath: true,
        statusText: 'Mẫu đối chứng nước cất: Không có hiện tượng sủi bọt khí.',
        currentStepIndex: 2,
        completed: true
      });
    }
  };

  // Add Reagent Handler
  const handleAddReagent = (reagentId: string) => {
    playSound('pour');

    if (targetTube === 'tube1' || targetTube === 'both') {
      setTube1(prev => calculateTubeState(prev, reagentId));
    }
    if (targetTube === 'tube2' || targetTube === 'both') {
      setTube2(prev => calculateTubeState(prev, reagentId));
    }
  };

  // Toggle Burner Handler
  const handleToggleBurner = () => {
    playSound('heat');
    if (targetTube === 'tube1' || targetTube === 'both') {
      setTube1(prev => calculateTubeState(prev, undefined, 'heat'));
    }
    if (targetTube === 'tube2' || targetTube === 'both') {
      setTube2(prev => calculateTubeState(prev, undefined, 'heat'));
    }
  };

  // Toggle Water Bath Handler
  const handleToggleWaterBath = () => {
    playSound('heat');
    if (targetTube === 'tube1' || targetTube === 'both') {
      setTube1(prev => calculateTubeState(prev, undefined, 'waterbath'));
    }
    if (targetTube === 'tube2' || targetTube === 'both') {
      setTube2(prev => calculateTubeState(prev, undefined, 'waterbath'));
    }
  };

  // Shake Handler
  const handleShakeTube = () => {
    playSound('shake');
    if (targetTube === 'tube1' || targetTube === 'both') {
      setTube1(prev => calculateTubeState(prev, undefined, 'shake'));
    }
    if (targetTube === 'tube2' || targetTube === 'both') {
      setTube2(prev => calculateTubeState(prev, undefined, 'shake'));
    }
  };

  // Helper to check if a tube is actively being heated with Tollens reactants
  const isHeatingTollens = (t: TestTubeContent) => {
    const hasAgNO3 = t.addedReagents.some(r => r.reagentId === 'agno3_1');
    const hasNH3 = t.addedReagents.some(r => r.reagentId === 'nh3_5');
    const hasSugar = t.addedReagents.some(r => r.reagentId === 'glucose_2' || r.reagentId === 'fructose_2');
    const isHeated = t.isHeated || t.isInWaterBath;
    return hasAgNO3 && hasNH3 && hasSugar && isHeated && !t.hasSilverMirror;
  };

  // Background 30-second heating timer: counts exactly 30s of active heating
  useEffect(() => {
    const heating1 = isHeatingTollens(tube1);
    const heating2 = isHeatingTollens(tube2);

    if (!heating1 && !heating2) return;

    const interval = setInterval(() => {
      if (heating1) {
        setTube1(prev => {
          if (!isHeatingTollens(prev)) return prev;
          const nextSec = (prev.heatingSeconds || 0) + 1;
          const hasGlucose = prev.addedReagents.some(r => r.reagentId === 'glucose_2');

          if (nextSec >= 30) {
            playSound('success');
            return {
              ...prev,
              heatingSeconds: 30,
              hasSilverMirror: true,
              liquidColor: 'rgba(226, 232, 240, 0.6)',
              statusText: hasGlucose
                ? 'Đun nóng đủ 30 giây: Glucose bị oxi hóa, lớp bạc kim loại Ag sáng bóng bám chặt vào thành ống nghiệm!'
                : 'Đun nóng đủ 30 giây: Fructose chuyển hóa tạo lớp bạc kim loại Ag sáng bóng!',
              completed: true
            };
          } else {
            return {
              ...prev,
              heatingSeconds: nextSec,
              statusText: `🔥 Đang đun nóng ống nghiệm... (${nextSec}s/30s)`
            };
          }
        });
      }

      if (heating2) {
        setTube2(prev => {
          if (!isHeatingTollens(prev)) return prev;
          const nextSec = (prev.heatingSeconds || 0) + 1;
          const hasGlucose = prev.addedReagents.some(r => r.reagentId === 'glucose_2');

          if (nextSec >= 30) {
            playSound('success');
            return {
              ...prev,
              heatingSeconds: 30,
              hasSilverMirror: true,
              liquidColor: 'rgba(226, 232, 240, 0.6)',
              statusText: hasGlucose
                ? 'Đun nóng đủ 30 giây: Glucose bị oxi hóa, lớp bạc kim loại Ag sáng bóng bám chặt vào thành ống nghiệm!'
                : 'Đun nóng đủ 30 giây: Fructose chuyển hóa tạo lớp bạc kim loại Ag sáng bóng!',
              completed: true
            };
          } else {
            return {
              ...prev,
              heatingSeconds: nextSec,
              statusText: `🔥 Đang đun nóng ống nghiệm... (${nextSec}s/30s)`
            };
          }
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [
    tube1.isHeated,
    tube1.isInWaterBath,
    tube1.hasSilverMirror,
    tube1.addedReagents,
    tube2.isHeated,
    tube2.isInWaterBath,
    tube2.hasSilverMirror,
    tube2.addedReagents,
    soundEnabled
  ]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Global Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAiTutor={() => setAiTutorOpen(true)}
        openGuide={() => setGuideOpen(true)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Content Area Based on Active Tab */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6">
        {activeTab === 'workbench' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
            {/* Left 4 cols: Chemical Reagents & Presets */}
            <div className="lg:col-span-4 h-[750px]">
              <ReagentCabinet
                onAddReagent={handleAddReagent}
                activeExperimentId={activeExperimentId}
                onSelectPresetExperiment={handleSelectPresetExperiment}
                currentStepIndex={tube1.currentStepIndex}
              />
            </div>

            {/* Center 5 cols: Dual-Tube Virtual Stage */}
            <div className="lg:col-span-5 h-[750px]">
              <VirtualWorkbench
                tube1={tube1}
                tube2={tube2}
                targetTube={targetTube}
                onSelectTargetTube={setTargetTube}
                activeExperiment={activeExp}
                onShakeTube={handleShakeTube}
                onToggleBurner={handleToggleBurner}
                onToggleWaterBath={handleToggleWaterBath}
                onResetTube={handleResetTube}
                soundEnabled={soundEnabled}
                onAddReagent={handleAddReagent}
              />
            </div>

            {/* Right 3 cols: Reaction Explanation & Equations */}
            <div className="lg:col-span-3 h-[750px]">
              <ReactionDetails
                tubeContent={tube1}
                activeExperimentId={activeExperimentId}
              />
            </div>
          </div>
        )}

        {activeTab === 'molecules' && <MolecularExplorer />}

        {activeTab === 'theory' && (
          <div className="max-w-5xl mx-auto space-y-6">
            <ReactionDetails
              tubeContent={tube1}
              activeExperimentId={activeExperimentId}
            />
          </div>
        )}

        {activeTab === 'quiz' && <QuizSection />}

        {activeTab === 'applications' && <ApplicationsSection />}
      </main>

      {/* AI Tutor Modal */}
      <AiTutorModal
        isOpen={aiTutorOpen}
        onClose={() => setAiTutorOpen(false)}
        contextInfo={activeExp ? `Học sinh đang thực hiện ${activeExp.title}` : 'Thử nghiệm thí nghiệm ảo'}
      />

      {/* User Guide Modal */}
      <GuideModal
        isOpen={guideOpen}
        onClose={() => setGuideOpen(false)}
      />

      {/* Footer */}
      <footer className="h-10 bg-slate-100 border-t border-slate-200 px-6 flex items-center justify-between text-[11px] text-slate-500 font-medium">
        <div className="flex gap-4">
          <span>● Server: Cloud-Connect-Lab-01</span>
          <span className="hidden sm:inline">● Hóa học 12 — GDPT 2018</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Phòng thí nghiệm 2 ống nghiệm sẵn sàng</span>
        </div>
      </footer>
    </div>
  );
}
