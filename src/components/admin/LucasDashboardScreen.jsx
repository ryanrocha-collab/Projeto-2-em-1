import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';
import { 
  WEEKLY_ANALYTICS, 
  CHAMPION_DAY, 
  TOP_PRODUCTS_BY_CATEGORY, 
  calculateTodayMetrics 
} from '../../data/dashboardData';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Flame, 
  Award, 
  ArrowUpRight, 
  ChevronRight, 
  PlusCircle, 
  UserCheck, 
  BarChart3, 
  ShieldCheck, 
  Sparkles, 
  Info,
  Beef,
  Utensils,
  CupSoda,
  IceCream
} from 'lucide-react';

export const LucasDashboardScreen = () => {
  const { 
    orders, 
    products, 
    setCurrentScreen 
  } = useApp();

  const [selectedDayKey, setSelectedDayKey] = useState(CHAMPION_DAY.dayKey);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('all');

  // Métricas calculadas em tempo real (dados lógicos + pedidos realizados no app)
  const metrics = calculateTodayMetrics(orders, products);

  // Dia selecionado para inspeção
  const activeDay = WEEKLY_ANALYTICS.find((d) => d.dayKey === selectedDayKey) || CHAMPION_DAY;

  // Categorias disponíveis
  const categoriesList = [
    { id: 'all', name: 'Todas as Categorias', icon: Sparkles },
    { id: 'combos', name: 'Combos Especiais', icon: Flame },
    { id: 'burgers', name: 'Hambúrgueres', icon: Beef },
    { id: 'sides', name: 'Entradas & Porções', icon: Utensils },
    { id: 'drinks', name: 'Bebidas & Shakes', icon: CupSoda },
    { id: 'desserts', name: 'Sobremesas', icon: IceCream },
  ];

  return (
    <div className="min-h-screen bg-transparent text-zinc-100 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 pt-4">
      
      {/* Top Banner de Boas-vindas ao Lucas */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#18181c] via-[#141418] to-[#0c0c0e] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Painel Executivo • Proprietário</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Olá, <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">Lucas Rocha</span>! 🍔
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Aqui está o desempenho financeiro do Da Praça Burger em tempo real. Acompanhe seu faturamento diário, lucro líquido real, análise dos dias de maior movimento e o ranking dos produtos mais vendidos por categoria.
            </p>
          </div>

          {/* Atalhos Rápidos para o Lucas */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
            <button
              onClick={() => setCurrentScreen('ADMIN_PRODUCTS')}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Gerenciar Produtos</span>
            </button>

            <button
              onClick={() => setCurrentScreen('ADMIN_USERS')}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs sm:text-sm border border-zinc-700 transition active:scale-95 cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-amber-400" />
              <span>Equipe & Usuários</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid de Métricas Principais (Total de Vendas & Lucro do Lucas) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* CARD 1: TOTAL DE VENDAS NO DIA */}
        <div className="relative overflow-hidden bg-[#121215] border border-zinc-800/90 hover:border-amber-500/40 rounded-3xl p-5 sm:p-6 shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Total de Vendas no Dia
            </span>
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {formatCurrency(metrics.totalSalesToday)}
            </div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400">
              <span className="inline-flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+18.4%</span>
              </span>
              <span className="text-zinc-500 font-normal">vs. mesmo dia semana passada</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
            <span>{metrics.totalOrdersToday} pedidos hoje</span>
            <span className="font-mono text-zinc-300 font-bold">Ticket: {formatCurrency(metrics.avgTicket)}</span>
          </div>
        </div>

        {/* CARD 2: QUAL FOI O LUCRO DELE (LUCRO LÍQUIDO DO LUCAS) */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#121215] via-[#151412] to-[#1a1610] border border-emerald-500/40 hover:border-emerald-400 rounded-3xl p-5 sm:p-6 shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lucro do Lucas no Dia</span>
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">
              {formatCurrency(metrics.totalProfitToday)}
            </div>
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-300">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                {metrics.profitMarginPercent.toFixed(1)}% Margem Líquida
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
            <span>Custo Insumos: {formatCurrency(metrics.totalCostToday)}</span>
            <span className="text-emerald-400 font-bold">No bolso do Lucas</span>
          </div>
        </div>

        {/* CARD 3: TICKET MÉDIO POR CLIENTE */}
        <div className="relative overflow-hidden bg-[#121215] border border-zinc-800/90 hover:border-amber-500/40 rounded-3xl p-5 sm:p-6 shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Ticket Médio
            </span>
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {formatCurrency(metrics.avgTicket)}
            </div>
            <div className="text-xs text-zinc-400">
              Média por cliente / mesa atendida
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
            <span>Meta diária: R$ 65,00</span>
            <span className="text-emerald-400 font-bold">Meta batida! 🎉</span>
          </div>
        </div>

        {/* CARD 4: CLIENTES ATENDIDOS HOJE */}
        <div className="relative overflow-hidden bg-[#121215] border border-zinc-800/90 hover:border-amber-500/40 rounded-3xl p-5 sm:p-6 shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Clientes Atendidos Hoje
            </span>
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {metrics.totalOrdersToday * 2 - 8}
            </div>
            <div className="text-xs text-zinc-400">
              Pessoas alimentadas nas mesas & balcão
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
            <span>Tempo médio: 14 min</span>
            <span className="text-amber-400 font-bold">Fluxo Rápido</span>
          </div>
        </div>

      </div>

      {/* SEÇÃO DE DESTAQUE: DIA QUE MAIS ATRAI CLIENTE (E PRODUTO MAIS VENDIDO NESSE DIA) */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#18181c] via-[#161413] to-[#121215] border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black">
              <Award className="w-4 h-4 text-amber-400" />
              <span>INSIGHT ESTRATÉGICO PARA O LUCAS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Dia que Mais Atrai Clientes & Produto Campeão
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Histórico consolidado semanal com o dia de maior pico de público e o item preferido daquele dia.
            </p>
          </div>

          {/* Badge do Dia Campeão */}
          <div className="bg-[#09090b]/80 border border-amber-500/40 rounded-2xl px-5 py-3 flex items-center space-x-4 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-zinc-950 flex items-center justify-center font-black text-2xl shadow-md">
              🏆
            </div>
            <div>
              <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                Campeão Semanal
              </p>
              <p className="text-lg font-black text-white">
                {CHAMPION_DAY.dayName}
              </p>
              <p className="text-xs text-zinc-400">
                {CHAMPION_DAY.clientsCount} clientes • {formatCurrency(CHAMPION_DAY.grossSales)}
              </p>
            </div>
          </div>
        </div>

        {/* Detalhe do Produto Campeão do Dia de Pico */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          
          {/* Card Visual do Produto Campeão */}
          <div className="md:col-span-1 bg-[#0e0e11] border border-amber-500/30 rounded-2xl p-4 flex flex-col justify-between space-y-4">
            <div className="relative rounded-xl overflow-hidden aspect-video bg-zinc-900 border border-zinc-800">
              <img 
                src={CHAMPION_DAY.topProduct.image} 
                alt={CHAMPION_DAY.topProduct.name}
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-amber-500 text-zinc-950 font-black text-[10px] shadow-md flex items-center space-x-1">
                <Flame className="w-3 h-3" />
                <span>Mais Vendido na Sexta</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                {CHAMPION_DAY.topProduct.category}
              </span>
              <h3 className="text-base font-black text-white">
                {CHAMPION_DAY.topProduct.name}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {CHAMPION_DAY.topProduct.reason}
              </p>
            </div>

            <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs">
              <span className="text-zinc-400 font-medium">Vendidos no dia:</span>
              <span className="font-black text-amber-400 text-sm">
                {CHAMPION_DAY.topProduct.qtySold} unidades ({formatCurrency(CHAMPION_DAY.topProduct.revenue)})
              </span>
            </div>
          </div>

          {/* Gráfico / Seletor Interativo dos Dias da Semana */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-zinc-300">
                Movimento por Dia da Semana (Clique para inspecionar):
              </h4>
              <span className="text-[11px] text-zinc-500">
                Mostrando: <strong className="text-amber-400">{activeDay.dayName}</strong>
              </span>
            </div>

            {/* Barras de cada dia */}
            <div className="grid grid-cols-7 gap-2">
              {WEEKLY_ANALYTICS.map((day) => {
                const isSelected = day.dayKey === selectedDayKey;
                const isMax = day.isChampion;
                const heightPercentage = Math.round((day.clientsCount / 160) * 100);

                return (
                  <button
                    key={day.dayKey}
                    type="button"
                    onClick={() => setSelectedDayKey(day.dayKey)}
                    className={`flex flex-col items-center p-2 rounded-2xl border transition-all text-center group cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 shadow-lg shadow-amber-500/10'
                        : isMax
                        ? 'bg-[#18181c] border-amber-500/40 hover:border-amber-500'
                        : 'bg-[#09090b] border-zinc-800/80 hover:border-zinc-700'
                    }`}
                  >
                    {isMax && (
                      <span className="text-xs mb-1">👑</span>
                    )}
                    <span className="text-[11px] font-bold text-zinc-400 group-hover:text-white">
                      {day.shortDay}
                    </span>

                    {/* Barra visual de volume */}
                    <div className="w-full bg-zinc-900 rounded-lg h-24 sm:h-28 flex flex-col justify-end p-1 my-2">
                      <div
                        style={{ height: `${heightPercentage}%` }}
                        className={`w-full rounded-md transition-all duration-500 ${
                          isMax
                            ? 'bg-gradient-to-t from-orange-500 to-amber-400'
                            : isSelected
                            ? 'bg-amber-500'
                            : 'bg-zinc-700 group-hover:bg-zinc-600'
                        }`}
                      />
                    </div>

                    <span className="text-[11px] font-black text-white">
                      {day.clientsCount}
                    </span>
                    <span className="text-[9px] text-zinc-400">
                      clientes
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Resumo do dia clicado */}
            <div className="bg-[#09090b] border border-zinc-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <p className="font-bold text-white flex items-center space-x-1.5">
                  <span>{activeDay.dayName}</span>
                  {activeDay.isChampion && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                      Pico de Atendimento
                    </span>
                  )}
                </p>
                <p className="text-zinc-400 text-[11px]">
                  Faturamento: <strong className="text-white">{formatCurrency(activeDay.grossSales)}</strong> • 
                  Lucro Líquido: <strong className="text-emerald-400">{formatCurrency(activeDay.profit)}</strong>
                </p>
              </div>

              <div className="bg-[#121215] px-3 py-1.5 rounded-xl border border-zinc-800 text-[11px]">
                <span className="text-zinc-400">Mais vendido no dia: </span>
                <strong className="text-amber-400">{activeDay.topProduct.name}</strong>
                <span className="text-zinc-400"> ({activeDay.topProduct.qtySold} un)</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* SEÇÃO: PRODUTOS MAIS VENDIDOS POR CATEGORIA */}
      <div className="space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Flame className="w-4 h-4" />
              <span>Ranking de Desempenho</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Produtos Mais Vendidos por Tipo
            </h2>
            <p className="text-xs text-zinc-400">
              Análise detalhada por Bebidas, Entradas, Hambúrgueres, Combos e Sobremesas com volume e lucro de cada item.
            </p>
          </div>

          <button
            onClick={() => setCurrentScreen('ADMIN_PRODUCTS')}
            className="flex items-center space-x-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition"
          >
            <span>Gerenciar todos os produtos</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs de Filtro por Categoria */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {categoriesList.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategoryTab === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategoryTab(cat.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20 font-black'
                    : 'bg-[#121215] text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Lista de Categorias com seus Produtos Campeões */}
        <div className="space-y-6">
          {Object.entries(TOP_PRODUCTS_BY_CATEGORY)
            .filter(([catKey]) => selectedCategoryTab === 'all' || selectedCategoryTab === catKey)
            .map(([catKey, items]) => {
              const categoryTitle = 
                catKey === 'combos' ? 'Combos Especiais' :
                catKey === 'burgers' ? 'Hambúrgueres Artesanais' :
                catKey === 'sides' ? 'Entradas & Porções' :
                catKey === 'drinks' ? 'Bebidas & Shakes' :
                'Sobremesas';

              return (
                <div 
                  key={catKey}
                  className="bg-[#121215] border border-zinc-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <h3 className="text-base font-black text-white">
                        {categoryTitle}
                      </h3>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 font-semibold">
                        {items.length} itens no ranking
                      </span>
                    </div>

                    <span className="text-xs text-zinc-400 font-medium hidden sm:inline">
                      Ordenado pelo produto mais vendido hoje
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((prod) => (
                      <div
                        key={prod.id}
                        className={`relative rounded-2xl border p-4 transition-all duration-200 flex flex-col justify-between space-y-3 ${
                          prod.rank === 1
                            ? 'bg-[#18181c] border-amber-500/50 shadow-lg shadow-amber-500/5'
                            : 'bg-[#0d0d10] border-zinc-800/90 hover:border-zinc-700'
                        }`}
                      >
                        {/* Rank Badge */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center space-x-2">
                            <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center ${
                              prod.rank === 1
                                ? 'bg-amber-500 text-zinc-950 font-black'
                                : 'bg-zinc-800 text-zinc-300 font-bold'
                            }`}>
                              #{prod.rank}
                            </span>
                            {prod.badge && (
                              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                                {prod.badge}
                              </span>
                            )}
                          </div>

                          <div className="text-right">
                            <p className="text-xs font-black text-white">
                              {formatCurrency(prod.price)}
                            </p>
                            <p className="text-[10px] text-zinc-400 font-medium">
                              Custo: {formatCurrency(prod.costPrice)}
                            </p>
                          </div>
                        </div>

                        {/* Imagem + Nome */}
                        <div className="flex items-center space-x-3">
                          <img 
                            src={prod.image} 
                            alt={prod.name}
                            className="w-16 h-16 rounded-xl object-cover border border-zinc-800 flex-shrink-0" 
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-black text-white truncate">
                              {prod.name}
                            </h4>
                            <p className="text-[11px] text-zinc-400">
                              {prod.unitsSoldToday} vendidos hoje
                            </p>
                            <p className="text-[10px] text-zinc-500">
                              {prod.unitsSoldWeek} vendidos na semana
                            </p>
                          </div>
                        </div>

                        {/* Detalhe do Lucro do Lucas neste produto */}
                        <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                          <div>
                            <span className="text-[10px] text-zinc-500 block">Receita hoje:</span>
                            <span className="font-bold text-white text-[11px]">
                              {formatCurrency(prod.revenueToday)}
                            </span>
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] text-emerald-400 font-bold block">
                              Lucro do Lucas:
                            </span>
                            <span className="font-black text-emerald-400 text-xs">
                              {formatCurrency(prod.profitToday)} ({prod.profitMargin}%)
                            </span>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              );
            })}
        </div>

      </div>

      {/* FOOTER DO PAINEL DO LUCAS: DICAS E STATUS */}
      <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-white">Dados Calculados em Tempo Real</p>
            <p className="text-zinc-500 text-[11px]">
              Os valores de vendas e lucro são atualizados instantaneamente quando novos pedidos são feitos ou pagos no balcão.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setCurrentScreen('COUNTER')}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs transition"
          >
            Ir para Balcão / Caixa
          </button>
          <button
            onClick={() => setCurrentScreen('KITCHEN_KDS')}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs transition"
          >
            Ir para Tablet Cozinha
          </button>
        </div>
      </div>

    </div>
  );
};
