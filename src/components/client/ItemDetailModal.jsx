import React, { useState } from 'react';
import { formatCurrency } from '../../utils/formatters';
import { X, Plus, Minus, Check, MessageSquare } from 'lucide-react';

export const ItemDetailModal = ({ item, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedTemp, setSelectedTemp] = useState('Ao ponto');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [notes, setNotes] = useState('');

  if (!isOpen || !item) return null;

  const MEAT_TEMPS = ['Mal passado', 'Ao ponto', 'Bem passado'];

  const toggleAddon = (addon) => {
    setSelectedAddons((prev) => {
      const exists = prev.some((a) => a.id === addon.id);
      if (exists) {
        return prev.filter((a) => a.id !== addon.id);
      }
      return [...prev, addon];
    });
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const unitPriceWithAddons = item.price + addonsTotal;
  const totalPrice = unitPriceWithAddons * quantity;

  const handleAdd = () => {
    onAddToCart({
      id: item.id,
      name: item.name,
      price: unitPriceWithAddons,
      basePrice: item.price,
      quantity,
      image: item.image,
      meatTemp: item.options?.meatTemp ? selectedTemp : null,
      addons: selectedAddons.map((a) => `${a.name} (+${formatCurrency(a.price)})`),
      notes: notes.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#09090b]/80 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-[#121215] border border-zinc-800 rounded-t-3xl sm:rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6 duration-300"
      >
        
        {/* Header with image */}
        <div className="relative h-48 sm:h-56 w-full shrink-0 bg-[#09090b]">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#121215]/80 backdrop-blur-md text-white hover:bg-zinc-800 flex items-center justify-center border border-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {item.badge && (
            <span className="absolute bottom-4 left-4 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500 text-zinc-950 shadow-md">
              {item.badge}
            </span>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {item.name}
            </h2>
            <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
              {item.description}
            </p>
            <p className="text-lg font-black text-amber-400 mt-2">
              {formatCurrency(item.price)}
            </p>
          </div>

          {/* Ponto da Carne (se hambúrguer) */}
          {item.options?.meatTemp && (
            <div className="space-y-2.5 pt-2 border-t border-zinc-800">
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Ponto da Carne <span className="text-amber-400">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {MEAT_TEMPS.map((temp) => (
                  <button
                    type="button"
                    key={temp}
                    onClick={() => setSelectedTemp(temp)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold transition border ${
                      selectedTemp === temp
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400 shadow-sm'
                        : 'bg-[#09090b] border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {temp}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Adicionais Opcionais */}
          {item.options?.addons && item.options.addons.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-zinc-800">
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Ingredientes Extras / Adicionais
              </label>
              <div className="space-y-2">
                {item.options.addons.map((addon) => {
                  const isChecked = selectedAddons.some((a) => a.id === addon.id);
                  return (
                    <button
                      type="button"
                      key={addon.id}
                      onClick={() => toggleAddon(addon)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm transition text-left ${
                        isChecked
                          ? 'bg-amber-500/10 border-amber-500/50 text-white'
                          : 'bg-[#09090b]/60 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                            isChecked
                              ? 'bg-amber-500 border-amber-500 text-zinc-950'
                              : 'border-zinc-700 bg-[#121215]'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="font-medium">{addon.name}</span>
                      </div>
                      <span className="font-bold text-amber-400 text-xs">
                        +{formatCurrency(addon.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Observações */}
          <div className="space-y-2 pt-2 border-t border-zinc-800">
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-1.5 text-xs font-bold text-zinc-300 uppercase tracking-wider">
                <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                <span>Alguma Observação Especial?</span>
              </label>
              <span className="text-[10px] text-zinc-500 font-medium">Opcional</span>
            </div>

            {/* Quick Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Sem cebola', 'Sem picles', 'Molho à parte', 'Pão bem tostado', 'Caprichar no cheddar'].map((chip) => {
                const isSelected = notes.includes(chip);
                return (
                  <button
                    type="button"
                    key={chip}
                    onClick={() => {
                      if (isSelected) {
                        setNotes((prev) => prev.replace(chip, '').replace(/^,\s*|,\s*$/g, '').trim());
                      } else {
                        setNotes((prev) => (prev ? `${prev}, ${chip}` : chip));
                      }
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition border ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-[#09090b] border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}{chip}
                  </button>
                );
              })}
            </div>

            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: sem cebola, molho à parte, carne bem passada..."
              className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 mt-2 transition"
            />
          </div>
        </div>

        {/* Footer actions: Quantity + Add Button */}
        <div className="p-4 sm:p-5 bg-[#09090b] border-t border-zinc-800 flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-[#121215] border border-zinc-800 rounded-2xl p-1 shrink-0">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 disabled:opacity-30 transition"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-6 text-center font-black text-white text-base">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 font-black text-sm sm:text-base flex items-center justify-between shadow-lg shadow-orange-500/20 active:scale-[0.98] transition"
          >
            <span>Adicionar ao Pedido</span>
            <span>{formatCurrency(totalPrice)}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

