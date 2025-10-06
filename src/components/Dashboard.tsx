import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Infraction, WeeklyAllowance, Rule } from '../types';
import { formatCurrency, formatDate, getCurrentWeek, calculateWeeklyDeduction } from '../utils/calculations';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Calendar, Coins, AlertTriangle, TrendingDown, BookOpen } from 'lucide-react';

interface DashboardProps {
  currentWeekAllowance: WeeklyAllowance | null;
  recentInfractions: Infraction[];
  rules: Rule[];
}

export function Dashboard({ currentWeekAllowance, recentInfractions, rules }: DashboardProps) {
  const { start: weekStart, end: weekEnd } = getCurrentWeek();
  
  const weekData = useMemo(() => {
    if (!currentWeekAllowance) {
      return {
        baseAmount: 100,
        deductions: 0,
        remaining: 100,
        percentage: 100
      };
    }
    
    const deductions = calculateWeeklyDeduction(currentWeekAllowance.infractions);
    const remaining = Math.max(0, currentWeekAllowance.baseAmount - deductions);
    const percentage = (remaining / currentWeekAllowance.baseAmount) * 100;
    
    return {
      baseAmount: currentWeekAllowance.baseAmount,
      deductions,
      remaining,
      percentage
    };
  }, [currentWeekAllowance]);

  const getProgressColor = (percentage: number) => {
    if (percentage >= 70) return 'bg-green-500';
    if (percentage >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const thisWeekInfractions = currentWeekAllowance?.infractions || [];

  // Calcular o custo de cada regra baseado na fórmula
  const calculateRuleCost = (ruleWeight: number): number => {
    const totalWeights = rules.reduce((sum, rule) => sum + rule.weight, 0);
    return (100 / totalWeights) * ruleWeight;
  };

  // Ordenar regras por gravidade (peso maior primeiro)
  const sortedRules = [...rules].sort((a, b) => b.weight - a.weight);

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 min-h-screen">
      {/* Header mais infantil */}
      <div className="text-center space-y-4">
        <div className="text-6xl">👑</div>
        <h1 className="text-4xl text-pink-600">Olá, Princesa!</h1>
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 shadow-lg border-2 border-pink-200">
          <p className="text-purple-600 text-lg">
            📅 Semana de {formatDate(weekStart)} a {formatDate(weekEnd)}
          </p>
        </div>
      </div>

      {/* Semanada Card mais infantil */}
      <Card className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 border-4 border-pink-300 rounded-3xl shadow-xl">
        <CardHeader className="text-center pb-2">
          <CardTitle className="flex items-center justify-center gap-3 text-3xl text-purple-700">
            <div className="text-4xl">💰</div>
            Minha Semanada
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl text-green-600 mb-3">
              {formatCurrency(weekData.remaining)}
            </div>
            <div className="text-lg text-purple-600">
              de {formatCurrency(weekData.baseAmount)} que você pode ganhar! 🎉
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-lg text-purple-700">
              <span>🌟 Seu progresso</span>
              <span>{weekData.percentage.toFixed(0)}%</span>
            </div>
            <div className="bg-white/50 rounded-full p-2">
              <Progress 
                value={weekData.percentage} 
                className="h-6 bg-gray-200"
              />
            </div>
          </div>

          {weekData.deductions > 0 && (
            <div className="bg-red-100 p-4 rounded-2xl border-2 border-red-300">
              <div className="flex items-center justify-center gap-3 text-red-600 text-lg">
                <div className="text-2xl">😔</div>
                <span>Você perdeu {formatCurrency(weekData.deductions)} por causa das infrações</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lista de todas as regras ordenadas por gravidade */}
      <Card className="bg-white/80 backdrop-blur-sm border-4 border-purple-300 rounded-3xl shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-purple-700">
            <BookOpen className="h-6 w-6" />
            📋 Todas as Regras (do mais grave ao menos grave)
          </CardTitle>
          <p className="text-purple-600">Veja quanto cada regra pode custar da sua semanada:</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 max-h-96 overflow-y-auto">
            {sortedRules.map((rule) => {
              const cost = calculateRuleCost(rule.weight);
              const isHighPriority = rule.weight >= 8;
              const isMediumPriority = rule.weight >= 5 && rule.weight < 8;
              
              return (
                <div 
                  key={rule.id} 
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 ${
                    isHighPriority 
                      ? 'bg-red-50 border-red-300' 
                      : isMediumPriority 
                      ? 'bg-orange-50 border-orange-300' 
                      : 'bg-green-50 border-green-300'
                  }`}
                >
                  <ImageWithFallback
                    src={rule.imageUrl}
                    alt={rule.name}
                    className="w-12 h-12 rounded-full object-cover shadow-lg"
                  />
                  <div className="flex-1">
                    <p className={`text-sm ${
                      isHighPriority 
                        ? 'text-red-800' 
                        : isMediumPriority 
                        ? 'text-orange-800' 
                        : 'text-green-800'
                    }`}>
                      {rule.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={isHighPriority ? "destructive" : isMediumPriority ? "secondary" : "default"}
                      className="text-xs mb-1"
                    >
                      Peso {rule.weight}
                    </Badge>
                    <div className={`text-sm ${
                      isHighPriority 
                        ? 'text-red-600' 
                        : isMediumPriority 
                        ? 'text-orange-600' 
                        : 'text-green-600'
                    }`}>
                      -{formatCurrency(cost)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Infrações desta Semana */}
      {thisWeekInfractions.length > 0 && (
        <Card className="bg-red-50 border-4 border-red-300 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl text-red-700">
              <AlertTriangle className="h-6 w-6" />
              😰 Suas infrações desta semana ({thisWeekInfractions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {thisWeekInfractions.map((infraction) => (
                <div key={infraction.id} className="flex items-center gap-4 p-4 bg-white rounded-2xl border-2 border-red-200 shadow-sm">
                  <ImageWithFallback
                    src={infraction.imageUrl}
                    alt={infraction.ruleName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-red-800 text-sm">{infraction.ruleName}</p>
                    <p className="text-red-600 text-xs">
                      📅 {formatDate(infraction.date)} • Registrado por {infraction.registeredBy}
                    </p>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    -{formatCurrency(calculateRuleCost(infraction.weight))}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Próximo Pagamento */}
      <Card className="bg-gradient-to-r from-green-100 to-blue-100 border-4 border-green-300 rounded-3xl shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-green-700">
            <Calendar className="h-6 w-6" />
            🎁 Próximo Pagamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            <div className="text-3xl">🗓️</div>
            <p className="text-xl text-green-600">
              Domingo - {formatDate(weekEnd)}
            </p>
            <p className="text-green-700 text-lg">
              Você vai receber {formatCurrency(weekData.remaining)} se comportar direitinho! 💖
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Dicas para ser uma princesa */}
      <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-4 border-yellow-300 rounded-3xl shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-orange-700">
            ✨ Dicas para ser uma princesa perfeita
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-lg">
              <span className="text-2xl">🦷</span>
              <span>Escove os dentes sem ser lembrada</span>
            </div>
            <div className="flex items-center gap-3 text-lg">
              <span className="text-2xl">🏠</span>
              <span>Mantenha seu quarto organizado</span>
            </div>
            <div className="flex items-center gap-3 text-lg">
              <span className="text-2xl">🐕</span>
              <span>Cuide bem do Cosmo</span>
            </div>
            <div className="flex items-center gap-3 text-lg">
              <span className="text-2xl">💖</span>
              <span>Seja obediente e respeitosa</span>
            </div>
            <div className="flex items-center gap-3 text-lg">
              <span className="text-2xl">📚</span>
              <span>Faça suas atividades escolares</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}