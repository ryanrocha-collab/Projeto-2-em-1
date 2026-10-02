import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  ArrowRight, 
  Tag, 
  Check, 
  MessageSquare, 
  UtensilsCrossed 
} from 'lucide-react';

export const CartScreen = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    cartTotal, 
    setCurrentScreen 
  } = useApp();

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();

    if (clean === 'DAPRACA10' || clean === 'BURGER10' || clean === 'BEMVINDO' || clean === 'PRIMEIRACOMPRA') {
      setDiscountPercent(10);
      setCouponSuccess('Cupom de 10% aplicado com sucesso!');
      setCouponError('');
    } else if (clean === 'DAPRACA20' || clean === 'BURGER20') {
      setDiscountPercent(20);
      setCouponSuccess('Cupom VIP de 20% aplicado com sucesso!');
      setCouponError('');
    } else {
      setCouponError('Cupom inválido. Experimente usar "DAPRACA10"');
      setCouponSuccess('');
      setDiscountPercent(0);
    }
  };

  const discountAmount = (cartTotal * discountPercent) / 100;
  const finalTotal = Math.max(0, cartTotal - discountAmount);

  if (cart.length === 0) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 bg-transparent">
        <div className="max-w-md w-full text-center space-y-5 bg-gradient-to-b from-[#18181c] to-[#101013] border border-zinc-800 rounded-3xl p-8 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Seu carrinho está vazio</h2>
            <p className="text-xs text-zinc-400 mt-1">
              Explore nosso cardápio e adicione seus itens favoritos para continuar.
            </p>
          </div>
          <button
            onClick={() => setCurrentScreen('CLIENT_CATALOG')}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 font-black text-sm flex items-center justify-center space-x-2 transition shadow-lg shadow-orange-500/20"
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Voltar ao Cardápio</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent pb-28 text-zinc-100">
      
      {/* Header bar */}
      <div className="bg-[#0e0e11]/90 border-b border-zinc-800/80 px-4 py-4 sm:px-6 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setCurrentScreen('CLIENT_CATALOG')}
            className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-zinc-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Adicionar mais itens</span>
          </button>

          <h1 className="text-lg font-black text-white flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <span>Meu Carrinho</span>
          </h1>

          <button
            onClick={clearCart}
            className="text-xs text-red-400 hover:text-red-300 font-semibold"
          >
            Esvaziar
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Cart items list */}
        <div className="space-y-3">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="bg-gradient-to-b from-[#161619] to-[#101013] border border-zinc-800/90 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
            >
              <div className="flex items-start space-x-3.5 flex-1">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover bg-black shrink-0"
                  />
                )}
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-sm sm:text-base">
                    {item.name}
                  </h4>
                  
                  {/* Badges for custom options */}
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    {item.meatTemp && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                        Ponto: {item.meatTemp}
                      </span>
                    )}
                    {(item.addons || []).map((addon, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700 font-medium"
                      >
                        +{addon}
                      </span>
                    ))}
                  </div>

                  {item.notes && (
                    <p className="text-[11px] text-zinc-400 italic">
                      Obs: "{item.notes}"
                    </p>
                  )}

                  <p className="text-sm font-bold text-amber-400 pt-0.5">
                    {formatCurrency(item.price)} cada
                  </p>
                </div>
              </div>

              {/* Quantity controls & item subtotal */}
              <div className="flex items-center justify-between sm:justify-end sm:space-x-5 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800">
                <div className="flex items-center space-x-2 bg-[#09090b] border border-zinc-800 rounded-xl p-1">
                  <button
                    onClick={() => updateCartQuantity(item.cartItemId, -1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center font-bold text-white text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item.cartItemId, 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-base font-black text-white block">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="text-[11px] text-red-400 hover:text-red-300 font-medium inline-flex items-center space-x-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remover</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coupon Section */}
        <div className="bg-[#121215] border border-zinc-800 rounded-2xl p-4">
          <form onSubmit={handleApplyCoupon} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Tag className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Tem cupom? Ex: DAPRACA10"
                className="w-full bg-[#09090b] border border-zinc-800 rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm uppercase font-semibold text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
              />
            </div>
            <button
              type="submit"
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 font-black text-xs sm:text-sm transition shadow-md shadow-orange-500/15"
            >
              Aplicar Cupom
            </button>
          </form>

          {/* Quick Click Coupon */}
          {!discountPercent && (
            <div className="mt-2.5 flex items-center space-x-2 text-[11px] text-zinc-400">
              <span>Sugestão da casa:</span>
              <button
                type="button"
                onClick={() => {
                  setCouponCode('DAPRACA10');
                  setDiscountPercent(10);
                  setCouponSuccess('Cupom DAPRACA10 (10% OFF) aplicado!');
                  setCouponError('');
                }}
                className="px-2.5 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold hover:bg-amber-500/20 transition cursor-pointer"
              >
                🔥 DAPRACA10 (-10%)
              </button>
            </div>
          )}

          {couponSuccess && (
            <p className="text-xs text-emerald-400 font-semibold mt-2 flex items-center space-x-1.5">
              <Check className="w-4 h-4" />
              <span>{couponSuccess}</span>
            </p>
          )}
          {couponError && (
            <p className="text-xs text-red-400 font-semibold mt-2">
              {couponError}
            </p>
          )}
        </div>

        {/* Order Notes */}
        <div className="bg-[#121215] border border-zinc-800 rounded-2xl p-4 space-y-2">
          <label className="flex items-center space-x-1.5 text-xs font-bold text-zinc-300 uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            <span>Instruções Gerais para a Cozinha</span>
          </label>
          <input
            type="text"
            value={generalNotes}
            onChange={(e) => setGeneralNotes(e.target.value)}
            placeholder="Ex: Tudo para viagem, enviar bastante guardanapo e canudos..."
            className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Financial Summary */}
        <div className="bg-gradient-to-b from-[#18181c] to-[#101013] border border-zinc-800 rounded-3xl p-5 sm:p-6 space-y-3 shadow-lg">
          <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">
            Resumo dos Valores
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal dos itens</span>
              <span className="font-semibold text-white">{formatCurrency(cartTotal)}</span>
            </div>

            {discountPercent > 0 && (
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Desconto ({discountPercent}%)</span>
                <span>-{formatCurrency(discountAmount)}</span>
              </div>
            )}

            <div className="pt-3 border-t border-zinc-800 flex justify-between items-baseline">
              <span className="text-base font-bold text-white">Total a Pagar</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-400">
                {formatCurrency(finalTotal)}
              </span>
            </div>
          </div>

          <div className="pt-3">
            <button
              onClick={() => setCurrentScreen('CLIENT_PAYMENT')}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-zinc-950 font-black text-base flex items-center justify-center space-x-2 shadow-xl shadow-orange-500/20 active:scale-[0.98] transition"
            >
              <span>Avançar para o Pagamento</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

