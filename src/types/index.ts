export interface Rule {
  id: string;
  name: string;
  description: string;
  weight: number; // Peso da infração (1-10, sendo 10 a mais grave)
  imageUrl: string;
  category: 'higiene' | 'comportamento' | 'responsabilidade' | 'seguranca' | 'alimentacao';
}

export interface Infraction {
  id: string;
  ruleId: string;
  ruleName: string;
  date: Date | string;
  registeredBy: string;
  registeredById: string;
  notes?: string;
  weight: number;
  imageUrl: string;
}

export interface WeeklyAllowance {
  weekStart: Date | string;
  baseAmount: number;
  totalDeductions: number;
  remainingAmount: number;
  infractions: Infraction[];
  paid: boolean;
}

export interface Parent {
  id: string;
  name: string;
  role: 'pai' | 'mae' | 'avo' | 'avó' | 'tio' | 'tia' | 'professor';
}

export type Screen = 'login' | 'dashboard' | 'rules' | 'infractions' | 'history' | 'parents';