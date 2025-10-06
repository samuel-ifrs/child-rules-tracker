import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Rule, Infraction, Parent } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { formatDateTime, formatCurrency, WEEKLY_ALLOWANCE_BASE } from '../utils/calculations';
import { Plus, AlertTriangle, User, Calendar } from 'lucide-react';

interface InfractionsManagementProps {
  rules: Rule[];
  infractions: Infraction[];
  parents: Parent[];
  currentParentId: string;
  onAddInfraction: (infraction: Omit<Infraction, 'id'>) => void;
}

export function InfractionsManagement({ 
  rules, 
  infractions, 
  parents, 
  currentParentId, 
  onAddInfraction 
}: InfractionsManagementProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRuleId, setSelectedRuleId] = useState('');
  const [notes, setNotes] = useState('');

  const currentParent = parents.find(p => p.id === currentParentId);
  const recentInfractions = infractions.slice(-10).reverse();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedRule = rules.find(r => r.id === selectedRuleId);
    if (!selectedRule || !currentParent) return;

    const newInfraction: Omit<Infraction, 'id'> = {
      ruleId: selectedRule.id,
      ruleName: selectedRule.name,
      date: new Date(),
      registeredBy: currentParent.name,
      notes: notes || undefined,
      weight: selectedRule.weight,
      imageUrl: selectedRule.imageUrl
    };

    onAddInfraction(newInfraction);
    
    // Reset form
    setSelectedRuleId('');
    setNotes('');
    setIsDialogOpen(false);
  };

  const getWeightColor = (weight: number) => {
    if (weight >= 8) return 'bg-red-500';
    if (weight >= 5) return 'bg-orange-500';
    if (weight >= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const calculateDeductionPreview = (weight: number) => {
    // Simulação simples - na prática seria mais complexo
    const totalWeights = infractions.reduce((sum, inf) => sum + inf.weight, 0) + weight;
    return (WEEKLY_ALLOWANCE_BASE / totalWeights) * weight;
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-purple-600">📝 Registrar Infrações</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Infração
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Registrar Nova Infração</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="rule">Regra Quebrada</Label>
                <Select value={selectedRuleId} onValueChange={setSelectedRuleId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a regra..." />
                  </SelectTrigger>
                  <SelectContent>
                    {rules.map((rule) => (
                      <SelectItem key={rule.id} value={rule.id}>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            Peso {rule.weight}
                          </span>
                          <span className="text-sm">{rule.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedRuleId && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center gap-2 text-orange-700 text-sm font-medium mb-2">
                    <AlertTriangle className="h-4 w-4" />
                    Prévia da Multa
                  </div>
                  <p className="text-sm text-orange-600">
                    Esta infração resultará em uma dedução estimada de{' '}
                    <strong>{formatCurrency(calculateDeductionPreview(rules.find(r => r.id === selectedRuleId)?.weight || 1))}</strong>
                  </p>
                </div>
              )}
              
              <div>
                <Label htmlFor="notes">Observações (opcional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Adicione detalhes sobre o que aconteceu..."
                />
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700">
                  <strong>Registrado por:</strong> {currentParent?.name} ({currentParent?.role})
                </p>
                <p className="text-sm text-blue-600">
                  <strong>Data/Hora:</strong> {formatDateTime(new Date())}
                </p>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={!selectedRuleId}>
                  Registrar Infração
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Infrações Recentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Infrações Recentes ({recentInfractions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentInfractions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-lg font-medium mb-2 text-green-600">Nenhuma infração registrada!</h3>
              <p className="text-muted-foreground">A criança está se comportando muito bem.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentInfractions.map((infraction) => (
                <Card key={infraction.id} className="border-l-4 border-l-red-400">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <ImageWithFallback
                        src={infraction.imageUrl}
                        alt={infraction.ruleName}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm leading-tight text-red-800">
                          {infraction.ruleName}
                        </h4>
                        
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDateTime(infraction.date)}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {infraction.registeredBy}
                          </div>
                        </div>
                        
                        {infraction.notes && (
                          <p className="text-xs text-muted-foreground mt-2 bg-gray-50 p-2 rounded">
                            <strong>Obs:</strong> {infraction.notes}
                          </p>
                        )}
                      </div>
                      
                      <Badge className={`text-white ${getWeightColor(infraction.weight)}`}>
                        Peso {infraction.weight}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Regras Disponíveis */}
      <Card>
        <CardHeader>
          <CardTitle>⚖️ Regras Disponíveis para Registro</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {rules.map((rule) => (
              <div 
                key={rule.id} 
                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setSelectedRuleId(rule.id);
                  setIsDialogOpen(true);
                }}
              >
                <ImageWithFallback
                  src={rule.imageUrl}
                  alt={rule.name}
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{rule.name}</p>
                  <p className="text-xs text-muted-foreground">{rule.description}</p>
                </div>
                <Badge className={`text-white text-xs ${getWeightColor(rule.weight)}`}>
                  {rule.weight}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}