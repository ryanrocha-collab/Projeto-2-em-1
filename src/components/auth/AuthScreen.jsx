import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import logoImg from '../../assets/da_praca_logo.png';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ChefHat, 
  Store, 
  ShieldAlert, 
  UserPlus, 
  LogIn, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  UtensilsCrossed 
} from 'lucide-react';

export const AuthScreen = () => {
  const { loginUser, setCurrentScreen } = useApp();

  const [mode, setMode] = useState('LOGIN'); // 'LOGIN' | 'REGISTER'
  const [role, setRole] = useState('ADMIN'); // 'ADMIN' | 'KITCHEN' | 'COUNTER'
  const [email, setEmail] = useState('lucas@dapraca.com');
  const [password, setPassword] = useState('123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Preencha os campos de email e senha.');
      return;
    }

    if (password.length < 3) {
      setErrorMsg('A senha deve ter pelo menos 3 caracteres.');
      return;
    }

    setErrorMsg('');
    if (mode === 'REGISTER') {
      setSuccessMsg('Conta criada com sucesso! Conectando ao sistema...');
      setTimeout(() => {
        loginUser(email, password, role);
      }, 700);
    } else {
      loginUser(email, password, role);
    }
  };

  const handleQuickDemo = (demoRole) => {
    const demoCredentials = {
      ADMIN: { email: 'lucas@dapraca.com', pass: '123' },
      KITCHEN: { email: 'cozinha@dapraca.com', pass: '123' },
      COUNTER: { email: 'balcao@dapraca.com', pass: '123' },
    };

    const cred = demoCredentials[demoRole] || demoCredentials.ADMIN;
    setEmail(cred.email);
    setPassword(cred.pass);
    setRole(demoRole);
    loginUser(cred.email, cred.pass, demoRole);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 bg-transparent text-zinc-100">
      <div className="max-w-md w-full space-y-6">
        
        {/* Header Title with Logo */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <img 
              src="/logo.png" 
              onError={(e) => {
                if (e.currentTarget.src !== logoImg) {
                  e.currentTarget.src = logoImg;
                }
              }}
              alt="Da Praça Burger" 
              className="h-16 w-auto object-contain"
            />
          </div>

          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-800/90 text-amber-400 text-xs font-bold border border-zinc-700">
            <ShieldCheck className="w-4 h-4" />
            <span>Portal de Acesso & Operação</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-white">
            Sistema Da Praça Burger
          </h1>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Login para o Lucas (Dashboard & Gestão), Cozinha (Tablet KDS) e Balcão (Caixa & Pedidos)
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* Mode Tabs: Login vs Registro */}
          <div className="grid grid-cols-2 p-1 bg-[#09090b] rounded-2xl border border-zinc-800">
            <button
              type="button"
              onClick={() => {
                setMode('LOGIN');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer ${
                mode === 'LOGIN'
                  ? 'bg-amber-500 text-zinc-950 shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Entrar</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('REGISTER');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer ${
                mode === 'REGISTER'
                  ? 'bg-amber-500 text-zinc-950 shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Criar Conta</span>
            </button>
          </div>

          {/* Role selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
              Perfil de Acesso
            </label>
            <div className="grid grid-cols-3 gap-2">
              
              {/* Administrador (Lucas) */}
              <button
                type="button"
                onClick={() => {
                  setRole('ADMIN');
                  setEmail('lucas@dapraca.com');
                }}
                className={`p-3 rounded-xl border text-center transition flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                  role === 'ADMIN'
                    ? 'bg-amber-500/15 border-amber-500 text-amber-400 shadow-sm font-bold'
                    : 'bg-[#09090b] border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <span className="text-[11px] font-bold">Lucas / Admin</span>
              </button>

              {/* Balconista */}
              <button
                type="button"
                onClick={() => {
                  setRole('COUNTER');
                  setEmail('balcao@dapraca.com');
                }}
                className={`p-3 rounded-xl border text-center transition flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                  role === 'COUNTER'
                    ? 'bg-amber-500/15 border-amber-500 text-amber-400 shadow-sm font-bold'
                    : 'bg-[#09090b] border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <Store className="w-5 h-5 text-amber-400" />
                <span className="text-[11px] font-bold">Balcão / Caixa</span>
              </button>

              {/* Cozinha */}
              <button
                type="button"
                onClick={() => {
                  setRole('KITCHEN');
                  setEmail('cozinha@dapraca.com');
                }}
                className={`p-3 rounded-xl border text-center transition flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                  role === 'KITCHEN'
                    ? 'bg-orange-500/15 border-orange-500 text-orange-400 shadow-sm font-bold'
                    : 'bg-[#09090b] border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <ChefHat className="w-5 h-5 text-orange-400" />
                <span className="text-[11px] font-bold">Cozinha KDS</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                E-mail ou Usuário
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="lucas@dapraca.com"
                  className="w-full bg-[#09090b] border border-zinc-800 rounded-xl pl-10 pr-3.5 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Senha */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Senha
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#09090b] border border-zinc-800 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 p-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-2.5 text-center">
                {errorMsg}
              </p>
            )}

            {successMsg && (
              <p className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2.5 text-center flex items-center justify-center space-x-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>{successMsg}</span>
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-sm flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 transition active:scale-[0.98] cursor-pointer"
            >
              <span>{mode === 'LOGIN' ? 'Entrar no Sistema' : 'Cadastrar e Entrar'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access (1-Click) */}
          <div className="pt-4 border-t border-zinc-800 space-y-2">
            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider text-center">
              Acesso Rápido de Teste (1 Clique):
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('ADMIN')}
                className="py-2.5 px-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-300 text-xs font-bold transition border border-amber-500/40 text-center cursor-pointer"
              >
                👑 Lucas (Dashboard)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('COUNTER')}
                className="py-2.5 px-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-400 text-xs font-bold transition border border-zinc-700 text-center cursor-pointer"
              >
                💁 Balcão (Pedidos)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('KITCHEN')}
                className="py-2.5 px-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-orange-400 text-xs font-bold transition border border-zinc-700 text-center cursor-pointer"
              >
                🍳 Cozinha KDS
              </button>
            </div>
          </div>

          {/* Link para Fazer Pedido de Mesa (Autoatendimento) */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => setCurrentScreen('CLIENT_CATALOG')}
              className="text-xs text-zinc-400 hover:text-amber-400 transition inline-flex items-center space-x-1 cursor-pointer"
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Deseja apenas ver o Cardápio e fazer pedido? Clique aqui</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
