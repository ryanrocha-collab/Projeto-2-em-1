import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatCPF } from '../../utils/formatters';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  CheckCircle2, 
  QrCode, 
  CreditCard, 
  Banknote, 
  Copy, 
  Check, 
  AlertCircle, 
  ShieldCheck, 
  Clock,
  ShoppingBag
} from 'lucide-react';

export const PaymentScreen = () => {
  const { 
    cart, 
    cartTotal, 
    customerCpf, 
    createOrder, 
    setCurrentScreen 
  } = useApp();

  // Método selecionado: 'PIX', 'CREDIT', 'DEBIT', 'CASH'
  const [paymentMethod, setPaymentMethod] = useState('PIX');
  
  // Opções de Dinheiro
  const [needsChange, setNeedsChange] = useState(false);
  const [changeAmount, setChangeAmount] = useState('');
  
  // Opções de Cartão
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // PIX Copiado state
  const [copiedPix, setCopiedPix] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Exemplo de chave PIX simulada
  const pixCode = '00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-4266141740005204000053039865405' + 
    cartTotal.toFixed(2) + '5802BR5915BURGER 2 EM 16009SAO PAULO62070503***6304ABCD';

  const handleCopyPix = () => {
    navigator.clipboard?.writeText(pixCode);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleFillCardDemo = () => {
    setCardNumber('4111 •••• •••• 4242');
    setCardHolder('CLIENTE VIP');
    setCardExp('12/28');
    setCardCvv('789');
  };

  const handleConfirmOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      // Disparar confetes festivos
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Confetti fallback
      }

      createOrder({
        paymentMethod,
        cashChangeFor: needsChange ? changeAmount : null,
      });

      setIsProcessing(false);
      // Redireciona imediatamente para a tela de acompanhamento do pedido (KDS do Usuário)
      setCurrentScreen('CLIENT_KDS');
    }, 600);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 bg-[#09090b]">
        <div className="text-center space-y-4">
          <p className="text-white font-bold">Nenhum item no carrinho para pagamento.</p>
          <button
            onClick={() => setCurrentScreen('CLIENT_CATALOG')}
            className="px-6 py-2.5 rounded-xl bg-amber-500 text-zinc-950 font-bold"
          >
            Ir ao cardápio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent pb-24 text-zinc-100">
      
      {/* Top Header */}
      <div className="bg-[#121215] border-b border-zinc-800 px-4 py-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setCurrentScreen('CLIENT_CART')}
            className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-zinc-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao carrinho</span>
          </button>
          <h1 className="text-base sm:text-lg font-black text-white">
            Finalizar Pagamento
          </h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Payment Method Selection */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-5 sm:p-6 space-y-5">
            <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-wider flex items-center space-x-2">
              <span>Selecione a Forma de Pagamento</span>
            </h2>

            {/* Method selector buttons */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              
              {/* PIX */}
              <button
                type="button"
                onClick={() => setPaymentMethod('PIX')}
                className={`p-4 rounded-2xl border flex flex-col items-center justify-center text-center space-y-2 transition ${
                  paymentMethod === 'PIX'
                    ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400 shadow-md shadow-emerald-500/10'
                    : 'bg-[#09090b]/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="font-bold text-xs">PIX</span>
                <span className="text-[10px] text-emerald-300/80 font-medium">Aprovação Instantânea</span>
              </button>

              {/* Cartão */}
              <button
                type="button"
                onClick={() => setPaymentMethod('CREDIT')}
                className={`p-4 rounded-2xl border flex flex-col items-center justify-center text-center space-y-2 transition ${
                  paymentMethod === 'CREDIT' || paymentMethod === 'DEBIT'
                    ? 'bg-blue-500/15 border-blue-500 text-blue-400 shadow-md shadow-blue-500/10'
                    : 'bg-[#09090b]/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-400" />
                </div>
                <span className="font-bold text-xs">Cartão</span>
                <span className="text-[10px] text-zinc-400 font-medium">Crédito / Débito</span>
              </button>

              {/* Dinheiro */}
              <button
                type="button"
                onClick={() => setPaymentMethod('CASH')}
                className={`p-4 rounded-2xl border flex flex-col items-center justify-center text-center space-y-2 transition ${
                  paymentMethod === 'CASH'
                    ? 'bg-amber-500/15 border-amber-500 text-amber-400 shadow-md shadow-amber-500/10'
                    : 'bg-[#09090b]/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Banknote className="w-5 h-5 text-amber-400" />
                </div>
                <span className="font-bold text-xs">Dinheiro</span>
                <span className="text-[10px] text-zinc-400 font-medium">Pagar no Balcão</span>
              </button>
            </div>

            {/* Content for PIX */}
            {paymentMethod === 'PIX' && (
              <div className="bg-[#09090b] border border-zinc-800 rounded-2xl p-5 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>QR Code Dinâmico Gerado</span>
                  </span>
                  <span className="text-xs text-zinc-400 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Expira em 10:00</span>
                  </span>
                </div>

                {/* Simulated QR Code Visual */}
                <div className="bg-white p-4 rounded-2xl w-44 h-44 mx-auto flex flex-col items-center justify-center shadow-lg relative">
                  <div className="w-full h-full border-4 border-black p-1 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div className="w-8 h-8 bg-black"></div>
                      <div className="w-4 h-4 bg-black"></div>
                      <div className="w-8 h-8 bg-black"></div>
                    </div>
                    <div className="grid grid-cols-5 gap-1 my-auto">
                      <div className="w-3 h-3 bg-black"></div>
                      <div className="w-3 h-3 bg-zinc-300"></div>
                      <div className="w-3 h-3 bg-black"></div>
                      <div className="w-3 h-3 bg-black"></div>
                      <div className="w-3 h-3 bg-zinc-300"></div>
                      <div className="w-3 h-3 bg-black"></div>
                      <div className="w-3 h-3 bg-zinc-400"></div>
                      <div className="w-3 h-3 bg-black"></div>
                      <div className="w-3 h-3 bg-zinc-400"></div>
                      <div className="w-3 h-3 bg-black"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-8 h-8 bg-black"></div>
                      <div className="w-4 h-4 bg-black"></div>
                      <div className="w-8 h-8 bg-black"></div>
                    </div>
                  </div>
                </div>

                {/* Pix Copia e Cola */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    Código PIX Copia e Cola
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      readOnly
                      value={pixCode}
                      className="bg-[#121215] border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-zinc-400 flex-1 truncate focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleCopyPix}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition ${
                        copiedPix
                          ? 'bg-emerald-500 text-zinc-950'
                          : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                      }`}
                    >
                      {copiedPix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedPix ? 'Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-start space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Após realizar a transferência no app do seu banco, seu pedido será enviado imediatamente para a cozinha.
                  </span>
                </div>
              </div>
            )}

            {/* Content for Credit / Debit */}
            {(paymentMethod === 'CREDIT' || paymentMethod === 'DEBIT') && (
              <div className="bg-[#09090b] border border-zinc-800 rounded-2xl p-5 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('CREDIT')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        paymentMethod === 'CREDIT'
                          ? 'bg-blue-600 text-white'
                          : 'bg-[#121215] text-zinc-400'
                      }`}
                    >
                      Crédito
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('DEBIT')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        paymentMethod === 'DEBIT'
                          ? 'bg-blue-600 text-white'
                          : 'bg-[#121215] text-zinc-400'
                      }`}
                    >
                      Débito
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleFillCardDemo}
                    className="text-[11px] font-semibold text-blue-400 hover:underline"
                  >
                    Preencher Dados Teste
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      Número do Cartão
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="0000 0000 0000 0000"
                      className="w-full bg-[#121215] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      Nome Impresso no Cartão
                    </label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="NOME DO TITULAR"
                      className="w-full bg-[#121215] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm uppercase text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Validade
                      </label>
                      <input
                        type="text"
                        value={cardExp}
                        onChange={(e) => setCardExp(e.target.value)}
                        placeholder="MM/AA"
                        maxLength={5}
                        className="w-full bg-[#121215] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="123"
                        maxLength={4}
                        className="w-full bg-[#121215] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Content for Dinheiro em Espécie */}
            {paymentMethod === 'CASH' && (
              <div className="bg-[#09090b] border border-zinc-800 rounded-2xl p-5 space-y-4 animate-in fade-in">
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    Você escolheu <strong>pagamento em dinheiro</strong>. O acerto será feito diretamente com a balconista na retirada do pedido.
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-bold text-zinc-300">
                    Vai precisar de troco?
                  </label>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setNeedsChange(false)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition border ${
                        !needsChange
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                          : 'bg-[#121215] border-zinc-800 text-zinc-400'
                      }`}
                    >
                      Não preciso de troco
                    </button>
                    <button
                      type="button"
                      onClick={() => setNeedsChange(true)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition border ${
                        needsChange
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                          : 'bg-[#121215] border-zinc-800 text-zinc-400'
                      }`}
                    >
                      Sim, preciso de troco
                    </button>
                  </div>

                  {needsChange && (
                    <div className="space-y-1.5 pt-2 animate-in fade-in">
                      <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                        Troco para quanto em dinheiro?
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 font-bold text-sm">
                          R$
                        </span>
                        <input
                          type="number"
                          value={changeAmount}
                          onChange={(e) => setChangeAmount(e.target.value)}
                          placeholder="Ex: 50 ou 100"
                          step="5"
                          className="w-full bg-[#121215] border border-zinc-800 rounded-xl pl-10 pr-3.5 py-2.5 text-sm font-bold text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      {changeAmount && parseFloat(changeAmount) > cartTotal && (
                        <p className="text-xs text-emerald-400 font-medium pt-1">
                          Troco estimado a receber: <strong>{formatCurrency(parseFloat(changeAmount) - cartTotal)}</strong>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Column: Order Summary & Confirm Action */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider flex items-center space-x-2">
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>Itens do Pedido ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
            </h3>

            <div className="divide-y divide-zinc-800 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="py-2.5 flex justify-between text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-white">{item.quantity}x {item.name}</span>
                    {item.meatTemp && (
                      <p className="text-[11px] text-zinc-400">Ponto: {item.meatTemp}</p>
                    )}
                    {(item.addons || []).length > 0 && (
                      <p className="text-[11px] text-amber-400/80">+{item.addons.join(', ')}</p>
                    )}
                  </div>
                  <span className="font-bold text-zinc-300 shrink-0 ml-2">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-zinc-800 space-y-2">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Cliente</span>
                <span className="font-medium text-zinc-200">
                  {customerCpf ? formatCPF(customerCpf) : 'Visitante'}
                </span>
              </div>
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Localização</span>
                <span className="font-medium text-zinc-200">Mesa 04 (QR Code)</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-zinc-800">
                <span className="text-sm font-bold text-white">Total a Pagar</span>
                <span className="text-2xl font-black text-amber-400">
                  {formatCurrency(cartTotal)}
                </span>
              </div>
            </div>

            <button
              onClick={handleConfirmOrder}
              disabled={isProcessing}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-black text-base flex items-center justify-center space-x-2 shadow-xl shadow-emerald-500/20 active:scale-[0.98] transition disabled:opacity-50"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{isProcessing ? 'Enviando à Cozinha...' : 'Confirmar & Enviar Pedido'}</span>
            </button>

            <p className="text-[11px] text-zinc-500 text-center">
              Ao confirmar, você receberá um <strong>código do pedido</strong> para acompanhar no KDS.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};



