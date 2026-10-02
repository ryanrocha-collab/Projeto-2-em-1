import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatTime, getMinutesElapsed } from '../../utils/formatters';
import { 
  Store, 
  CheckCircle2, 
  Banknote, 
  ArrowRight, 
  Receipt, 
  X,
  PlusCircle,
  ShoppingBag,
  Plus,
  Minus,
  Search,
  CreditCard,
  QrCode
} from 'lucide-react';
import { soundEffects } from '../../utils/audio';

export const CounterScreen = () => {
  const { 
    orders, 
    deliverOrder,
    products = [],
    createOrder 
  } = useApp();

  const [searchCode, setSearchCode] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cashReceivedInput, setCashReceivedInput] = useState('');
  const [deliverySuccessMessage, setDeliverySuccessMessage] = useState('');

  // Estados para o PDV de Balcão (Fazer Pedido no Balcão)
  const [newOrderModalOpen, setNewOrderModalOpen] = useState(false);
  const [posCustomerName, setPosCustomerName] = useState('Cliente Balcão');
  const [posOrigin, setPosOrigin] = useState('Balcão / Retirada');
  const [posPaymentMethod, setPosPaymentMethod] = useState('PIX');
  const [posCashChangeFor, setPosCashChangeFor] = useState('');
  const [posSearchProduct, setPosSearchProduct] = useState('');
  const [posSelectedItems, setPosSelectedItems] = useState([]); // [{ product, quantity }]

  // Pedidos prontos para serem retirados no balcão
  const readyOrders = orders.filter((o) => o.status === 'READY');
  // Pedidos já entregues hoje
  const deliveredOrders = orders.filter((o) => o.status === 'DELIVERED');

  // Filtragem por busca
  const filteredReadyOrders = readyOrders.filter((order) => {
    if (!searchCode.trim()) return true;
    const q = searchCode.toLowerCase().trim();
    return (
      order.code.toLowerCase().includes(q) ||
      (order.cpf && order.cpf.includes(q))
    );
  });

  const handleOpenDeliveryModal = (order) => {
    setSelectedOrder(order);
    setCashReceivedInput(order.cashChangeFor ? String(order.cashChangeFor) : '');
  };

  const handleConfirmDelivery = () => {
    if (!selectedOrder) return;

    let cashValue = null;
    if (selectedOrder.paymentMethod === 'CASH') {
      cashValue = parseFloat(cashReceivedInput || selectedOrder.total);
    }

    deliverOrder(selectedOrder.code, cashValue);
    soundEffects.playOrderReady();

    setDeliverySuccessMessage(`Pedido #${selectedOrder.code} marcado como ENTREGUE com sucesso!`);
    setTimeout(() => setDeliverySuccessMessage(''), 4000);

    setSelectedOrder(null);
    setCashReceivedInput('');
  };

  const calculateChange = () => {
    if (!selectedOrder || selectedOrder.paymentMethod !== 'CASH') return 0;
    const received = parseFloat(cashReceivedInput || 0);
    return Math.max(0, received - selectedOrder.total);
  };

  // Funções do PDV do Balcão
  const handleAddItemToPos = (prod) => {
    setPosSelectedItems((prev) => {
      const existing = prev.find((item) => item.product.id === prod.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === prod.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product: prod, quantity: 1 }];
    });
  };

  const handleUpdatePosQuantity = (prodId, delta) => {
    setPosSelectedItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === prodId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const posTotal = posSelectedItems.reduce(
    (sum, item) => sum + (Number(item.product.price) || 0) * item.quantity,
    0
  );

  const handleConfirmPosOrder = (e) => {
    e.preventDefault();
    if (posSelectedItems.length === 0) {
      alert('Selecione pelo menos um item para registrar o pedido no balcão.');
      return;
    }

    const orderItems = posSelectedItems.map((it) => ({
      id: it.product.id,
      name: it.product.name,
      price: it.product.price,
      costPrice: it.product.costPrice || (Number(it.product.price) * 0.35),
      quantity: it.quantity,
      addons: [],
      notes: '',
    }));

    const newOrder = createOrder({
      paymentMethod: posPaymentMethod,
      cashChangeFor: posPaymentMethod === 'CASH' ? posCashChangeFor : null,
      notes: 'Pedido realizado diretamente no Balcão pela equipe',
      customItems: orderItems,
      customerIdentifier: posCustomerName || 'Cliente Balcão',
      origin: posOrigin,
    });

    setDeliverySuccessMessage(`Novo pedido #${newOrder.code} criado e enviado diretamente para a Cozinha!`);
    setTimeout(() => setDeliverySuccessMessage(''), 5000);

    // Resetar POS
    setPosSelectedItems([]);
    setPosCustomerName('Cliente Balcão');
    setPosCashChangeFor('');
    setNewOrderModalOpen(false);
  };

  const filteredProductsForPos = products.filter((p) => {
    if (p.active === false) return false;
    if (!posSearchProduct.trim()) return true;
    return (
      (p.name || '').toLowerCase().includes(posSearchProduct.toLowerCase()) ||
      (p.description || '').toLowerCase().includes(posSearchProduct.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-transparent text-zinc-100 pb-20">
      
      {/* Balcão Header */}
      <div className="bg-[#121215] border-b border-zinc-800 px-4 py-3 sm:px-6 sticky top-16 sm:top-20 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base sm:text-lg font-black text-white">
                  Painel do Balcão • Entrega, Caixa & Pedidos
                </h1>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-xs text-zinc-400">
                Atendimento presencial, realização de pedidos no balcão e entrega com recebimento
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            {/* Botão NOVO PEDIDO NO BALCÃO */}
            <button
              onClick={() => setNewOrderModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs shadow-lg shadow-amber-500/20 transition active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Novo Pedido no Balcão (PDV)</span>
            </button>

            <div className="bg-[#09090b] border border-amber-500/30 px-3 py-1.5 rounded-xl flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs text-zinc-300 font-bold">Prontos p/ Entrega:</span>
              <span className="text-sm font-black text-amber-400">{readyOrders.length}</span>
            </div>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Success Alert Banner */}
        {deliverySuccessMessage && (
          <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-bold flex items-center space-x-2 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{deliverySuccessMessage}</span>
          </div>
        )}

        {/* Search Bar by Order Code */}
        <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-5 sm:p-6 space-y-3">
          <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
            Localizar Pedido pelo Código informado pelo Cliente no Balcão:
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-mono font-black text-xl">
              #
            </span>
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Digite o código (ex: 1040, 1041...) ou CPF do cliente"
              className="w-full bg-[#09090b] border border-zinc-800 rounded-2xl pl-10 pr-4 py-3.5 text-base sm:text-lg font-mono font-bold text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 shadow-inner"
            />
            {searchCode && (
              <button
                type="button"
                onClick={() => setSearchCode('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* LISTA DE PEDIDOS PRONTOS PARA RETIRADA NO BALCÃO */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-black text-white flex items-center space-x-2">
              <span>Pedidos Aguardando Retirada & Pagamento</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                {filteredReadyOrders.length}
              </span>
            </h2>
            <span className="text-xs text-zinc-400">
              Cozinha já finalizou o preparo
            </span>
          </div>

          {filteredReadyOrders.length === 0 ? (
            <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-10 text-center space-y-3">
              <Store className="w-12 h-12 text-zinc-600 mx-auto" />
              <p className="text-sm font-bold text-zinc-300">
                Nenhum pedido aguardando no balcão no momento.
              </p>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Quando a cozinha clicar em "Finalizar Preparo", o pedido aparecerá aqui para ser chamado e entregue ao cliente.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredReadyOrders.map((order) => {
                const isCashPending = order.paymentStatus === 'PENDING_CASH' || order.paymentMethod === 'CASH';

                return (
                  <div
                    key={order.code}
                    className="bg-[#121215] border-2 border-amber-500/60 rounded-3xl p-5 flex flex-col justify-between space-y-4 shadow-xl hover:shadow-amber-500/10 transition duration-200"
                  >
                    <div>
                      {/* Top Card Info */}
                      <div className="flex items-start justify-between pb-3 border-b border-zinc-800">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-black font-mono text-amber-400">
                              #{order.code}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                              {order.table || 'Balcão'}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 mt-0.5">
                            Cliente: {order.cpf || 'Não informado'}
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="text-xs text-zinc-500 block">
                            Pronto há {getMinutesElapsed(order.readyAt || order.createdAt)} min
                          </span>
                          <span className="text-xs font-semibold text-zinc-400">
                            {formatTime(order.createdAt)}
                          </span>
                        </div>
                      </div>

                      {/* Payment Status Alert */}
                      <div className="mt-3">
                        {isCashPending ? (
                          <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Banknote className="w-4 h-4 text-amber-400" />
                              <span>Receber em Dinheiro</span>
                            </div>
                            <span className="text-sm font-black font-mono text-amber-400">
                              {formatCurrency(order.total)}
                            </span>
                          </div>
                        ) : (
                          <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <span>Pago via {order.paymentMethod}</span>
                            </div>
                            <span className="text-xs font-black text-emerald-400 font-mono">
                              QUITADO
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Order Items Summary */}
                      <div className="mt-3 space-y-2 max-h-36 overflow-y-auto pr-1">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-start text-xs border-b border-zinc-800/60 pb-1.5">
                            <div className="pr-2">
                              <span className="font-bold text-white">
                                {item.quantity}x {item.name}
                              </span>
                              {item.notes && (
                                <p className="text-[10px] text-amber-400/90 font-medium">
                                  Obs: {item.notes}
                                </p>
                              )}
                            </div>
                            <span className="text-zinc-400 font-mono text-[11px] shrink-0">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      type="button"
                      onClick={() => handleOpenDeliveryModal(order)}
                      className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-orange-500/20 transition active:scale-[0.98] cursor-pointer"
                    >
                      <Receipt className="w-4 h-4" />
                      <span>{isCashPending ? 'Receber & Entregar' : 'Entregar ao Cliente'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* HISTÓRICO DE PEDIDOS JÁ ENTREGUES HOJE */}
        {deliveredOrders.length > 0 && (
          <div className="pt-6 space-y-4">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
              Pedidos Entregues Recentemente Hoje ({deliveredOrders.length}):
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {deliveredOrders.slice(0, 6).map((order) => (
                <div
                  key={order.code}
                  className="bg-[#121215]/60 border border-zinc-800 rounded-2xl p-3.5 flex items-center justify-between text-xs text-zinc-400"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-white text-sm">
                        #{order.code}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-emerald-400 font-bold">
                        Entregue
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500">
                      {order.items?.length || 0} itens • {formatCurrency(order.total)}
                    </p>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    {formatTime(order.deliveredAt || order.createdAt)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* MODAL NOVO PEDIDO NO BALCÃO (PDV) */}
      {newOrderModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl relative my-8">
            
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Novo Pedido no Balcão (PDV)</h3>
                  <p className="text-[11px] text-zinc-400">Lance pedidos feitos pessoalmente no balcão</p>
                </div>
              </div>

              <button
                onClick={() => setNewOrderModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmPosOrder} className="space-y-4">
              
              {/* Identificação do Cliente */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    Nome / Identificação do Cliente
                  </label>
                  <input
                    type="text"
                    value={posCustomerName}
                    onChange={(e) => setPosCustomerName(e.target.value)}
                    placeholder="Ex: João Silva ou Ana Balcão"
                    className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    Origem / Mesa
                  </label>
                  <select
                    value={posOrigin}
                    onChange={(e) => setPosOrigin(e.target.value)}
                    className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Balcão / Retirada">Balcão / Retirada</option>
                    <option value="Mesa 01">Mesa 01</option>
                    <option value="Mesa 02">Mesa 02</option>
                    <option value="Mesa 03">Mesa 03</option>
                    <option value="Mesa 04">Mesa 04</option>
                    <option value="Mesa 05">Mesa 05</option>
                    <option value="Para Viagem">Para Viagem</option>
                  </select>
                </div>
              </div>

              {/* Seletor de Produtos */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    Adicionar Produtos ao Pedido:
                  </label>
                  <span className="text-[11px] text-zinc-400">
                    {posSelectedItems.length} itens adicionados
                  </span>
                </div>

                <div className="relative">
                  <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={posSearchProduct}
                    onChange={(e) => setPosSearchProduct(e.target.value)}
                    placeholder="Buscar produto pelo nome..."
                    className="w-full bg-[#09090b] border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Grid Compacto de Produtos Disponíveis */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                  {filteredProductsForPos.map((prod) => (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => handleAddItemToPos(prod)}
                      className="p-2 rounded-xl bg-[#09090b] hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/50 text-left transition flex items-center space-x-2 cursor-pointer"
                    >
                      <img src={prod.image} alt={prod.name} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{prod.name}</p>
                        <p className="text-[10px] text-amber-400 font-mono">{formatCurrency(prod.price)}</p>
                      </div>
                      <Plus className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Itens Selecionados no Pedido */}
              {posSelectedItems.length > 0 && (
                <div className="bg-[#09090b] border border-zinc-800 rounded-2xl p-3 space-y-2">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Resumo do Pedido Atual:
                  </span>
                  <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                    {posSelectedItems.map((item) => (
                      <div key={item.product.id} className="flex items-center justify-between text-xs py-1 border-b border-zinc-800/60">
                        <span className="font-bold text-white truncate max-w-[180px]">
                          {item.product.name}
                        </span>
                        
                        <div className="flex items-center space-x-3">
                          <span className="font-mono text-zinc-400 text-xs">
                            {formatCurrency(item.product.price * item.quantity)}
                          </span>

                          <div className="flex items-center space-x-1.5 bg-zinc-800 rounded-lg p-0.5">
                            <button
                              type="button"
                              onClick={() => handleUpdatePosQuantity(item.product.id, -1)}
                              className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold px-1.5 text-white">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleUpdatePosQuantity(item.product.id, 1)}
                              className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-zinc-800 font-black text-sm">
                    <span className="text-zinc-300">Total do Pedido:</span>
                    <span className="text-amber-400 text-base">{formatCurrency(posTotal)}</span>
                  </div>
                </div>
              )}

              {/* Forma de Pagamento */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Forma de Pagamento no Balcão:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPosPaymentMethod('PIX')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold flex items-center justify-center space-x-1.5 cursor-pointer ${
                      posPaymentMethod === 'PIX'
                        ? 'bg-amber-500 text-zinc-950 font-black'
                        : 'bg-[#09090b] text-zinc-400 border-zinc-800'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span>PIX</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPosPaymentMethod('CREDIT')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold flex items-center justify-center space-x-1.5 cursor-pointer ${
                      posPaymentMethod === 'CREDIT'
                        ? 'bg-amber-500 text-zinc-950 font-black'
                        : 'bg-[#09090b] text-zinc-400 border-zinc-800'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Cartão</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPosPaymentMethod('CASH')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold flex items-center justify-center space-x-1.5 cursor-pointer ${
                      posPaymentMethod === 'CASH'
                        ? 'bg-amber-500 text-zinc-950 font-black'
                        : 'bg-[#09090b] text-zinc-400 border-zinc-800'
                    }`}
                  >
                    <Banknote className="w-4 h-4" />
                    <span>Dinheiro</span>
                  </button>
                </div>

                {posPaymentMethod === 'CASH' && (
                  <div className="pt-2">
                    <label className="block text-[11px] font-bold text-zinc-400 mb-1">
                      Troco para quanto em dinheiro? (Opcional):
                    </label>
                    <input
                      type="number"
                      step="5"
                      value={posCashChangeFor}
                      onChange={(e) => setPosCashChangeFor(e.target.value)}
                      placeholder="Ex: 50.00 ou 100.00"
                      className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                )}
              </div>

              {/* Botões de Ação */}
              <div className="pt-2 flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setNewOrderModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={posSelectedItems.length === 0}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 text-zinc-950 font-black text-xs shadow-lg shadow-orange-500/20 transition active:scale-95 cursor-pointer"
                >
                  Enviar para a Cozinha ({formatCurrency(posTotal)})
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* MODAL DE ENTREGA & RECEBIMENTO DE PAGAMENTO */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl relative">
            
            {/* Header Modal */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-black font-mono text-amber-400">
                  Pedido #{selectedOrder.code}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                  {selectedOrder.table}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Total do Pedido */}
            <div className="p-4 rounded-2xl bg-[#09090b] border border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Valor Total do Pedido:
              </span>
              <span className="text-2xl font-black font-mono text-white">
                {formatCurrency(selectedOrder.total)}
              </span>
            </div>

            {/* Formulário de Dinheiro em Espécie (se pagamento em dinheiro) */}
            {selectedOrder.paymentMethod === 'CASH' ? (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Valor Recebido em Espécie (R$):
                  </label>
                  <input
                    type="number"
                    step="0.50"
                    value={cashReceivedInput}
                    onChange={(e) => setCashReceivedInput(e.target.value)}
                    placeholder={String(selectedOrder.total)}
                    className="w-full bg-[#09090b] border border-amber-500/50 rounded-xl px-4 py-3 text-lg font-mono font-black text-amber-300 focus:outline-none focus:border-amber-400 shadow-inner"
                  />
                </div>

                {/* Cálculo do Troco */}
                <div className="p-3 rounded-xl bg-[#09090b] border border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-400">Troco a devolver:</span>
                  <span className="text-xl font-black text-emerald-400">
                    {formatCurrency(calculateChange())}
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  Pedido 100% quitado via {selectedOrder.paymentMethod}. Não há valores a cobrar no balcão.
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="flex-1 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition cursor-pointer"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelivery}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Marcar como ENTREGUE</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
