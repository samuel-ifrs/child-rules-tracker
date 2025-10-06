import { Infraction, WeeklyAllowance } from '../types';
import { WEEKLY_ALLOWANCE_BASE } from '../data/mockData';

// Re-export for convenience
export { WEEKLY_ALLOWANCE_BASE };

export function calculateWeeklyDeduction(infractions: Infraction[]): number {
  if (infractions.length === 0) return 0;
  
  // Soma dos pesos de todas as infrações
  const totalWeights = infractions.reduce((sum, infraction) => sum + infraction.weight, 0);
  
  // SEMANADA / (Soma pesos infrações) * Peso infração para cada infração
  const totalDeduction = infractions.reduce((sum, infraction) => {
    const deduction = (WEEKLY_ALLOWANCE_BASE / totalWeights) * infraction.weight;
    return sum + deduction;
  }, 0);
  
  return Math.min(totalDeduction, WEEKLY_ALLOWANCE_BASE); // Não pode deduzir mais que o valor base
}

export function getWeekStart(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const weekStart = new Date(dateObj);
  const day = weekStart.getDay();
  const diff = weekStart.getDate() - day; // domingo = 0
  weekStart.setDate(diff);
  weekStart.setHours(0, 0, 0, 0);
  return weekStart;
}

export function getWeekEnd(weekStart: Date): Date {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);
  return weekEnd;
}

export function getCurrentWeek(): { start: Date; end: Date } {
  const today = new Date();
  const start = getWeekStart(today);
  const end = getWeekEnd(start);
  return { start, end };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Verificar se a data é válida
  if (isNaN(dateObj.getTime())) {
    return 'Data inválida';
  }
  
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(dateObj);
}

export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Verificar se a data é válida
  if (isNaN(dateObj.getTime())) {
    return 'Data inválida';
  }
  
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
}