import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Parent } from '../types';

interface LoginProps {
  parents: Parent[];
  onLogin: (parentId: string) => void;
  onChildAccess: () => void;
}

export function Login({ parents, onLogin, onChildAccess }: LoginProps) {
  const [selectedParent, setSelectedParent] = useState<string>('');
  const [password, setPassword] = useState('');

  const handleParentLogin = () => {
    if (selectedParent && password === '123') {
      onLogin(selectedParent);
    } else {
      alert('Senha incorreta! Use "123" para demonstração.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Card className="border-4 border-pink-300 rounded-3xl shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <div className="text-6xl mb-3">👑</div>
            <CardTitle className="text-3xl text-pink-600">Semanada da Princesa</CardTitle>
            <p className="text-purple-600 text-lg">Sistema de Regras Mágico ✨</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button 
              onClick={onChildAccess}
              className="w-full h-20 text-2xl bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white border-0 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              🎀 Olá, Princesa! 👑
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t-2 border-purple-300" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-purple-600 text-lg">ou</span>
              </div>
            </div>

            <div className="space-y-4 bg-purple-50 p-4 rounded-2xl border-2 border-purple-200">
              <div>
                <Label className="text-purple-700 text-lg">👨‍👩‍👧 Acesso dos Responsáveis</Label>
                <select 
                  className="w-full mt-2 p-3 border-2 border-purple-300 rounded-xl text-lg bg-white"
                  value={selectedParent}
                  onChange={(e) => setSelectedParent(e.target.value)}
                >
                  <option value="">Selecione o responsável</option>
                  {parents.map(parent => (
                    <option key={parent.id} value={parent.id}>
                      {parent.name} ({parent.role})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label htmlFor="password" className="text-purple-700 text-lg">🔒 Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite a senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 p-3 border-2 border-purple-300 rounded-xl text-lg"
                />
                <p className="text-purple-600 text-sm mt-2">
                  💡 Para demonstração, use: 123
                </p>
              </div>
              
              <Button 
                onClick={handleParentLogin}
                disabled={!selectedParent || !password}
                className="w-full h-12 text-lg bg-purple-500 hover:bg-purple-600 rounded-xl"
              >
                Entrar como Responsável
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}