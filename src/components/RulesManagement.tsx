import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Rule } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Plus, Edit3, Trash2 } from 'lucide-react';

interface RulesManagementProps {
  rules: Rule[];
  onAddRule: (rule: Omit<Rule, 'id'>) => void;
  onUpdateRule: (id: string, rule: Omit<Rule, 'id'>) => void;
  onDeleteRule: (id: string) => void;
}

export function RulesManagement({ rules, onAddRule, onUpdateRule, onDeleteRule }: RulesManagementProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<Rule | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    weight: 1,
    imageUrl: '',
    category: 'comportamento' as Rule['category']
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      weight: 1,
      imageUrl: '',
      category: 'comportamento'
    });
    setEditingRule(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingRule) {
      onUpdateRule(editingRule.id, formData);
    } else {
      onAddRule(formData);
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (rule: Rule) => {
    setEditingRule(rule);
    setFormData({
      name: rule.name,
      description: rule.description,
      weight: rule.weight,
      imageUrl: rule.imageUrl,
      category: rule.category
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (ruleId: string) => {
    if (confirm('Tem certeza que deseja excluir esta regra?')) {
      onDeleteRule(ruleId);
    }
  };

  const getWeightColor = (weight: number) => {
    if (weight >= 8) return 'bg-red-500';
    if (weight >= 5) return 'bg-orange-500';
    if (weight >= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getCategoryLabel = (category: Rule['category']) => {
    const labels = {
      higiene: '🧼 Higiene',
      comportamento: '😊 Comportamento',
      responsabilidade: '📋 Responsabilidade',
      seguranca: '🛡️ Segurança',
      alimentacao: '🍎 Alimentação'
    };
    return labels[category];
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-purple-600">⚖️ Gerenciar Regras</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Regra
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingRule ? 'Editar Regra' : 'Nova Regra'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome da Regra</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight">Peso (1-10)</Label>
                  <Input
                    id="weight"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value: Rule['category']) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="higiene">🧼 Higiene</SelectItem>
                      <SelectItem value="comportamento">😊 Comportamento</SelectItem>
                      <SelectItem value="responsabilidade">📋 Responsabilidade</SelectItem>
                      <SelectItem value="seguranca">🛡️ Segurança</SelectItem>
                      <SelectItem value="alimentacao">🍎 Alimentação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="imageUrl">URL da Imagem</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://exemplo.com/imagem.jpg"
                  required
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingRule ? 'Salvar' : 'Criar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {rules.map((rule) => (
          <Card key={rule.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <ImageWithFallback
                  src={rule.imageUrl}
                  alt={rule.name}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium text-sm leading-tight">{rule.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{rule.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(rule)}
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(rule.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={`text-white ${getWeightColor(rule.weight)}`}>
                      Peso {rule.weight}
                    </Badge>
                    <Badge variant="secondary">
                      {getCategoryLabel(rule.category)}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {rules.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium mb-2">Nenhuma regra cadastrada</h3>
            <p className="text-muted-foreground mb-4">Comece criando as primeiras regras para sua filha.</p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Criar primeira regra
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}