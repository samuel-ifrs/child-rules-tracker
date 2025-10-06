import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { RulesManagement } from './components/RulesManagement';
import { InfractionsManagement } from './components/InfractionsManagement';
import { History } from './components/History';
import { ParentsManagement } from './components/ParentsManagement';
import { Navigation } from './components/Navigation';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Rule, Infraction, Parent, WeeklyAllowance, Screen } from './types';
import { defaultRules, defaultParents } from './data/mockData';
import { getCurrentWeek, getWeekStart } from './utils/calculations';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

export default function App() {
  // Infrações de exemplo para mostrar R$ 20 restantes
  const exampleInfractions: Infraction[] = [
    {
      id: 'example1',
      ruleId: '10',
      ruleName: 'DEIXAR ROUPA OU CALÇADO FORA DO LUGAR',
      weight: 2,
      date: new Date().toISOString(),
      registeredBy: 'Mamãe',
      registeredById: '2',
      imageUrl: 'https://images.unsplash.com/photo-1598838909554-7ed3ccba096d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXNzeSUyMHJvb20lMjB0b3lzJTIwc2NhdHRlcmVkfGVufDF8fHx8MTc1OTcxNzMzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'example2',
      ruleId: '12',
      ruleName: 'DEIXAR BRINQUEDOS OU TECIDOS FORA DO LUGAR',
      weight: 2,
      date: new Date().toISOString(),
      registeredBy: 'Papai',
      registeredById: '1',
      imageUrl: 'https://images.unsplash.com/photo-1598838909554-7ed3ccba096d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXNzeSUyMHJvb20lMjB0b3lzJTIwc2NhdHRlcmVkfGVufDF8fHx8MTc1OTcxNzMzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'example3',
      ruleId: '14',
      ruleName: 'NÃO ALIMENTAR O COSMO',
      weight: 4,
      date: new Date().toISOString(),
      registeredBy: 'Mamãe',
      registeredById: '2',
      imageUrl: 'https://images.unsplash.com/photo-1719463814216-9216db4b98c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwZXQlMjBkb2clMjBmZWVkaW5nfGVufDF8fHx8MTc1OTcxNzMzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  // Estados do localStorage
  const [rules, setRules] = useLocalStorage<Rule[]>('rules', defaultRules);
  const [infractions, setInfractions] = useLocalStorage<Infraction[]>('infractions', exampleInfractions);
  const [parents, setParents] = useLocalStorage<Parent[]>('parents', defaultParents);
  const [weeklyAllowances, setWeeklyAllowances] = useLocalStorage<WeeklyAllowance[]>('weeklyAllowances', []);

  // Estados da aplicação
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [currentParentId, setCurrentParentId] = useState<string>('');
  const [isParentMode, setIsParentMode] = useState(false);

  // Obter semanada atual
  const getCurrentWeekAllowance = (): WeeklyAllowance | null => {
    const { start } = getCurrentWeek();
    const currentWeekInfractions = infractions.filter(infraction => {
      const infractionWeekStart = getWeekStart(infraction.date);
      return infractionWeekStart.getTime() === start.getTime();
    });

    if (currentWeekInfractions.length === 0) return null;

    return {
      weekStart: start,
      baseAmount: 100,
      totalDeductions: 0, // Calculado dinamicamente
      remainingAmount: 0, // Calculado dinamicamente
      infractions: currentWeekInfractions,
      paid: false
    };
  };

  const currentWeekAllowance = getCurrentWeekAllowance();
  const currentParent = parents.find(p => p.id === currentParentId);

  // Handlers
  const handleLogin = (parentId: string) => {
    setCurrentParentId(parentId);
    setIsParentMode(true);
    setCurrentScreen('dashboard');
    const parent = parents.find(p => p.id === parentId);
    toast.success(`Bem-vindo(a), ${parent?.name}!`);
  };

  const handleChildAccess = () => {
    setCurrentParentId('');
    setIsParentMode(false);
    setCurrentScreen('dashboard');
    toast.success('Bem-vinda, princesa! 👑');
  };

  const handleLogout = () => {
    setCurrentParentId('');
    setIsParentMode(false);
    setCurrentScreen('login');
    toast.info('Sessão finalizada');
  };

  // CRUD Rules
  const handleAddRule = (rule: Omit<Rule, 'id'>) => {
    const newRule: Rule = {
      ...rule,
      id: Date.now().toString()
    };
    setRules([...rules, newRule]);
    toast.success('Regra criada com sucesso!');
  };

  const handleUpdateRule = (id: string, updatedRule: Omit<Rule, 'id'>) => {
    setRules(rules.map(rule => rule.id === id ? { ...updatedRule, id } : rule));
    toast.success('Regra atualizada com sucesso!');
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
    toast.success('Regra excluída com sucesso!');
  };

  // CRUD Infractions
  const handleAddInfraction = (infraction: Omit<Infraction, 'id'>) => {
    const newInfraction: Infraction = {
      ...infraction,
      id: Date.now().toString(),
      date: typeof infraction.date === 'string' ? infraction.date : infraction.date.toISOString()
    };
    setInfractions([...infractions, newInfraction]);
    toast.error(`Infração registrada: ${infraction.ruleName}`);
  };

  // CRUD Parents
  const handleAddParent = (parent: Omit<Parent, 'id'>) => {
    const newParent: Parent = {
      ...parent,
      id: Date.now().toString()
    };
    setParents([...parents, newParent]);
    toast.success('Responsável adicionado com sucesso!');
  };

  const handleUpdateParent = (id: string, updatedParent: Omit<Parent, 'id'>) => {
    setParents(parents.map(parent => parent.id === id ? { ...updatedParent, id } : parent));
    toast.success('Responsável atualizado com sucesso!');
  };

  const handleDeleteParent = (id: string) => {
    setParents(parents.filter(parent => parent.id !== id));
    toast.success('Responsável removido com sucesso!');
  };

  // Renderização condicional das telas
  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <Login
            parents={parents}
            onLogin={handleLogin}
            onChildAccess={handleChildAccess}
          />
        );
      case 'dashboard':
        return (
          <Dashboard
            currentWeekAllowance={currentWeekAllowance}
            recentInfractions={infractions.slice(-5)}
            rules={rules}
          />
        );
      case 'rules':
        return isParentMode ? (
          <RulesManagement
            rules={rules}
            onAddRule={handleAddRule}
            onUpdateRule={handleUpdateRule}
            onDeleteRule={handleDeleteRule}
          />
        ) : null;
      case 'infractions':
        return isParentMode ? (
          <InfractionsManagement
            rules={rules}
            infractions={infractions}
            parents={parents}
            currentParentId={currentParentId}
            onAddInfraction={handleAddInfraction}
          />
        ) : null;
      case 'history':
        return isParentMode ? (
          <History
            weeklyAllowances={weeklyAllowances}
            allInfractions={infractions}
          />
        ) : null;
      case 'parents':
        return isParentMode ? (
          <ParentsManagement
            parents={parents}
            onAddParent={handleAddParent}
            onUpdateParent={handleUpdateParent}
            onDeleteParent={handleDeleteParent}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {currentScreen !== 'login' && (
        <Navigation
          currentScreen={currentScreen}
          onScreenChange={setCurrentScreen}
          onLogout={handleLogout}
          isParentMode={isParentMode}
          parentName={currentParent?.name}
        />
      )}
      
      <main className="container mx-auto max-w-6xl">
        {renderScreen()}
      </main>

      <Toaster position="top-right" richColors />
    </div>
  );
}