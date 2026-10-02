// Dados lógicos e de demonstração para o Dashboard do Lucas e Gestão de Usuários
// Informações estruturadas para calcular Vendas no Dia, Lucro do Lucas,
// Produtos Mais Vendidos por Categoria e Dia com Maior Movimento de Clientes.

export const INITIAL_USERS = [
  {
    id: 'user-lucas',
    name: 'Lucas Rocha',
    email: 'lucas@dapraca.com',
    role: 'ADMIN',
    roleLabel: 'Administrador & Dono',
    shift: 'Turno Geral / Gestão',
    password: '123',
    createdAt: '2026-01-15T10:00:00.000Z',
    active: true,
    avatarColor: 'from-amber-500 to-orange-500',
  },
  {
    id: 'user-cozinha-1',
    name: 'Marcos Silva',
    email: 'cozinha@dapraca.com',
    role: 'KITCHEN',
    roleLabel: 'Chefe de Cozinha (Chapa)',
    shift: 'Turno da Tarde/Noite (16h às 00h)',
    password: '123',
    createdAt: '2026-02-01T14:30:00.000Z',
    active: true,
    avatarColor: 'from-orange-500 to-red-500',
  },
  {
    id: 'user-cozinha-2',
    name: 'Carlos Eduardo',
    email: 'cozinha2@dapraca.com',
    role: 'KITCHEN',
    roleLabel: 'Auxiliar de Cozinha & Frituras',
    shift: 'Turno da Noite (18h às 01h)',
    password: '123',
    createdAt: '2026-02-10T16:00:00.000Z',
    active: true,
    avatarColor: 'from-orange-600 to-amber-600',
  },
  {
    id: 'user-balcao-1',
    name: 'Julia Martins',
    email: 'balcao@dapraca.com',
    role: 'COUNTER',
    roleLabel: 'Balconista & Operadora de Caixa',
    shift: 'Turno Noite (17h às 23h30)',
    password: '123',
    createdAt: '2026-02-15T17:00:00.000Z',
    active: true,
    avatarColor: 'from-amber-400 to-yellow-500',
  },
  {
    id: 'user-balcao-2',
    name: 'Fernanda Lima',
    email: 'balcao2@dapraca.com',
    role: 'COUNTER',
    roleLabel: 'Atendente de Balcão & Retirada',
    shift: 'Turno Tarde (11h às 17h)',
    password: '123',
    createdAt: '2026-03-01T12:00:00.000Z',
    active: true,
    avatarColor: 'from-yellow-500 to-amber-500',
  },
];

// Dados analíticos da semana (Segunda a Domingo)
// Mostra clientes atendidos, faturamento, lucro e o produto mais vendido em cada dia
export const WEEKLY_ANALYTICS = [
  {
    dayKey: 'seg',
    dayName: 'Segunda-feira',
    shortDay: 'Seg',
    clientsCount: 38,
    grossSales: 2480.00,
    cost: 868.00,
    profit: 1612.00,
    profitMargin: 65.0,
    avgTicket: 65.26,
    topProduct: {
      name: 'Classic Cheeseburger',
      category: 'Hambúrgueres',
      qtySold: 26,
      revenue: 777.40,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
    },
  },
  {
    dayKey: 'ter',
    dayName: 'Terça-feira',
    shortDay: 'Ter',
    clientsCount: 46,
    grossSales: 3120.00,
    cost: 1092.00,
    profit: 2028.00,
    profitMargin: 65.0,
    avgTicket: 67.82,
    topProduct: {
      name: 'Combo Supreme Smash',
      category: 'Combos',
      qtySold: 34,
      revenue: 1526.60,
      image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=400&q=80',
    },
  },
  {
    dayKey: 'qua',
    dayName: 'Quarta-feira',
    shortDay: 'Qua',
    clientsCount: 62,
    grossSales: 4380.00,
    cost: 1533.00,
    profit: 2847.00,
    profitMargin: 65.0,
    avgTicket: 70.64,
    topProduct: {
      name: 'Double Smash Melt',
      category: 'Hambúrgueres',
      qtySold: 42,
      revenue: 1423.80,
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80',
    },
  },
  {
    dayKey: 'qui',
    dayName: 'Quinta-feira',
    shortDay: 'Qui',
    clientsCount: 88,
    grossSales: 6150.00,
    cost: 2152.50,
    profit: 3997.50,
    profitMargin: 65.0,
    avgTicket: 69.88,
    topProduct: {
      name: 'Combo Monster Bacon BBQ',
      category: 'Combos',
      qtySold: 58,
      revenue: 2894.20,
      image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80',
    },
  },
  {
    dayKey: 'sex',
    dayName: 'Sexta-feira',
    shortDay: 'Sex',
    isChampion: true, // 🏆 DIA QUE MAIS ATRAI CLIENTE
    clientsCount: 152,
    grossSales: 10450.00,
    cost: 3657.50,
    profit: 6792.50,
    profitMargin: 65.0,
    avgTicket: 68.75,
    highlight: 'Dia com maior pico de faturamento e fluxo de pessoas no restaurante',
    topProduct: {
      name: 'Combo Supreme Smash',
      category: 'Combos',
      qtySold: 98,
      revenue: 4400.20,
      image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=400&q=80',
      reason: 'Preferido para pedidos de mesas com amigos e chopps artesanais na sexta à noite.',
    },
  },
  {
    dayKey: 'sab',
    dayName: 'Sábado',
    shortDay: 'Sáb',
    clientsCount: 144,
    grossSales: 9890.00,
    cost: 3461.50,
    profit: 6428.50,
    profitMargin: 65.0,
    avgTicket: 68.68,
    topProduct: {
      name: 'Double Smash Melt',
      category: 'Hambúrgueres',
      qtySold: 84,
      revenue: 2847.60,
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80',
    },
  },
  {
    dayKey: 'dom',
    dayName: 'Domingo',
    shortDay: 'Dom',
    clientsCount: 116,
    grossSales: 7920.00,
    cost: 2772.00,
    profit: 5148.00,
    profitMargin: 65.0,
    avgTicket: 68.27,
    topProduct: {
      name: 'Batata Rústica Cheddar & Bacon',
      category: 'Entradas & Porções',
      qtySold: 76,
      revenue: 1892.40,
      image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=400&q=80',
    },
  },
];

// O dia campeão identificado
export const CHAMPION_DAY = WEEKLY_ANALYTICS.find((d) => d.isChampion) || WEEKLY_ANALYTICS[4];

// Produtos mais vendidos por categoria com detalhes de lucro do Lucas
export const TOP_PRODUCTS_BY_CATEGORY = {
  combos: [
    {
      id: 'combo-1',
      name: 'Combo Supreme Smash',
      categoryName: 'Combos Especiais',
      price: 44.90,
      costPrice: 15.50,
      profitPerUnit: 29.40,
      profitMargin: 65.4,
      unitsSoldToday: 44,
      unitsSoldWeek: 342,
      revenueToday: 1975.60,
      profitToday: 1293.60,
      image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=400&q=80',
      rank: 1,
      badge: 'Campeão Geral',
    },
    {
      id: 'combo-2',
      name: 'Combo Monster Bacon BBQ',
      categoryName: 'Combos Especiais',
      price: 49.90,
      costPrice: 18.20,
      profitPerUnit: 31.70,
      profitMargin: 63.5,
      unitsSoldToday: 31,
      unitsSoldWeek: 268,
      revenueToday: 1546.90,
      profitToday: 982.70,
      image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80',
      rank: 2,
    },
  ],
  burgers: [
    {
      id: 'burger-2',
      name: 'Double Smash Melt',
      categoryName: 'Hambúrgueres',
      price: 33.90,
      costPrice: 12.50,
      profitPerUnit: 21.40,
      profitMargin: 63.1,
      unitsSoldToday: 48,
      unitsSoldWeek: 310,
      revenueToday: 1627.20,
      profitToday: 1027.20,
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80',
      rank: 1,
      badge: 'Mais Pedido',
    },
    {
      id: 'burger-1',
      name: 'Classic Cheeseburger',
      categoryName: 'Hambúrgueres',
      price: 29.90,
      costPrice: 10.80,
      profitPerUnit: 19.10,
      profitMargin: 63.8,
      unitsSoldToday: 36,
      unitsSoldWeek: 245,
      revenueToday: 1076.40,
      profitToday: 687.60,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
      rank: 2,
    },
    {
      id: 'burger-3',
      name: 'Gorgonzola & Crispy Onion',
      categoryName: 'Hambúrgueres',
      price: 36.90,
      costPrice: 13.90,
      profitPerUnit: 23.00,
      profitMargin: 62.3,
      unitsSoldToday: 24,
      unitsSoldWeek: 168,
      revenueToday: 885.60,
      profitToday: 552.00,
      image: 'https://images.unsplash.com/photo-1583032015879-c63bf1e028b0?auto=format&fit=crop&w=400&q=80',
      rank: 3,
    },
    {
      id: 'burger-4',
      name: 'Veggie Truffle Burger',
      categoryName: 'Hambúrgueres',
      price: 34.90,
      costPrice: 12.00,
      profitPerUnit: 22.90,
      profitMargin: 65.6,
      unitsSoldToday: 14,
      unitsSoldWeek: 92,
      revenueToday: 488.60,
      profitToday: 320.60,
      image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=400&q=80',
      rank: 4,
    },
  ],
  sides: [
    {
      id: 'side-1',
      name: 'Batata Rústica Cheddar & Bacon',
      categoryName: 'Entradas & Porções',
      price: 24.90,
      costPrice: 7.50,
      profitPerUnit: 17.40,
      profitMargin: 69.8,
      unitsSoldToday: 54,
      unitsSoldWeek: 388,
      revenueToday: 1344.60,
      profitToday: 939.60,
      image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=400&q=80',
      rank: 1,
      badge: 'Campeã de Vendas',
    },
    {
      id: 'side-3',
      name: 'Coxinha de Costela Defumada',
      categoryName: 'Entradas & Porções',
      price: 27.90,
      costPrice: 9.80,
      profitPerUnit: 18.10,
      profitMargin: 64.8,
      unitsSoldToday: 29,
      unitsSoldWeek: 215,
      revenueToday: 809.10,
      profitToday: 524.90,
      image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=400&q=80',
      rank: 2,
    },
    {
      id: 'side-2',
      name: 'Onion Rings Douradas',
      categoryName: 'Entradas & Porções',
      price: 21.90,
      costPrice: 6.20,
      profitPerUnit: 15.70,
      profitMargin: 71.6,
      unitsSoldToday: 22,
      unitsSoldWeek: 160,
      revenueToday: 481.80,
      profitToday: 345.40,
      image: 'https://images.unsplash.com/photo-1639024471287-032f667059ec?auto=format&fit=crop&w=400&q=80',
      rank: 3,
    },
  ],
  drinks: [
    {
      id: 'drink-2',
      name: 'Refrigerante Lata 350ml',
      categoryName: 'Bebidas & Shakes',
      price: 7.00,
      costPrice: 2.80,
      profitPerUnit: 4.20,
      profitMargin: 60.0,
      unitsSoldToday: 68,
      unitsSoldWeek: 510,
      revenueToday: 476.00,
      profitToday: 285.60,
      image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80',
      rank: 1,
      badge: 'Maior Volume',
    },
    {
      id: 'drink-1',
      name: 'Milkshake de Nutella & Ninho',
      categoryName: 'Bebidas & Shakes',
      price: 21.90,
      costPrice: 7.00,
      profitPerUnit: 14.90,
      profitMargin: 68.0,
      unitsSoldToday: 35,
      unitsSoldWeek: 260,
      revenueToday: 766.50,
      profitToday: 521.50,
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80',
      rank: 2,
      badge: 'Maior Lucro em Bebidas',
    },
    {
      id: 'drink-4',
      name: 'Cerveja Artesanal IPA 500ml',
      categoryName: 'Bebidas & Shakes',
      price: 18.90,
      costPrice: 8.50,
      profitPerUnit: 10.40,
      profitMargin: 55.0,
      unitsSoldToday: 28,
      unitsSoldWeek: 198,
      revenueToday: 529.20,
      profitToday: 291.20,
      image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=400&q=80',
      rank: 3,
    },
    {
      id: 'drink-3',
      name: 'Suco Natural de Laranja 500ml',
      categoryName: 'Bebidas & Shakes',
      price: 11.00,
      costPrice: 3.50,
      profitPerUnit: 7.50,
      profitMargin: 68.1,
      unitsSoldToday: 21,
      unitsSoldWeek: 145,
      revenueToday: 231.00,
      profitToday: 157.50,
      image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80',
      rank: 4,
    },
  ],
  desserts: [
    {
      id: 'dessert-1',
      name: 'Brownie com Gelato & Calda Quente',
      categoryName: 'Sobremesas',
      price: 22.90,
      costPrice: 7.90,
      profitPerUnit: 15.00,
      profitMargin: 65.5,
      unitsSoldToday: 25,
      unitsSoldWeek: 192,
      revenueToday: 572.50,
      profitToday: 375.00,
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80',
      rank: 1,
      badge: 'Sobremesa Favorita',
    },
    {
      id: 'dessert-2',
      name: 'Churros Espanhóis com Doce de Leite',
      categoryName: 'Sobremesas',
      price: 19.90,
      costPrice: 6.00,
      profitPerUnit: 13.90,
      profitMargin: 69.8,
      unitsSoldToday: 19,
      unitsSoldWeek: 148,
      revenueToday: 378.10,
      profitToday: 264.10,
      image: 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?auto=format&fit=crop&w=400&q=80',
      rank: 2,
    },
  ],
};

// Função para calcular os totais dinâmicos de hoje somando pedidos em tempo real da sessão
export const calculateTodayMetrics = (orders = [], products = []) => {
  // Base do turno de hoje com dados de abertura
  const BASE_SHIFT = {
    ordersCount: 48,
    grossSales: 3418.50,
    cost: 1196.40,
    profit: 2222.10,
  };

  // Mapear custo dos produtos para lookup rápido
  const costMap = new Map();
  products.forEach((p) => {
    costMap.set(p.id, Number(p.costPrice) || (Number(p.price) * 0.35));
  });

  // Somar pedidos realizados em tempo real no app
  let sessionSales = 0;
  let sessionCost = 0;
  let sessionOrdersCount = 0;

  orders.forEach((order) => {
    // Considerar pedidos não cancelados
    if (order && order.status !== 'CANCELLED') {
      const orderTotal = Number(order.total) || 0;
      sessionSales += orderTotal;
      sessionOrdersCount += 1;

      // Calcular custo estimado dos itens do pedido
      let orderCost = 0;
      if (Array.isArray(order.items)) {
        order.items.forEach((item) => {
          const unitCost = costMap.get(item.id) || (Number(item.price) * 0.35);
          const qty = Number(item.quantity) || 1;
          orderCost += unitCost * qty;
        });
      } else {
        orderCost = orderTotal * 0.35;
      }
      sessionCost += orderCost;
    }
  });

  const totalSalesToday = BASE_SHIFT.grossSales + sessionSales;
  const totalCostToday = BASE_SHIFT.cost + sessionCost;
  const totalProfitToday = totalSalesToday - totalCostToday;
  const totalOrdersToday = BASE_SHIFT.ordersCount + sessionOrdersCount;
  const avgTicket = totalOrdersToday > 0 ? totalSalesToday / totalOrdersToday : 0;
  const profitMarginPercent = totalSalesToday > 0 ? (totalProfitToday / totalSalesToday) * 100 : 65.0;

  return {
    totalSalesToday,
    totalCostToday,
    totalProfitToday,
    profitMarginPercent,
    totalOrdersToday,
    avgTicket,
    sessionOrdersCount,
    sessionSales,
  };
};
