import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatTime, getMinutesElapsed, formatCurrency } from '../../utils/formatters';
import { 
  ChefHat, 
  Clock, 
  Play, 
  CheckCircle2, 
  Flame, 
  Volume2, 
  Search
} from 'lucide-react';
import { soundEffects } from '../../utils/audio';

export const KitchenKdsScreen = () => {
  const { 
    orders, 
    startOrderInKitchen, 
    finishOrderInKitchen 
  } = useApp();

  const [filterQuery, setFilterQuery] = useState('');
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'PENDING' | 'PREPARING' | 'READY'

  // Filtragem dos pedidos
  const filteredOrders = orders.filter((order) => {
    if (!filterQuery) return true;
    const q = filterQuery.toLowerCase();
    const matchesCode = order.code.toLowerCase().includes(q);
    const matchesItem = order.items.some((i) => i.name.toLowerCase().includes(q));
    return matchesCode || matchesItem;
  });

  // As 3 listas especificadas pelo usuário
  const pendingOrders = filteredOrders.filter((o) => o.status === 'PENDING');
  const preparingOrders = filteredOrders.filter((o) => o.status === 'PREPARING');
  const finishedOrders = filteredOrders.filter((o) => o.status === 'READY' || o.status === 'DELIVERED');

  return (
    <div className="min-h-screen bg-transparent text-zinc-100 pb-16">
      
      {/* Tablet Kitchen Header */}
      <div className="bg-[#121215] border-b border-zinc-800 px-4 py-3 sm:px-6 sticky top-16 sm:top-20 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base sm:text-lg font-black text-white">
                  KDS Cozinha • Painel de Produção (Tablet)
                </h1>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-xs text-zinc-400">
                Acompanhamento e despacho de pedidos em tempo real
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="bg-[#09090b] border border-red-500/30 px-3 py-1.5 rounded-xl flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs text-zinc-300 font-bold">Feitos:</span>
              <span className="text-sm font-black text-red-400">{pendingOrders.length}</span>
            </div>

            <div className="bg-[#09090b] border border-amber-500/30 px-3 py-1.5 rounded-xl flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-xs text-zinc-300 font-bold">Iniciados:</span>
              <span className="text-sm font-black text-amber-400">{preparingOrders.length}</span>
            </div>

            <div className="bg-[#09090b] border border-emerald-500/30 px-3 py-1.5 rounded-xl flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-zinc-300 font-bold">Finalizados:</span>
              <span className="text-sm font-black text-emerald-400">{finishedOrders.length}</span>
            </div>

            <button
              onClick={() => soundEffects.playNewOrder()}
              className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-400 transition"
              title="Testar som de novo pedido"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Search & View Filter Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Tab selector for tablets or mobile */}
          <div className="flex space-x-1 bg-[#121215] p-1 rounded-2xl border border-zinc-800 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'ALL'
                  ? 'bg-amber-500 text-zinc-950 shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Todas as Listas
            </button>
            <button
              onClick={() => setActiveTab('PENDING')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'PENDING'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Feitos ({pendingOrders.length})
            </button>
            <button
              onClick={() => setActiveTab('PREPARING')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'PREPARING'
                  ? 'bg-amber-500 text-zinc-950 shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Iniciados ({preparingOrders.length})
            </button>
            <button
              onClick={() => setActiveTab('READY')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'READY'
                  ? 'bg-emerald-500 text-zinc-950 shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Finalizados ({finishedOrders.length})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Buscar pedido ou item..."
              className="w-full bg-[#121215] border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* 3 Kanban Columns Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* ============================================================ */}
          {/* COLUNA 1: LISTA DOS PEDIDOS FEITOS (Novos / Pendentes) */}
          {/* ============================================================ */}
          {(activeTab === 'ALL' || activeTab === 'PENDING') && (
            <div className="bg-[#121215]/60 border border-red-500/30 rounded-3xl p-4 sm:p-5 flex flex-col space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                  <h2 className="text-sm font-black uppercase tracking-wider text-red-400">
                    1. Pedidos Feitos (Novos)
                  </h2>
                </div>
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                  {pendingOrders.length}
                </span>
              </div>

              {pendingOrders.length === 0 ? (
                <div className="p-8 text-center text-zinc-500 text-xs my-auto">
                  Nenhum pedido novo pendente no momento.
                </div>
              ) : (
                <div className="space-y-4 overflow-y-auto max-h-[72vh] pr-1">
                  {pendingOrders.map((order) => {
                    const elapsed = getMinutesElapsed(order.createdAt);
                    const isUrgent = elapsed >= 10;

                    return (
                      <div
                        key={order.code}
                        className={`bg-[#09090b] border ${
                          isUrgent ? 'border-red-500 shadow-lg shadow-red-500/20' : 'border-zinc-800'
                        } rounded-2xl p-4 space-y-3 transition relative overflow-hidden`}
                      >
                        {/* Urgent indicator bar */}
                        {isUrgent && (
                          <div className="absolute top-0 inset-x-0 h-1 bg-red-500 animate-pulse" />
                        )}

                        {/* Top Card Info */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-black font-mono text-white">
                              #{order.code}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-amber-400 border border-zinc-700">
                              {order.table}
                            </span>
                          </div>

                          <div
                            className={`flex items-center space-x-1 text-xs font-bold px-2.5 py-1 rounded-lg ${
                              isUrgent
                                ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                                : 'bg-[#121215] text-zinc-400 border border-zinc-800'
                            }`}
                          >
                            <Clock className="w-3.5 h-3.5" />
                            <span>{elapsed} min</span>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="bg-[#121215]/90 rounded-xl p-3 space-y-2 border border-zinc-800/80">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="text-xs space-y-0.5 border-b border-zinc-800/50 last:border-0 pb-1.5 last:pb-0">
                              <div className="flex justify-between items-baseline">
                                <span className="font-black text-white text-sm">
                                  {item.quantity}x {item.name}
                                </span>
                              </div>
                              {item.meatTemp && (
                                <p className="text-[11px] font-bold text-amber-400">
                                  🥩 Ponto: {item.meatTemp}
                                </p>
                              )}
                              {(item.addons || []).length > 0 && (
                                <p className="text-[11px] text-zinc-300">
                                  + {item.addons.join(', ')}
                                </p>
                              )}
                              {item.notes && (
                                <p className="text-[11px] text-red-300 font-bold bg-red-950/40 p-1 rounded">
                                  ⚠️ Obs: {item.notes}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>

                        {order.generalNotes && (
                          <p className="text-[11px] text-amber-300 italic bg-amber-500/10 p-2 rounded-xl border border-amber-500/20">
                            Nota geral: "{order.generalNotes}"
                          </p>
                        )}

                        {/* Botão para Iniciar o Pedido -> Joga para Lista dos Iniciados */}
                        <button
                          type="button"
                          onClick={() => startOrderInKitchen(order.code)}
                          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md active:scale-95 transition"
                        >
                          <Play className="w-4 h-4 fill-zinc-950" />
                          <span>Iniciar Pedido (Jogar p/ Iniciados)</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* COLUNA 2: LISTA DOS PEDIDOS INICIADOS (Em Preparo) */}
          {/* ============================================================ */}
          {(activeTab === 'ALL' || activeTab === 'PREPARING') && (
            <div className="bg-[#121215]/60 border border-amber-500/30 rounded-3xl p-4 sm:p-5 flex flex-col space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center space-x-2">
                  <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
                  <h2 className="text-sm font-black uppercase tracking-wider text-amber-400">
                    2. Pedidos Iniciados (Na Chapa)
                  </h2>
                </div>
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {preparingOrders.length}
                </span>
              </div>

              {preparingOrders.length === 0 ? (
                <div className="p-8 text-center text-zinc-500 text-xs my-auto">
                  Nenhum pedido sendo preparado no momento.
                </div>
              ) : (
                <div className="space-y-4 overflow-y-auto max-h-[72vh] pr-1">
                  {preparingOrders.map((order) => {
                    const elapsedPreparo = getMinutesElapsed(order.startedAt || order.createdAt);

                    return (
                      <div
                        key={order.code}
                        className="bg-[#09090b] border border-amber-500/40 rounded-2xl p-4 space-y-3 transition relative overflow-hidden shadow-lg shadow-amber-500/5"
                      >
                        {/* Progress line */}
                        <div className="absolute top-0 inset-x-0 h-1 bg-amber-500 animate-pulse" />

                        {/* Top Card Info */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-black font-mono text-white">
                              #{order.code}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-amber-400 border border-zinc-700">
                              {order.table}
                            </span>
                          </div>

                          <div className="flex items-center space-x-1 text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Preparo: {elapsedPreparo} min</span>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="bg-[#121215]/90 rounded-xl p-3 space-y-2 border border-zinc-800/80">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="text-xs space-y-0.5 border-b border-zinc-800/50 last:border-0 pb-1.5 last:pb-0">
                              <span className="font-black text-white text-sm">
                                {item.quantity}x {item.name}
                              </span>
                              {item.meatTemp && (
                                <p className="text-[11px] font-bold text-amber-400">
                                  🥩 Ponto: {item.meatTemp}
                                </p>
                              )}
                              {(item.addons || []).length > 0 && (
                                <p className="text-[11px] text-zinc-300">
                                  + {item.addons.join(', ')}
                                </p>
                              )}
                              {item.notes && (
                                <p className="text-[11px] text-amber-300 font-bold bg-amber-950/40 p-1 rounded">
                                  Obs: {item.notes}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Botão para Finalizar o Pedido -> Envia para Balcão */}
                        <button
                          type="button"
                          onClick={() => finishOrderInKitchen(order.code)}
                          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md active:scale-95 transition"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Finalizar Preparo (Mandar p/ Balcão)</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* COLUNA 3: LISTA DOS PEDIDOS FINALIZADOS */}
          {/* ============================================================ */}
          {(activeTab === 'ALL' || activeTab === 'READY') && (
            <div className="bg-[#121215]/60 border border-emerald-500/30 rounded-3xl p-4 sm:p-5 flex flex-col space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <h2 className="text-sm font-black uppercase tracking-wider text-emerald-400">
                    3. Pedidos Finalizados
                  </h2>
                </div>
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {finishedOrders.length}
                </span>
              </div>

              {finishedOrders.length === 0 ? (
                <div className="p-8 text-center text-zinc-500 text-xs my-auto">
                  Nenhum pedido finalizado recentemente.
                </div>
              ) : (
                <div className="space-y-4 overflow-y-auto max-h-[72vh] pr-1">
                  {finishedOrders.map((order) => (
                    <div
                      key={order.code}
                      className="bg-[#09090b] border border-zinc-800 rounded-2xl p-4 space-y-2 opacity-85 hover:opacity-100 transition"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-black font-mono text-white">
                            #{order.code}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                            {order.table}
                          </span>
                        </div>

                        <span
                          className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                            order.status === 'READY'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse'
                              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          }`}
                        >
                          {order.status === 'READY' ? 'No Balcão' : 'Entregue'}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-400">
                        {order.items.map((i) => `${i.quantity}x ${i.name}`).join(' • ')}
                      </p>

                      <div className="text-[11px] text-zinc-500 flex justify-between pt-1">
                        <span>Finalizado às {formatTime(order.readyAt || order.createdAt)}</span>
                        <span>{formatCurrency(order.total)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};



