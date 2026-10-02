import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES, SAMPLE_PRODUCT_PHOTOS } from '../../data/menuData';
import { formatCurrency } from '../../utils/formatters';
import { 
  PlusCircle, 
  Pencil, 
  Trash2, 
  Search, 
  Sparkles, 
  Flame, 
  Beef, 
  Utensils, 
  CupSoda, 
  IceCream, 
  ArrowLeft, 
  TrendingUp, 
  CheckCircle2, 
  X, 
  Eye, 
  EyeOff
} from 'lucide-react';

const CATEGORY_ICONS = {
  all: Sparkles,
  combos: Flame,
  burgers: Beef,
  sides: Utensils,
  drinks: CupSoda,
  desserts: IceCream,
};

export const ProductsManagerScreen = () => {
  const { 
    products = [], 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    toggleProductActive, 
    setCurrentScreen 
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null = Adicionar, obj = Editar
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Estados do formulário
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('burgers');
  const [formPrice, setFormPrice] = useState('');
  const [formCostPrice, setFormCostPrice] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formBadge, setFormBadge] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formActive, setFormActive] = useState(true);
  const [formError, setFormError] = useState('');

  // Cálculo de lucro em tempo real no formulário
  const numPrice = parseFloat(formPrice) || 0;
  const numCost = parseFloat(formCostPrice) || 0;
  const projectedProfit = Math.max(0, numPrice - numCost);
  const projectedMargin = numPrice > 0 ? ((projectedProfit / numPrice) * 100).toFixed(1) : 0;

  // Filtragem de produtos
  const filteredProducts = products.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;
    const matchesQuery = 
      (item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.badge || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormCategory('burgers');
    setFormPrice('');
    setFormCostPrice('');
    setFormDescription('');
    setFormBadge('');
    setFormImage(SAMPLE_PRODUCT_PHOTOS[0]?.url || '');
    setFormActive(true);
    setFormError('');
    setModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setFormName(product.name || '');
    setFormCategory(product.categoryId || 'burgers');
    setFormPrice(String(product.price || ''));
    setFormCostPrice(String(product.costPrice || ''));
    setFormDescription(product.description || '');
    setFormBadge(product.badge || '');
    setFormImage(product.image || '');
    setFormActive(product.active !== false);
    setFormError('');
    setModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formName.trim()) {
      setFormError('Informe o nome do produto.');
      return;
    }

    if (!numPrice || numPrice <= 0) {
      setFormError('Informe um preço de venda válido.');
      return;
    }

    const payload = {
      name: formName.trim(),
      categoryId: formCategory,
      price: numPrice,
      costPrice: numCost || (numPrice * 0.35),
      description: formDescription.trim(),
      badge: formBadge.trim(),
      image: formImage.trim() || SAMPLE_PRODUCT_PHOTOS[0]?.url,
      active: formActive,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
      setSuccessMessage(`Produto "${payload.name}" atualizado com sucesso!`);
    } else {
      addProduct(payload);
      setSuccessMessage(`Produto "${payload.name}" adicionado ao cardápio com sucesso!`);
    }

    setTimeout(() => setSuccessMessage(''), 4000);
    setModalOpen(false);
  };

  const handleDeleteProduct = (productId, productName) => {
    deleteProduct(productId);
    setSuccessMessage(`Produto "${productName}" excluído do cardápio.`);
    setTimeout(() => setSuccessMessage(''), 4000);
    setDeleteConfirmId(null);
  };

  return (
    <div className="min-h-screen bg-transparent text-zinc-100 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 pt-4">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <button
            onClick={() => setCurrentScreen('LUCAS_DASHBOARD')}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition mb-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Dashboard do Lucas</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center space-x-3">
            <span>Gerenciar Produtos & Cardápio</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
              {products.length} itens
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Adicione novos hambúrgueres, combos, bebidas ou sobremesas, altere preços de venda e acompanhe o custo e lucro de cada item.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition active:scale-95 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Adicionar Novo Produto</span>
        </button>
      </div>

      {/* Alerta de Sucesso */}
      {successMessage && (
        <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-2xl p-4 flex items-center space-x-3 text-emerald-400 text-xs sm:text-sm animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span className="font-semibold">{successMessage}</span>
        </div>
      )}

      {/* Categorias + Busca */}
      <div className="space-y-4">
        
        {/* Barra de Busca e Categorias */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.id] || Sparkles;
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20 font-black'
                      : 'bg-[#121215] text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nome, descrição ou tag..."
              className="w-full bg-[#121215] border border-zinc-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
            />
          </div>

        </div>

      </div>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full bg-[#121215] border border-zinc-800 rounded-3xl p-12 text-center space-y-3">
            <Beef className="w-12 h-12 text-zinc-600 mx-auto" />
            <h3 className="text-base font-bold text-white">Nenhum produto encontrado</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Nenhum item corresponde à busca ou categoria selecionada. Clique em "Adicionar Novo Produto" para cadastrar.
            </p>
          </div>
        ) : (
          filteredProducts.map((product) => {
            const unitProfit = Math.max(0, (Number(product.price) || 0) - (Number(product.costPrice) || 0));
            const margin = product.price > 0 ? ((unitProfit / product.price) * 100).toFixed(0) : 0;
            const isDeleting = deleteConfirmId === product.id;

            return (
              <div
                key={product.id}
                className={`bg-[#121215] border rounded-3xl p-5 flex flex-col justify-between space-y-4 transition-all duration-200 shadow-xl ${
                  product.active === false
                    ? 'border-zinc-800/60 opacity-60'
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {/* Imagem + Badge + Status */}
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-zinc-900 border border-zinc-800">
                  <img 
                    src={product.image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80'} 
                    alt={product.name}
                    className="w-full h-full object-cover" 
                  />

                  {product.badge && (
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 font-black text-[10px] shadow-md">
                      {product.badge}
                    </div>
                  )}

                  <div className="absolute top-2.5 right-2.5">
                    <button
                      type="button"
                      onClick={() => toggleProductActive(product.id)}
                      className={`px-2 py-1 rounded-full text-[10px] font-bold shadow-md transition flex items-center space-x-1 ${
                        product.active !== false
                          ? 'bg-emerald-500 text-zinc-950'
                          : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                      }`}
                      title={product.active !== false ? 'Produto ativo no cardápio' : 'Pausado (oculto aos clientes)'}
                    >
                      {product.active !== false ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{product.active !== false ? 'Ativo' : 'Pausado'}</span>
                    </button>
                  </div>
                </div>

                {/* Nome & Descrição */}
                <div className="space-y-1">
                  <h3 className="text-base font-black text-white leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {product.description || 'Sem descrição cadastrada.'}
                  </p>
                </div>

                {/* Preços, Custos e Lucro do Lucas */}
                <div className="bg-[#09090b] border border-zinc-800/80 rounded-2xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400 font-medium">Preço de Venda:</span>
                    <span className="font-black text-white text-sm">
                      {formatCurrency(product.price)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500 font-medium">Custo Insumos:</span>
                    <span className="font-mono text-zinc-400 text-xs">
                      {formatCurrency(product.costPrice || (product.price * 0.35))}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-bold flex items-center space-x-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Lucro do Lucas:</span>
                    </span>
                    <span className="font-black text-emerald-400">
                      {formatCurrency(unitProfit)} ({margin}%)
                    </span>
                  </div>
                </div>

                {/* Botões de Ação (Editar / Deletar) */}
                <div className="pt-2 flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(product)}
                    className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs transition border border-zinc-700 cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5 text-amber-400" />
                    <span>Editar Produto</span>
                  </button>

                  {isDeleting ? (
                    <div className="flex items-center space-x-1 bg-red-500/10 border border-red-500/30 rounded-xl p-1">
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(product.id, product.name)}
                        className="px-2 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold"
                      >
                        Excluir
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(null)}
                        className="p-1 text-zinc-400 hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(product.id)}
                      className="p-2.5 rounded-xl bg-zinc-800/80 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 border border-zinc-700/80 hover:border-red-500/40 transition cursor-pointer"
                      title="Excluir produto do cardápio"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* MODAL ADICIONAR / ALTERAR PRODUTO */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl relative my-8">
            
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  {editingProduct ? <Pencil className="w-5 h-5" /> : <PlusCircle className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-base font-black text-white">
                    {editingProduct ? `Editar: ${editingProduct.name}` : 'Adicionar Novo Produto'}
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    Defina preços, custos de insumos e detalhes visuais
                  </p>
                </div>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              
              {/* Nome do Produto */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Nome do Produto
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Ex: Monster Bacon Cheddar Melt"
                  className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Categoria */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Categoria no Cardápio
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="combos">Combos Especiais</option>
                  <option value="burgers">Hambúrgueres Artesanais</option>
                  <option value="sides">Entradas & Porções</option>
                  <option value="drinks">Bebidas & Shakes</option>
                  <option value="desserts">Sobremesas</option>
                </select>
              </div>

              {/* Preço de Venda vs Preço de Custo */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    Preço de Venda (R$)
                  </label>
                  <div className="relative">
                    <span className="text-zinc-500 text-xs font-bold absolute left-3 top-1/2 -translate-y-1/2">R$</span>
                    <input
                      type="number"
                      step="0.10"
                      min="0"
                      required
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      placeholder="34.90"
                      className="w-full bg-[#09090b] border border-zinc-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    Custo de Insumos (R$)
                  </label>
                  <div className="relative">
                    <span className="text-zinc-500 text-xs font-bold absolute left-3 top-1/2 -translate-y-1/2">R$</span>
                    <input
                      type="number"
                      step="0.10"
                      min="0"
                      value={formCostPrice}
                      onChange={(e) => setFormCostPrice(e.target.value)}
                      placeholder="12.00"
                      className="w-full bg-[#09090b] border border-zinc-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Indicador de Lucro Projetado */}
              {numPrice > 0 && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span className="text-zinc-300">Lucro Líquido do Lucas por Unidade:</span>
                  </div>
                  <span className="font-black text-emerald-400 text-sm">
                    {formatCurrency(projectedProfit)} ({projectedMargin}% margem)
                  </span>
                </div>
              )}

              {/* Tag / Badge */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Badge / Selo de Destaque (Opcional)
                </label>
                <input
                  type="text"
                  value={formBadge}
                  onChange={(e) => setFormBadge(e.target.value)}
                  placeholder="Ex: Mais Vendido, Chef Especial, Artesanal..."
                  className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Descrição */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Descrição dos Ingredientes
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Blend 180g bovino, queijo cheddar inglês, cebola caramelizada no barbecue..."
                  className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Imagem */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Foto do Produto (Escolha uma foto de exemplo ou cole uma URL):
                </label>
                
                <input
                  type="url"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                />

                {/* Galeria de Fotos Rápidas com 1 Clique */}
                <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
                  {SAMPLE_PRODUCT_PHOTOS.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormImage(sample.url)}
                      className={`relative rounded-xl overflow-hidden flex-shrink-0 w-16 h-12 border-2 transition ${
                        formImage === sample.url ? 'border-amber-500 scale-105 shadow-md' : 'border-zinc-800 opacity-60 hover:opacity-100'
                      }`}
                      title={sample.name}
                    >
                      <img src={sample.url} alt={sample.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Ativo no Cardápio */}
              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="chk-active"
                  checked={formActive}
                  onChange={(e) => setFormActive(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-[#09090b] border-zinc-700"
                />
                <label htmlFor="chk-active" className="text-xs text-zinc-300 font-bold select-none cursor-pointer">
                  Disponível para venda imediata no Cardápio e Balcão
                </label>
              </div>

              {formError && (
                <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-2.5 text-center">
                  {formError}
                </p>
              )}

              <div className="pt-2 flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs shadow-lg shadow-amber-500/20 transition active:scale-95 cursor-pointer"
                >
                  {editingProduct ? 'Salvar Alterações' : 'Criar Produto'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
