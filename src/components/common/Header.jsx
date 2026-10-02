import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import logoImg from '../../assets/da_praca_logo.png';
import { 
  ShoppingBag, 
  ChefHat, 
  Store, 
  Search, 
  User, 
  LogOut, 
  Menu, 
  X, 
  UtensilsCrossed, 
  Clock, 
  ChevronDown,
  BarChart3,
  Users,
  Beef
} from 'lucide-react';

export const Header = () => {
  const {
    currentScreen,
    setCurrentScreen,
    cartItemCount,
    customerCpf,
    currentUser,
    logoutUser,
    activeOrderCode,
    setActiveOrderCode,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [staffDropdownOpen, setStaffDropdownOpen] = useState(false);
  const [trackModalOpen, setTrackModalOpen] = useState(false);
  const [trackInputCode, setTrackInputCode] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setStaffDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (trackInputCode.trim()) {
      setActiveOrderCode(trackInputCode.trim());
      setCurrentScreen('CLIENT_KDS');
      setTrackModalOpen(false);
      setTrackInputCode('');
      setMobileMenuOpen(false);
    }
  };

  const isCustomerFlow = ['CLIENT_WELCOME', 'CLIENT_CATALOG', 'CLIENT_CART', 'CLIENT_PAYMENT'].includes(currentScreen);
  const isStaffFlow = ['KITCHEN_KDS', 'COUNTER', 'AUTH', 'LUCAS_DASHBOARD', 'ADMIN_USERS', 'ADMIN_PRODUCTS'].includes(currentScreen);

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-b from-[#18181c]/95 via-[#0e0e11]/95 to-[#09090b]/95 backdrop-blur-xl border-b border-zinc-800/80 text-zinc-100 shadow-2xl">
      {/* Container com largura fluida para colar a logo no canto esquerdo */}
      <div className="w-full px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo Livre de Balão (Totalmente solta e alinhada ao canto esquerdo) */}
          <div 
            className="flex items-center space-x-3 cursor-pointer select-none group py-1" 
            onClick={() => setCurrentScreen(customerCpf ? 'CLIENT_CATALOG' : 'CLIENT_WELCOME')}
            title="Ir para o início do Da Praça Burger"
          >
            <img 
              src="/logo.png" 
              onError={(e) => {
                if (e.currentTarget.src !== logoImg) {
                  e.currentTarget.src = logoImg;
                }
              }}
              alt="Da Praça Burger" 
              className="h-11 sm:h-13 md:h-15 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
            />
            
            <div className="hidden sm:flex flex-col leading-tight pl-1">
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30">
                  Mesa 04
                </span>
                <span className="text-[11px] font-bold text-emerald-400 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online</span>
                </span>
              </div>
              <span className="text-[11px] text-zinc-400 font-medium mt-0.5">
                Autoatendimento Digital
              </span>
            </div>
          </div>

          {/* Navegação Central Descomplicada em Preto Fosco */}
          <nav className="hidden md:flex items-center space-x-1.5 bg-[#121215]/90 p-1.5 rounded-2xl border border-zinc-800/80 shadow-inner">
            {/* Cardápio */}
            <button
              onClick={() => setCurrentScreen('CLIENT_CATALOG')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                isCustomerFlow
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 shadow-md shadow-orange-500/20 font-black'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Cardápio</span>
            </button>

            {/* Acompanhar Pedido (KDS Cliente) */}
            <button
              onClick={() => setCurrentScreen('CLIENT_KDS')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                currentScreen === 'CLIENT_KDS'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 shadow-md shadow-orange-500/20 font-black'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Acompanhar Pedido</span>
              {activeOrderCode && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                  currentScreen === 'CLIENT_KDS'
                    ? 'bg-zinc-950 text-amber-400'
                    : 'bg-zinc-800 text-amber-400 border border-zinc-700'
                }`}>
                  #{activeOrderCode}
                </span>
              )}
            </button>

            {/* Dropdown Área da Equipe */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setStaffDropdownOpen(!staffDropdownOpen)}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isStaffFlow
                    ? 'bg-zinc-800 text-amber-400 border border-amber-500/40'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                <span>Painel da Equipe</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${staffDropdownOpen ? 'rotate-180 text-amber-400' : ''}`} />
              </button>

              {staffDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-gradient-to-b from-[#18181c] to-[#0f0f12] border border-zinc-800 rounded-2xl p-2 shadow-2xl backdrop-blur-xl z-50 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider px-2 py-1 flex items-center space-x-1">
                    <span>👑 Gestão do Lucas:</span>
                  </p>

                  <button
                    onClick={() => {
                      setCurrentScreen('LUCAS_DASHBOARD');
                      setStaffDropdownOpen(false);
                    }}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                      currentScreen === 'LUCAS_DASHBOARD'
                        ? 'bg-amber-500 text-zinc-950 font-black'
                        : 'text-zinc-200 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4 text-amber-400" />
                    <div className="flex-1">
                      <p>Dashboard do Lucas</p>
                      <p className="text-[10px] font-normal text-zinc-400">Vendas, Lucro & Ranking</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentScreen('ADMIN_PRODUCTS');
                      setStaffDropdownOpen(false);
                    }}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                      currentScreen === 'ADMIN_PRODUCTS'
                        ? 'bg-amber-500 text-zinc-950 font-black'
                        : 'text-zinc-200 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    <Beef className="w-4 h-4 text-amber-400" />
                    <div className="flex-1">
                      <p>Gerenciar Produtos</p>
                      <p className="text-[10px] font-normal text-zinc-400">Adicionar e Alterar Cardápio</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentScreen('ADMIN_USERS');
                      setStaffDropdownOpen(false);
                    }}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                      currentScreen === 'ADMIN_USERS'
                        ? 'bg-amber-500 text-zinc-950 font-black'
                        : 'text-zinc-200 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    <Users className="w-4 h-4 text-amber-400" />
                    <div className="flex-1">
                      <p>Gerenciar Usuários</p>
                      <p className="text-[10px] font-normal text-zinc-400">Criar/Deletar Cozinha e Balcão</p>
                    </div>
                  </button>

                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-2 pt-2 pb-1 border-t border-zinc-800/80">
                    Operação em Tempo Real:
                  </p>
                  
                  <button
                    onClick={() => {
                      setCurrentScreen('KITCHEN_KDS');
                      setStaffDropdownOpen(false);
                    }}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                      currentScreen === 'KITCHEN_KDS'
                        ? 'bg-amber-500 text-zinc-950 font-black'
                        : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    <ChefHat className="w-4 h-4 text-orange-400" />
                    <div className="flex-1">
                      <p>Tablet Cozinha</p>
                      <p className="text-[10px] font-normal text-zinc-400">KDS de Preparo</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentScreen('COUNTER');
                      setStaffDropdownOpen(false);
                    }}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                      currentScreen === 'COUNTER'
                        ? 'bg-amber-500 text-zinc-950 font-black'
                        : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    <Store className="w-4 h-4 text-amber-400" />
                    <div className="flex-1">
                      <p>Balcão & Caixa</p>
                      <p className="text-[10px] font-normal text-zinc-400">Pedidos e Entrega</p>
                    </div>
                  </button>

                  <div className="border-t border-zinc-800/80 pt-1">
                    <button
                      onClick={() => {
                        setCurrentScreen('AUTH');
                        setStaffDropdownOpen(false);
                      }}
                      className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                        currentScreen === 'AUTH'
                          ? 'bg-amber-500 text-zinc-950'
                          : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                      }`}
                    >
                      <User className="w-4 h-4 text-zinc-400" />
                      <span>{currentUser ? 'Gerenciar Sessão' : 'Login da Equipe'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Ações da Direita */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Botão Buscar Código */}
            <button
              onClick={() => setTrackModalOpen(true)}
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold text-zinc-300 bg-[#121215] hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 flex items-center space-x-1.5 transition"
              title="Buscar pedido pelo código"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span className="hidden lg:inline">Buscar Código</span>
            </button>

            {/* Carrinho de Compras */}
            <button
              onClick={() => setCurrentScreen('CLIENT_CART')}
              className={`relative flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 rounded-xl font-black text-xs sm:text-sm transition-all duration-200 ${
                currentScreen === 'CLIENT_CART'
                  ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg shadow-red-600/30'
                  : 'bg-[#121215] hover:bg-zinc-800 text-white border border-zinc-800 hover:border-amber-500/40'
              }`}
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              <span className="hidden sm:inline">Carrinho</span>
              {cartItemCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-[11px] flex items-center justify-center font-black animate-bounce shadow-md">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Usuário Logado */}
            {currentUser ? (
              <div className="flex items-center space-x-2 bg-[#121215] border border-zinc-800 rounded-xl px-2.5 py-1.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-black">
                  {currentUser.role[0]}
                </div>
                <div className="hidden xl:block text-left text-xs leading-tight">
                  <p className="font-bold text-zinc-200">{currentUser.name}</p>
                  <p className="text-[10px] text-amber-400 font-semibold">{currentUser.role}</p>
                </div>
                <button
                  onClick={logoutUser}
                  className="p-1 text-zinc-400 hover:text-red-400 transition"
                  title="Sair da conta"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : null}

            {/* Toggle Menu Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden rounded-xl bg-[#121215] border border-zinc-800 text-zinc-300 hover:text-white"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Drawer Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-[#141416] to-[#0c0c0e] border-b border-zinc-800 px-4 pt-3 pb-5 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200 backdrop-blur-2xl">
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-2">
              Menu do Cliente:
            </p>
            <button
              onClick={() => {
                setCurrentScreen('CLIENT_CATALOG');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl text-sm font-bold transition ${
                isCustomerFlow ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950' : 'bg-[#18181b]/70 text-zinc-300'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Ver Cardápio Digital</span>
            </button>

            <button
              onClick={() => {
                setCurrentScreen('CLIENT_KDS');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-bold transition ${
                currentScreen === 'CLIENT_KDS' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950' : 'bg-[#18181b]/70 text-zinc-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4" />
                <span>Acompanhar Pedido</span>
              </div>
              {activeOrderCode && (
                <span className="text-xs px-2 py-0.5 rounded bg-zinc-950/60 font-mono">
                  #{activeOrderCode}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setCurrentScreen('CLIENT_CART');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-bold transition ${
                currentScreen === 'CLIENT_CART' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950' : 'bg-[#18181b]/70 text-zinc-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Carrinho ({cartItemCount})</span>
              </div>
            </button>
          </div>

          <div className="border-t border-zinc-800 pt-3 space-y-1.5">
            <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider px-2">
              👑 Painel do Lucas:
            </p>
            <button
              onClick={() => {
                setCurrentScreen('LUCAS_DASHBOARD');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl text-sm font-bold transition ${
                currentScreen === 'LUCAS_DASHBOARD' ? 'bg-amber-500 text-zinc-950 font-black' : 'bg-[#18181b]/70 text-zinc-300'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-amber-400" />
              <span>Dashboard do Lucas</span>
            </button>

            <button
              onClick={() => {
                setCurrentScreen('ADMIN_PRODUCTS');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl text-sm font-bold transition ${
                currentScreen === 'ADMIN_PRODUCTS' ? 'bg-amber-500 text-zinc-950 font-black' : 'bg-[#18181b]/70 text-zinc-300'
              }`}
            >
              <Beef className="w-4 h-4 text-amber-400" />
              <span>Gerenciar Produtos</span>
            </button>

            <button
              onClick={() => {
                setCurrentScreen('ADMIN_USERS');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl text-sm font-bold transition ${
                currentScreen === 'ADMIN_USERS' ? 'bg-amber-500 text-zinc-950 font-black' : 'bg-[#18181b]/70 text-zinc-300'
              }`}
            >
              <Users className="w-4 h-4 text-amber-400" />
              <span>Gerenciar Usuários</span>
            </button>

            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-2 pt-2">
              Operação em Tempo Real:
            </p>
            <button
              onClick={() => {
                setCurrentScreen('KITCHEN_KDS');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl text-sm font-bold transition ${
                currentScreen === 'KITCHEN_KDS' ? 'bg-amber-500 text-zinc-950 font-black' : 'bg-[#18181b]/70 text-zinc-300'
              }`}
            >
              <ChefHat className="w-4 h-4 text-orange-400" />
              <span>Tablet Cozinha (KDS)</span>
            </button>

            <button
              onClick={() => {
                setCurrentScreen('COUNTER');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl text-sm font-bold transition ${
                currentScreen === 'COUNTER' ? 'bg-amber-500 text-zinc-950 font-black' : 'bg-[#18181b]/70 text-zinc-300'
              }`}
            >
              <Store className="w-4 h-4 text-amber-400" />
              <span>Balcão & Caixa</span>
            </button>

            <button
              onClick={() => {
                setCurrentScreen('AUTH');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl text-sm font-bold transition ${
                currentScreen === 'AUTH' ? 'bg-amber-500 text-zinc-950' : 'bg-[#18181b]/70 text-zinc-400'
              }`}
            >
              <User className="w-4 h-4" />
              <span>{currentUser ? `Logado como ${currentUser.name}` : 'Login da Equipe'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Modal de Busca Rápida por Código (KDS Cliente) */}
      {trackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-gradient-to-b from-[#18181c] to-[#0f0f12] border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setTrackModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mb-4">
              <Search className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-black text-white mb-1">
              Acompanhar Pedido
            </h3>
            <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
              Digite o número do seu pedido (ex: 1040, 1041) para ver o status de preparo em tempo real no KDS.
            </p>

            <form onSubmit={handleTrackSubmit} className="space-y-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold text-lg font-mono">
                  #
                </span>
                <input
                  type="text"
                  value={trackInputCode}
                  onChange={(e) => setTrackInputCode(e.target.value)}
                  placeholder="Ex: 1040"
                  className="w-full bg-[#09090b] border border-zinc-800 rounded-2xl pl-10 pr-4 py-3.5 text-lg font-mono font-bold text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30"
                  autoFocus
                />
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setTrackModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!trackInputCode.trim()}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 text-zinc-950 text-xs font-black transition shadow-lg shadow-orange-500/20"
                >
                  Rastrear Pedido
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
