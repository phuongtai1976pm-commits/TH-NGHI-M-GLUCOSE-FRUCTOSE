export type TabType = 'workbench' | 'molecules' | 'theory' | 'quiz' | 'applications';

export interface Reagent {
  id: string;
  name: string;
  formula: string;
  concentration: string;
  color: string; // CSS color string or gradient
  textColor?: string;
  category: 'sugar' | 'reagent' | 'catalyst' | 'indicator';
  description: string;
  iconName?: string;
}

export interface LabEquipment {
  id: string;
  name: string;
  type: 'burner' | 'waterbath' | 'pipette' | 'testTubeHolder' | 'stirrer';
  active: boolean;
}

export interface ExperimentStep {
  stepNumber: number;
  instruction: string;
  requiredReagentId?: string;
  requiredEquipment?: 'burner' | 'waterbath' | 'shake';
  actionPrompt: string;
}

export interface ExperimentDefinition {
  id: string;
  title: string;
  subTitle: string;
  badge: string;
  targetCarbohydrate: 'glucose' | 'fructose' | 'both';
  objective: string;
  reagentsNeeded: string[];
  equipmentNeeded: string[];
  steps: ExperimentStep[];
  phenomenon: string;
  chemicalExplanation: string;
  chemicalEquation: string;
  simplifiedEquation: string;
  distinguishingNote?: string;
  resultLiquidColor: string;
  resultPrecipitate?: {
    color: string;
    label: string;
    type: 'brick-red' | 'silver-mirror' | 'blue-complex' | 'turbid-limewater' | 'decolorized';
  };
  hasBubbles?: boolean;
}

export interface TestTubeContent {
  id: 'tube1' | 'tube2';
  label: string;
  addedReagents: { reagentId: string; volumeMl: number }[];
  liquidColor: string;
  liquidLevelPercent: number; // 0 to 100
  precipitate?: {
    color: string;
    label: string;
    type: 'brick-red' | 'silver-mirror' | 'blue-complex' | 'turbid-limewater';
  };
  hasSilverMirror?: boolean;
  isHeated?: boolean;
  isInWaterBath?: boolean;
  temperatureC: number;
  heatingSeconds?: number;
  hasBubbles?: boolean;
  statusText: string;
  currentStepIndex: number;
  activeExperimentId?: string;
  completed?: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0-based index
  explanation: string;
  difficulty: 'Nhận biết' | 'Thông hiểu' | 'Vận dụng';
}

export interface MoleculeInfo {
  id: string;
  name: string;
  formula: string;
  type: 'open' | 'ring-alpha' | 'ring-beta';
  carbohydrate: 'glucose' | 'fructose';
  functionalGroups: {
    name: string;
    formula: string;
    description: string;
    color: string;
  }[];
  description: string;
  imageRepresentation?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
