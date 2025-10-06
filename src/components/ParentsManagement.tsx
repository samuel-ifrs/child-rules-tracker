import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Parent } from '../types';
import { Plus, Edit3, Trash2, User } from 'lucide-react';

interface ParentsManagementProps {
  parents: Parent[];
  onAddParent: (parent: Omit<Parent, 'id'>) => void;
  onUpdateParent: (id: string, parent: Omit<Parent, 'id'>) => void;
  onDeleteParent: (id: string) => void;
}

export function ParentsManagement({ parents, onAddParent, onUpdateParent, onDeleteParent }: ParentsManagementProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingParent, setEditingParent] = useState<Parent | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: 'pai' as Parent['role']
  });

  const resetForm = () => {
    setFormData({
      name: '',
      role: 'pai'
    });
    setEditingParent(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingParent) {
      onUpdateParent(editingParent.id, formData);
    } else {
      onAddParent(formData);
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (parent: Parent) => {
    setEditingParent(parent);
    setFormData({
      name: parent.name,
      role: parent.role
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (parentId: string) => {
    if (parents.length <= 1) {
      alert('Deve haver pelo menos um responsável cadastrado!');
      return;
    }
    
    if (confirm('Tem certeza que deseja excluir este responsável?')) {
      onDeleteParent(parentId);
    }
  };

  const getRoleLabel = (role: Parent['role']) => {
    const labels = {
      pai: '👨 Pai',
      mae: '👩 Mãe',
      avo: '👴 Avô',
      'avó': '👵 Avó',
      tio: '👨‍🦱 Tio',
      tia: '👩‍🦱 Tia',
      professor: '👨‍🏫 Professor'
    };
    return labels[role];
  };

  const getRoleColor = (role: Parent['role']) => {
    const colors = {
      pai: 'bg-blue-500',
      mae: 'bg-pink-500',
      avo: 'bg-gray-500',
      'avó': 'bg-gray-500',
      tio: 'bg-green-500',
      tia: 'bg-purple-500',
      professor: 'bg-orange-500'
    };
    return colors[role];
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-purple-600">👥 Gerenciar Responsáveis</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Responsável
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingParent ? 'Editar Responsável' : 'Novo Responsável'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nome do responsável"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="role">Papel/Função</Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value: Parent['role']) => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pai">👨 Pai</SelectItem>
                    <SelectItem value="mae">👩 Mãe</SelectItem>
                    <SelectItem value="avo">👴 Avô</SelectItem>
                    <SelectItem value="avó">👵 Avó</SelectItem>
                    <SelectItem value="tio">👨‍🦱 Tio</SelectItem>
                    <SelectItem value="tia">👩‍🦱 Tia</SelectItem>
                    <SelectItem value="professor">👨‍🏫 Professor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingParent ? 'Salvar' : 'Criar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Responsáveis Cadastrados ({parents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {parents.map((parent) => (
              <Card key={parent.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-600" />
                      </div>
                      
                      <div>
                        <h3 className="font-medium">{parent.name}</h3>
                        <Badge className={`text-white ${getRoleColor(parent.role)}`}>
                          {getRoleLabel(parent.role)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(parent)}
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(parent.id)}
                        disabled={parents.length <= 1}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">ℹ️ Informações Importantes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-blue-700">
            <p>• Todos os responsáveis podem registrar infrações</p>
            <p>• A senha padrão para demonstração é "123"</p>
            <p>• Deve haver pelo menos um responsável cadastrado</p>
            <p>• O nome do responsável aparece no registro das infrações</p>
          </div>
        </CardContent>
      </Card>

      {parents.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-lg font-medium mb-2">Nenhum responsável cadastrado</h3>
            <p className="text-muted-foreground mb-4">Adicione pelo menos um responsável para começar.</p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar primeiro responsável
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}