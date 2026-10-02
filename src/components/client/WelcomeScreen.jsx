import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCPF } from '../../utils/formatters';
import { 
  QrCode, 
  ArrowRight, 
  Search, 
  Clock,
  Flame,
  ChefHat,
  UtensilsCrossed
} from 'lucide-react';

export const WelcomeScreen = () => {
  const { 
    customerCpf, 
    setCustomerCpf, 
    setCurrentScreen, 
    setActiveOrderCode 
  } = useApp();

  const [activeTab, setActiveTab] = useState('NEW_ORDER'); // 'NEW_ORDER' | 'TRACK_ORDER'
  const [cpfInput, setCpfInput] = useState(customerCpf || '');
  const [errorMsg, setErrorMsg] = useState('');
  const [trackCodeInput, setTrackCodeInput] = useState('');

  const handleCpfSubmit = (e) => {
    e.preventDefault();
    const clean = cpfInput.replace(/\D/g, '');

    if (clean.length > 0 && clean.length !== 11) {
      setErrorMsg('Por favor, digite um CPF válido com 11 dígitos.');
      return;
    }

    setCustomerCpf(cpfInput);
    setCurrentScreen('CLIENT_CATALOG');
  };

  const handleGuestContinue = () => {
    setCustomerCpf('');
    setCurrentScreen('CLIENT_CATALOG');
  };

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!trackCodeInput.trim()) return;
    setActiveOrderCode(trackCodeInput.trim());
    setCurrentScreen('CLIENT_KDS');
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-transparent relative overflow-hidden">
      
      {/* Luzes ambiente de fundo discretas (âmbar quente, sem azul) */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-6 relative z-10">
        
        {/* Cabeçalho de Boas-vindas Limpo */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <QrCode className="w-3.5 h-3.5" />
            <span>Mesa 04 Conectada</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Seja Bem-vindo ao <span className="text-amber-500">Da Praça</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
            Hambúrgueres artesanais na brasa, smash crocantes e acompanhamentos preparados na hora.
          </p>
        </div>

        {/* Card Principal em Preto Fosco com Degrade */}
        <div className="bg-gradient-to-b from-[#18181c]/95 via-[#121215]/95 to-[#0c0c0e]/95 border border-zinc-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
          
          {/* Seletor de Modo: Fazer Pedido vs Rastrear */}
          <div className="flex bg-[#09090b] p-1.5 rounded-2xl border border-zinc-800/80">
            <button
              type="button"
              onClick={() => setActiveTab('NEW_ORDER')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                activeTab === 'NEW_ORDER'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 shadow-md shadow-orange-500/20 font-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Fazer Pedido</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('TRACK_ORDER')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                activeTab === 'TRACK_ORDER'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 shadow-md shadow-orange-500/20 font-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Já Tenho Pedido</span>
            </button>
          </div>

          {/* Conteúdo Aba: Fazer Novo Pedido */}
          {activeTab === 'NEW_ORDER' && (
            <form onSubmit={handleCpfSubmit} className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1 text-center">
                <label className="block text-xs font-bold text-zinc-300">
                  CPF do Cliente <span className="text-zinc-500 font-normal">(opcional)</span>
                </label>
                <p className="text-[11px] text-zinc-500">
                  Informe para pontuar no programa fidelidade ou entre direto:
                </p>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={cpfInput}
                  onChange={(e) => {
                    setCpfInput(formatCPF(e.target.value));
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="000.000.000-00"
                  maxLength={14}
                  inputMode="numeric"
                  className={`w-full bg-[#09090b] border ${
                    errorMsg ? 'border-red-500 focus:ring-red-500/30' : 'border-zinc-800 focus:border-amber-500 focus:ring-amber-500/30'
                  } rounded-2xl px-4 py-3.5 text-lg font-mono font-bold text-center tracking-wider text-white placeholder-zinc-600 focus:outline-none focus:ring-2 transition shadow-inner`}
                  autoFocus
                />

                {errorMsg && (
                  <p className="text-xs text-red-400 font-semibold mt-1.5 text-center">
                    {errorMsg}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full group py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-zinc-950 font-black text-sm sm:text-base transition-all duration-200 flex items-center justify-center space-x-2 shadow-xl shadow-orange-500/25 active:scale-[0.98]"
              >
                <span>Ver Cardápio & Iniciar Pedido</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={handleGuestContinue}
                  className="text-xs font-semibold text-zinc-400 hover:text-amber-400 transition"
                >
                  Continuar sem informar CPF (Visitante)
                </button>
              </div>
            </form>
          )}

          {/* Conteúdo Aba: Rastrear Pedido */}
          {activeTab === 'TRACK_ORDER' && (
            <form onSubmit={handleTrackSubmit} className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1 text-center">
                <label className="block text-xs font-bold text-zinc-300">
                  Número ou Código do Pedido
                </label>
                <p className="text-[11px] text-zinc-500">
                  Acompanhe a preparação na cozinha em tempo real:
                </p>
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold text-lg font-mono">
                  #
                </span>
                <input
                  type="text"
                  value={trackCodeInput}
                  onChange={(e) => setTrackCodeInput(e.target.value)}
                  placeholder="Ex: 1040"
                  className="w-full bg-[#09090b] border border-zinc-800 rounded-2xl pl-10 pr-4 py-3.5 text-lg font-mono font-bold text-center tracking-wider text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={!trackCodeInput.trim()}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 text-zinc-950 font-black text-sm sm:text-base transition flex items-center justify-center space-x-2 shadow-lg shadow-orange-500/20"
              >
                <Search className="w-4 h-4" />
                <span>Rastrear Pedido no KDS</span>
              </button>
            </form>
          )}

          {/* Benefícios Rápidos em Linha Discreta */}
          <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-around text-center">
            <div className="flex flex-col items-center space-y-1 text-zinc-400 text-[11px]">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>Na Brasa</span>
            </div>
            <div className="w-px h-6 bg-zinc-800" />
            <div className="flex flex-col items-center space-y-1 text-zinc-400 text-[11px]">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>~15 min</span>
            </div>
            <div className="w-px h-6 bg-zinc-800" />
            <div className="flex flex-col items-center space-y-1 text-zinc-400 text-[11px]">
              <ChefHat className="w-4 h-4 text-amber-400" />
              <span>Pão Brioche</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

