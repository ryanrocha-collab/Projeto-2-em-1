import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatTime, getMinutesElapsed } from '../../utils/formatters';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  ChefHat, 
  BellRing, 
  ShoppingBag, 
  Sparkles
} from 'lucide-react';

export const CustomerKdsScreen = () => {
  const { 
    orders, 
    activeOrderCode, 
    setActiveOrderCode, 
    setCurrentScreen 
  } = useApp();

  const [inputCode, setInputCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Encontrar o pedido ativo na lista global
  const currentOrder = orders.find(
    (o) => o.code.toLowerCase() === (activeOrderCode || '').toLowerCase()
  );

  const handleSearchCode = (e) => {
    e.preventDefault();
    const clean = inputCode.trim();
    if (!clean) return;

    const found = orders.find((o) => o.code.toLowerCase() === clean.toLowerCase());
    if (found) {
      setActiveOrderCode(clean);
      setErrorMessage('');
      setInputCode('');
    } else {
      setErrorMessage(`Pedido #${clean} não foi encontrado. Verifique o número digitado.`);
    }
  };

  // Definição dos passos do KDS do Usuário
  const STEPS = [
    {
      key: 'PENDING',
      title: 'Pedido Recebido',
      desc: 'Aguardando início do preparo na cozinha',
      icon: Clock,
    },
    {
      key: 'PREPARING',
      title: 'Em Preparo',
      desc: 'Os chefs estão preparando seu pedido na chapa',
      icon: ChefHat,
    },
    {
      key: 'READY',
      title: 'Pronto para Retirada',
      desc: 'Seu pedido está quentinho no balcão! Pode retirar',
      icon: BellRing,
    },
    {
      key: 'DELIVERED',
      title: 'Pedido Entregue',
      desc: 'Pedido entregue com sucesso. Bom apetite!',
      icon: CheckCircle2,
    },
  ];

  const getStepIndex = (status) => {
    switch (status) {
      case 'PENDING': return 0;
      case 'PREPARING': return 1;
      case 'READY': return 2;
      case 'DELIVERED': return 3;
      default: return 0;
    }
  };

  const currentStepIndex = currentOrder ? getStepIndex(currentOrder.status) : 0;

  return (
    <div className="min-h-screen bg-transparent pb-24 text-zinc-100">
      
      {/* Top Bar with Search Input */}
      <div className="bg-[#121215] border-b border-zinc-800 px-4 py-4 sm:px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-base sm:text-lg font-black text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Acompanhamento do Pedido (KDS Cliente)</span>
            </h1>
            <p className="text-xs text-zinc-400">
              Acompanhe o status do seu pedido em tempo real informando o código
            </p>
          </div>

          <form onSubmit={handleSearchCode} className="flex items-center space-x-2">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-mono font-bold text-xs">
                #
              </span>
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Ex: 1040, 1041..."
                className="w-32 sm:w-36 bg-[#09090b] border border-zinc-700 rounded-xl pl-7 pr-3 py-2 text-xs font-mono font-bold text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
              />
            </div>
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center space-x-1 transition shadow-sm"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Consultar</span>
            </button>
          </form>
        </div>

        {errorMessage && (
          <div className="max-w-3xl mx-auto mt-2">
            <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-1.5">
              {errorMessage}
            </p>
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {currentOrder ? (
          <>
            {/* Main Order Card with Code Ticket */}
            <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              
              {/* Highlight Ready State */}
              {currentOrder.status === 'READY' && (
                <div className="mb-6 p-4 rounded-2xl bg-amber-500/20 border-2 border-amber-500 text-amber-300 flex items-center space-x-3 animate-pulse">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-zinc-950 flex items-center justify-center font-black">
                    <BellRing className="w-6 h-6 animate-bounce" />
                  </div>
                  <div>
                    <h3 className="font-black text-base text-amber-300">
                      SEU PEDIDO ESTÁ PRONTO!
                    </h3>
                    <p className="text-xs text-amber-200/90">
                      Por favor, dirija-se ao balcão e informe o código <strong>#{currentOrder.code}</strong> para retirar.
                    </p>
                  </div>
                </div>
              )}

              {/* Order Header info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                    Número do Pedido
                  </span>
                  <div className="flex items-center space-x-3 mt-1">
                    <h2 className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white">
                      #{currentOrder.code}
                    </h2>
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-zinc-800 text-amber-400 border border-zinc-700">
                      {currentOrder.table}
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-right space-y-1">
                  <div className="inline-flex items-center space-x-1.5 text-xs text-zinc-400">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Realizado às {formatTime(currentOrder.createdAt)}</span>
                  </div>
                  <p className="text-xs text-zinc-500">
                    Tempo decorrido: {getMinutesElapsed(currentOrder.createdAt)} min
                  </p>
                </div>
              </div>

              {/* Visual Stepper / KDS Timeline */}
              <div className="py-6 sm:py-8">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-2 relative">
                  
                  {STEPS.map((step, idx) => {
                    const StepIcon = step.icon;
                    const isCompleted = idx < currentStepIndex;
                    const isCurrent = idx === currentStepIndex;

                    return (
                      <div
                        key={step.key}
                        className={`relative rounded-2xl p-4 sm:p-3 transition-all ${
                          isCurrent
                            ? 'bg-amber-500/10 border-2 border-amber-500 text-white shadow-lg shadow-amber-500/10 scale-[1.02]'
                            : isCompleted
                            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                            : 'bg-[#09090b]/40 border border-zinc-800/80 text-zinc-500 opacity-60'
                        }`}
                      >
                        <div className="flex sm:flex-col items-center sm:items-start space-x-3 sm:space-x-0 space-y-0 sm:space-y-2">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                              isCurrent
                                ? 'bg-amber-500 text-zinc-950 animate-pulse'
                                : isCompleted
                                ? 'bg-emerald-500 text-zinc-950'
                                : 'bg-zinc-800 text-zinc-400'
                            }`}
                          >
                            <StepIcon className="w-4 h-4" />
                          </div>

                          <div>
                            <p className="text-xs font-black leading-tight">
                              {step.title}
                            </p>
                            <p className="text-[10px] text-zinc-400 mt-1 line-clamp-2">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Items List in Ticket Format */}
              <div className="bg-[#09090b] border border-zinc-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                  <span>Itens Inclusos neste Pedido</span>
                  <span>{formatCurrency(currentOrder.total)}</span>
                </h4>

                <div className="divide-y divide-zinc-800/80">
                  {currentOrder.items.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex justify-between text-xs sm:text-sm">
                      <div className="space-y-0.5">
                        <span className="font-bold text-white">
                          {item.quantity}x {item.name}
                        </span>
                        {item.meatTemp && (
                          <p className="text-[11px] text-amber-400">Ponto: {item.meatTemp}</p>
                        )}
                        {(item.addons || []).length > 0 && (
                          <p className="text-[11px] text-zinc-400">+{item.addons.join(', ')}</p>
                        )}
                        {item.notes && (
                          <p className="text-[11px] text-zinc-400 italic">Obs: "{item.notes}"</p>
                        )}
                      </div>
                      <span className="font-bold text-zinc-300 ml-2">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Status do Pagamento */}
                <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="text-zinc-400">Forma de Pagamento:</span>
                    <span className="font-bold text-white">
                      {currentOrder.paymentMethod === 'PIX'
                        ? 'PIX Instantâneo'
                        : currentOrder.paymentMethod === 'CASH'
                        ? 'Dinheiro em Espécie'
                        : 'Cartão de Crédito/Débito'}
                    </span>
                  </div>

                  <div>
                    {currentOrder.paymentStatus === 'PAID' ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-[11px]">
                        ✓ Pago Online
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold text-[11px]">
                        ⏳ Pagar no Balcão {currentOrder.cashChangeFor ? `(Troco p/ ${formatCurrency(currentOrder.cashChangeFor)})` : ''}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="mt-6 pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setCurrentScreen('CLIENT_CATALOG')}
                  className="flex-1 py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition border border-zinc-700"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Fazer Outro Pedido</span>
                </button>
              </div>

            </div>
          </>
        ) : (
          <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Nenhum pedido selecionado
            </h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Digite o número do pedido no campo acima (ex: 1040, 1041, 1042) para acompanhar o status no KDS em tempo real.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};



