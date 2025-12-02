import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { ActivityLog } from './components/ActivityLog';
import { YieldPrediction } from './components/YieldPrediction';
import { CropRecommendation } from './components/CropRecommendation';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Sprout, Droplets, TrendingUp, Lightbulb, LogOut } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [authState, setAuthState] = useState<'login' | 'register' | 'authenticated'>('login');
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);

  const handleLogin = (email: string, password: string) => {
    // Simulate login
    setUser({ username: email.split('@')[0], email });
    setAuthState('authenticated');
  };

  const handleRegister = (username: string, email: string, password: string) => {
    // Simulate registration
    setUser({ username, email });
    setAuthState('authenticated');
  };

  const handleLogout = () => {
    setUser(null);
    setAuthState('login');
    setActiveTab('dashboard');
  };

  // Show auth screens if not authenticated
  if (authState === 'login') {
    return (
      <Login
        onLogin={handleLogin}
        onSwitchToRegister={() => setAuthState('register')}
      />
    );
  }

  if (authState === 'register') {
    return (
      <Register
        onRegister={handleRegister}
        onSwitchToLogin={() => setAuthState('login')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <header className="bg-green-600 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sprout className="w-8 h-8" />
            <div>
              <h1 className="text-xl">AgriTrack AI</h1>
              <p className="text-sm text-green-100">Aqlli fermer yordamchisi</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-green-700 px-3 py-2 rounded-lg active:bg-green-800"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Chiqish</span>
          </button>
        </div>
        {user && (
          <p className="text-sm text-green-100 mt-2">Xush kelibsiz, {user.username}!</p>
        )}
      </header>

      <main className="pb-20">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'log' && <ActivityLog />}
        {activeTab === 'prediction' && <YieldPrediction />}
        {activeTab === 'recommend' && <CropRecommendation />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center p-3 flex-1 ${
              activeTab === 'dashboard' ? 'text-green-600' : 'text-gray-600'
            }`}
          >
            <TrendingUp className="w-6 h-6" />
            <span className="text-xs mt-1">Bosh sahifa</span>
          </button>
          <button
            onClick={() => setActiveTab('log')}
            className={`flex flex-col items-center p-3 flex-1 ${
              activeTab === 'log' ? 'text-green-600' : 'text-gray-600'
            }`}
          >
            <Droplets className="w-6 h-6" />
            <span className="text-xs mt-1">Jurnal</span>
          </button>
          <button
            onClick={() => setActiveTab('prediction')}
            className={`flex flex-col items-center p-3 flex-1 ${
              activeTab === 'prediction' ? 'text-green-600' : 'text-gray-600'
            }`}
          >
            <Sprout className="w-6 h-6" />
            <span className="text-xs mt-1">Dalalar</span>
          </button>
          <button
            onClick={() => setActiveTab('recommend')}
            className={`flex flex-col items-center p-3 flex-1 ${
              activeTab === 'recommend' ? 'text-green-600' : 'text-gray-600'
            }`}
          >
            <Lightbulb className="w-6 h-6" />
            <span className="text-xs mt-1">Tavsiyalar</span>
          </button>
        </div>
      </nav>
    </div>
  );
}