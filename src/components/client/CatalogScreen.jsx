import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES, MENU_ITEMS } from '../../data/menuData';
import { ItemDetailModal } from './ItemDetailModal';
import { formatCurrency, formatCPF } from '../../utils/formatters';
import { 
  Search, 
  Plus, 
  Sparkles, 
  Flame, 
  Beef, 
  Utensils, 
  CupSoda, 
  IceCream, 
  UserCheck, 
  ChevronRight, 
  X,
  Clock,
  Percent
} from 'lucide-react';

const CATEGORY_ICONS = {
  Sparkles,
  Flame,
  Beef,
  Utensils,
  CupSoda,
  IceCream,
};

export const CatalogScreen = () => {
  const { 
    customerCpf, 
    addToCart, 
    cartTotal, 
    cartItemCount, 
    setCurrentScreen,
    products = []
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalItem, setActiveModalItem] = useState(null);

  const productList = products && products.length > 0 ? products : MENU_ITEMS;

  // Filtrar itens por categoria, busca e se está ativo no cardápio
  const filteredItems = productList.filter((item) => {
    if (item.active === false) return false;
    const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;
    const matchesQuery = 
      (item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-transparent pb-28 text-zinc-100">
      
      {/* Sub-barra de Status da Mesa e Cozinha - Preto Fosco com Degrade */}
      <div className="bg-[#0e0e11]/90 border-b border-zinc-800/80 px-4 py-2.5 sm:px-6 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-zinc-200">
              Mesa 04 • Atendimento Digital
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 text-zinc-400">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tempo médio: ~15 min</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-[#18181b] px-2.5 py-0.5 rounded-full border border-zinc-700">
              <UserCheck className="w-3 h-3 text-amber-400" />
              <span className="text-zinc-300 font-medium">
                {customerCpf ? formatCPF(customerCpf) : 'Visitante'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 space-y-5">
        
        {/* Banner Promocional Compacto em Preto Fosco com Degrade Quente */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#1c1917] via-[#141417] to-[#1a1410] border border-amber-500/25 p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-zinc-950 flex items-center justify-center shrink-0 shadow-md">
              <Flame className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-sm sm:text-base font-black text-white">
                  Destaques Artesanais na Brasa
                </h2>
                <span className="inline-flex items-center space-x-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <Percent className="w-3 h-3" />
                  <span>CUPOM: DAPRACA10</span>
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Smash crocantes, pão brioche selado na manteiga e molhos especiais.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center space-x-2 text-xs font-bold text-amber-400">
            <span>Aproveite 10% OFF</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Barra de Busca em Preto Fosco */}
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por hambúrguer, batata, bebida ou sobremesa..."
            className="w-full bg-[#121215] border border-zinc-800 rounded-2xl pl-11 pr-10 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1"
              aria-label="Limpar busca"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filtros de Categorias Horizontais em Preto Fosco */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.icon] || Sparkles;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 border shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 border-amber-400 text-zinc-950 shadow-md shadow-orange-500/20 scale-[1.02]'
                    : 'bg-[#141417] border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-zinc-950' : 'text-amber-400'}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Grade de Produtos do Cardápio */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-white">
              {selectedCategory === 'all' 
                ? 'Cardápio Completo' 
                : CATEGORIES.find((c) => c.id === selectedCategory)?.name}
            </h3>
            <span className="text-xs text-zinc-400 font-medium">
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'itens'}
            </span>
          </div>

          {filteredItems.length === 0 ? (
            <div className="bg-[#121215]/60 border border-zinc-800 rounded-3xl p-10 text-center space-y-3">
              <Utensils className="w-10 h-10 text-zinc-600 mx-auto" />
              <p className="text-sm font-bold text-zinc-300">Nenhum item encontrado</p>
              <p className="text-xs text-zinc-500">Tente buscar por outros termos ou selecione outra categoria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-xs font-bold text-amber-400 hover:bg-zinc-700 transition"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveModalItem(item)}
                  className="group bg-gradient-to-b from-[#161619] to-[#101013] border border-zinc-800 hover:border-amber-500/50 rounded-2xl p-3.5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-orange-500/5 cursor-pointer relative"
                >
                  <div className="space-y-2.5">
                    {/* Imagem do Produto */}
                    <div className="relative h-44 rounded-xl overflow-hidden bg-[#09090b]">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      
                      {item.badge && (
                        <span className="absolute top-2.5 left-2.5 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 shadow-md">
                          {item.badge}
                        </span>
                      )}

                      {item.options?.meatTemp && (
                        <span className="absolute bottom-2 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/85 text-amber-300 border border-amber-500/30 backdrop-blur-sm">
                          🥩 Ponto à escolha
                        </span>
                      )}
                    </div>

                    {/* Informações do Item */}
                    <div>
                      <h4 className="font-bold text-white text-sm sm:text-base group-hover:text-amber-400 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-zinc-400 line-clamp-2 mt-0.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Preço e Botão Adicionar */}
                  <div className="mt-3.5 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-500 block uppercase font-bold tracking-wider">
                        A partir de
                      </span>
                      <span className="text-lg font-black text-amber-400 font-mono">
                        {formatCurrency(item.price)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalItem(item);
                      }}
                      className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 font-black text-xs shadow-md shadow-orange-500/20 active:scale-95 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Adicionar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Barra Flutuante Inferior do Carrinho */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-0 inset-x-0 z-30 p-3 sm:p-4 bg-gradient-to-t from-[#09090b] via-[#09090b]/95 to-transparent pointer-events-none">
          <div className="max-w-2xl mx-auto pointer-events-auto">
            <button
              onClick={() => setCurrentScreen('CLIENT_CART')}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-red-600 via-orange-600 to-amber-500 text-white font-black text-sm flex items-center justify-between shadow-2xl shadow-orange-600/30 active:scale-[0.99] transition animate-in slide-in-from-bottom-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-black text-xs">
                  {cartItemCount}
                </div>
                <div className="text-left leading-tight">
                  <p className="font-black text-white">Ver Meu Carrinho</p>
                  <p className="text-[11px] text-amber-100 font-medium">
                    {cartItemCount} {cartItemCount === 1 ? 'item adicionado' : 'itens adicionados'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-base sm:text-lg font-black">
                  {formatCurrency(cartTotal)}
                </span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Modal de Detalhes e Personalização do Item */}
      <ItemDetailModal
        item={activeModalItem}
        isOpen={!!activeModalItem}
        onClose={() => setActiveModalItem(null)}
        onAddToCart={addToCart}
      />
    </div>
  );
};

