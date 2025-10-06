import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { WeeklyAllowance, Infraction } from '../types';
import { formatCurrency, formatDate, getWeekStart, getWeekEnd, calculateWeeklyDeduction } from '../utils/calculations';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Calendar, TrendingUp, TrendingDown, DollarSign, AlertTriangle } from 'lucide-react';

interface HistoryProps {
  weeklyAllowances: WeeklyAllowance[];
  allInfractions: Infraction[];
}

export function History({ weeklyAllowances, allInfractions }: HistoryProps) {
  const historyData = useMemo(() => {
    // Organizar por semanas (últimas 8 semanas)
    const weeks = [];
    const today = new Date();
    
    for (let i = 7; i >= 0; i--) {
      const weekDate = new Date(today);
      weekDate.setDate(today.getDate() - (i * 7));
      const weekStart = getWeekStart(weekDate);
      const weekEnd = getWeekEnd(weekStart);
      
      // Encontrar infrações desta semana
      const weekInfractions = allInfractions.filter(infraction => {
        const infractionDate = new Date(infraction.date);
        return infractionDate >= weekStart && infractionDate <= weekEnd;
      });
      
      const deductions = calculateWeeklyDeduction(weekInfractions);
      const remaining = Math.max(0, 100 - deductions);
      
      weeks.push({
        weekStart,
        weekEnd,
        infractions: weekInfractions,
        baseAmount: 100,
        deductions,
        remaining,
        paid: weekEnd < today // Se a semana já passou, considera como paga
      });
    }
    
    return weeks.reverse(); // Mais recente primeiro
  }, [weeklyAllowances, allInfractions]);

  const totalEarned = historyData
    .filter(week => week.paid)
    .reduce((sum, week) => sum + week.remaining, 0);

  const totalInfractions = allInfractions.length;
  const averageWeekly = totalEarned / historyData.filter(w => w.paid).length || 0;

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-3xl font-bold text-purple-600">📊 Histórico de Semanadas</h1>

      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">{formatCurrency(totalEarned)}</p>
            <p className="text-sm text-muted-foreground">Total Recebido</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">{formatCurrency(averageWeekly)}</p>
            <p className="text-sm text-muted-foreground">Média Semanal</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-orange-600">{totalInfractions}</p>
            <p className="text-sm text-muted-foreground">Total de Infrações</p>
          </CardContent>
        </Card>
      </div>

      {/* Histórico Semanal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Histórico das Últimas 8 Semanas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {historyData.map((week, index) => {
              const percentage = (week.remaining / week.baseAmount) * 100;
              const isCurrentWeek = !week.paid;
              
              return (
                <Card key={index} className={`border-l-4 ${isCurrentWeek ? 'border-l-blue-400 bg-blue-50' : week.remaining >= 70 ? 'border-l-green-400' : week.remaining >= 40 ? 'border-l-yellow-400' : 'border-l-red-400'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">
                          {formatDate(week.weekStart)} - {formatDate(week.weekEnd)}
                          {isCurrentWeek && (
                            <Badge className="ml-2 bg-blue-500">
                              Semana Atual
                            </Badge>
                          )}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {week.infractions.length} infrações registradas
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">
                          {formatCurrency(week.remaining)}
                        </p>
                        {week.deductions > 0 && (
                          <p className="text-sm text-red-600">
                            -{formatCurrency(week.deductions)}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Aproveitamento da Semanada</span>
                        <span>{percentage.toFixed(0)}%</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                    
                    {week.infractions.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          Infrações desta semana:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {week.infractions.slice(0, 3).map((infraction, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-red-50 px-2 py-1 rounded text-xs">
                              <ImageWithFallback
                                src={infraction.imageUrl}
                                alt={infraction.ruleName}
                                className="w-4 h-4 rounded object-cover"
                              />
                              <span className="text-red-700 max-w-32 truncate">
                                {infraction.ruleName}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                {infraction.weight}
                              </Badge>
                            </div>
                          ))}
                          {week.infractions.length > 3 && (
                            <span className="text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded">
                              +{week.infractions.length - 3} mais
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance */}
      <Card>
        <CardHeader>
          <CardTitle>📈 Análise de Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-2xl font-bold text-green-600">
                  {historyData.filter(w => w.paid && w.remaining >= 80).length}
                </p>
                <p className="text-sm text-green-700">Semanas Excelentes (≥80%)</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-2xl font-bold text-red-600">
                  {historyData.filter(w => w.paid && w.remaining < 50).length}
                </p>
                <p className="text-sm text-red-700">Semanas Difíceis (&lt;50%)</p>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">💡 Dicas para Melhorar</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Tente manter uma rotina diária de higiene</li>
                <li>• Organize seus brinquedos após brincar</li>
                <li>• Cuide bem do Cosmo todos os dias</li>
                <li>• Seja sempre respeitosa com os responsáveis</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}