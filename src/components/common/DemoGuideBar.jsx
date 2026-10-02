import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  ChevronUp, 
  ChevronDown, 
  RotateCcw
} from 'lucide-react';

export const DemoGuideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentScreen, setCurrentScreen } = useApp();

  const resetAllData = () => {
    if (window.confirm('Deseja restaurar os pedidos de teste para a demonstração inicial?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const steps = [
    {
      id: 'CLIENT_WELCOME',
      title: '1. Tela Inicial (QR Code)',
      role: 'Cliente',
      desc: 'Digita apenas o CPF para entrar ou busca pelo código do pedido existente.',
    },
    {
      id: 'CLIENT_CATALOG',
      title: '2. Catálogo de Comida',
      role: 'Cliente',
      desc: 'Visualiza hambúrgueres, combos, bebidas, sobremesas e adiciona ao carrinho com observações.',
    },
    {
      id: 'CLIENT_CART',
      title: '3. Tela do Carrinho',
      role: 'Cliente',
      desc: 'Revisa quantidades, aplica cupons (ex: DAPRACA10) e confere o subtotal.',
    },
    {
      id: 'CLIENT_PAYMENT',
      title: '4. Tela do Pagamento',
      role: 'Cliente',
      desc: 'Escolhe PIX, Cartão ou Dinheiro em espécie (com troco) e gera o pedido.',
    },
    {
      id: 'CLIENT_KDS',
      title: '5. KDS do Usuário',
      role: 'Cliente',
      desc: 'Acompanha o status do pedido pelo código em tempo real (Recebido ➔ Preparando ➔ Pronto ➔ Entregue).',
    },
    {
      id: 'KITCHEN_KDS',
      title: '6. Tablet da Cozinha',
      role: 'Cozinha',
      desc: 'Recebe os pedidos feitos e clica em "Iniciar Pedido" e depois "Finalizar Preparo".',
    },
    {
      id: 'COUNTER',
      title: '7. Painel do Balcão (PDV & Entrega)',
      role: 'Balcão',
      desc: 'Lança pedidos diretamente no balcão, cobra dinheiro com troco e marca entregas.',
    },
    {
      id: 'AUTH',
      title: '8. Tela de Login',
      role: 'Equipe',
      desc: 'Acesso do Lucas, Cozinha e Balcão (com atalhos rápidos de demonstração).',
    },
    {
      id: 'LUCAS_DASHBOARD',
      title: '9. Dashboard do Lucas',
      role: 'Lucas',
      desc: 'Vendas no dia, lucro líquido real, produto mais vendido por categoria e dia que mais atrai cliente.',
    },
    {
      id: 'ADMIN_USERS',
      title: '10. Criar/Deletar Usuários',
      role: 'Lucas',
      desc: 'Painel onde o Lucas cria, gerencia e deleta acessos da Cozinha e Balcão.',
    },
    {
      id: 'ADMIN_PRODUCTS',
      title: '11. Adicionar/Alterar Produto',
      role: 'Lucas',
      desc: 'Tela onde o Lucas cria, altera preços, fotos, insumos e margem de lucro de cada produto.',
    },
  ];

  return (
    <aside aria-label="Painel de Demonstração" className="fixed bottom-3 right-3 z-50 max-w-sm sm:max-w-md">
      {/* Collapsed Pill */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-[#121215]/95 hover:bg-zinc-800 text-zinc-200 border border-amber-500/40 shadow-2xl backdrop-blur-md text-xs font-bold transition duration-200 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Fluxo Da Praça Burger</span>
          <ChevronUp className="w-3.5 h-3.5 text-zinc-400" />
        </button>
      ) : (
        /* Expanded Drawer */
        <div className="bg-[#121215]/95 border border-zinc-700 rounded-3xl p-5 shadow-2xl backdrop-blur-xl text-zinc-100 space-y-4 animate-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-black uppercase tracking-wider text-white">
                Guia de Demonstração dos Fluxos
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Clique em qualquer etapa abaixo para navegar e testar todas as telas do sistema:
          </p>

          <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
            {steps.map((step) => {
              const isActive = currentScreen === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    setCurrentScreen(step.id);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs transition cursor-pointer ${
                    isActive
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                      : 'bg-[#09090b]/60 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{step.title}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      step.role === 'Lucas' 
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                        : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {step.role}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-0.5 font-normal">
                    {step.desc}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
            <button
              onClick={resetAllData}
              className="text-[11px] font-bold text-red-400 hover:text-red-300 flex items-center space-x-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Resetar dados de teste</span>
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-300 cursor-pointer"
            >
              Fechar Guia
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
