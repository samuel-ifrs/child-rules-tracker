import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Screen } from '../types';
import { 
  Home, 
  Settings, 
  FileText, 
  History, 
  Users, 
  LogOut,
  Crown
} from 'lucide-react';

interface NavigationProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
  onLogout: () => void;
  isParentMode: boolean;
  parentName?: string;
}

export function Navigation({ 
  currentScreen, 
  onScreenChange, 
  onLogout, 
  isParentMode,
  parentName 
}: NavigationProps) {
  const childScreens = [
    { id: 'dashboard' as const, label: '🏰 Minha Semanada', icon: Home }
  ];

  const parentScreens = [
    { id: 'dashboard' as const, label: '📊 Dashboard', icon: Home },
    { id: 'rules' as const, label: '⚙️ Gerenciar Regras', icon: Settings },
    { id: 'infractions' as const, label: '📝 Registrar Infrações', icon: FileText },
    { id: 'history' as const, label: '📚 Histórico', icon: History },
    { id: 'parents' as const, label: '👥 Responsáveis', icon: Users }
  ];

  const screens = isParentMode ? parentScreens : childScreens;

  return (
    <Card className="border-4 border-pink-300 bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl mx-4 mt-4 shadow-xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {/* Logo/Title */}
          <div className="flex items-center gap-3">
            <div className="text-3xl">👑</div>
            <h1 className="text-2xl text-purple-600">
              Semanada da Princesa
            </h1>
          </div>

          {/* User Info */}
          {isParentMode && parentName && (
            <div className="text-purple-600 bg-white/60 px-4 py-2 rounded-2xl border-2 border-purple-200">
              👤 <strong>{parentName}</strong>
            </div>
          )}
          
          {!isParentMode && (
            <div className="text-pink-600 bg-white/60 px-4 py-2 rounded-2xl border-2 border-pink-200">
              👑 <strong>Princesa</strong>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-3 flex-wrap">
            {screens.map((screen) => {
              const Icon = screen.icon;
              return (
                <Button
                  key={screen.id}
                  variant={currentScreen === screen.id ? 'default' : 'outline'}
                  size="lg"
                  onClick={() => onScreenChange(screen.id)}
                  className={`${
                    currentScreen === screen.id 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0' 
                      : 'border-2 border-purple-300 text-purple-600 bg-white/60 hover:bg-purple-50'
                  } rounded-2xl text-base transition-all duration-200 transform hover:scale-105`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {screen.label}
                </Button>
              );
            })}
          </div>

          {/* Logout */}
          <Button
            variant="outline"
            size="lg"
            onClick={onLogout}
            className="border-2 border-red-300 text-red-600 hover:text-red-700 hover:bg-red-50 bg-white/60 rounded-2xl transition-all duration-200 transform hover:scale-105"
          >
            <LogOut className="h-5 w-5 mr-2" />
            {isParentMode ? '🚪 Sair' : '👨‍👩‍👧 Modo Responsável'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}