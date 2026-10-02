// Cardápio do Restaurante / Hamburgueria com fotos em alta resolução e dados completos
// Inclui Preço de Venda e Preço de Custo para cálculo do lucro do Lucas

export const CATEGORIES = [
  { id: 'all', name: 'Todos os Itens', icon: 'Sparkles' },
  { id: 'combos', name: 'Combos Especiais', icon: 'Flame' },
  { id: 'burgers', name: 'Hambúrgueres', icon: 'Beef' },
  { id: 'sides', name: 'Entradas & Porções', icon: 'Utensils' },
  { id: 'drinks', name: 'Bebidas & Shakes', icon: 'CupSoda' },
  { id: 'desserts', name: 'Sobremesas', icon: 'IceCream' },
];

export const SAMPLE_PRODUCT_PHOTOS = [
  {
    name: 'Burger Smash Clássico',
    url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    category: 'burgers',
  },
  {
    name: 'Double Burger com Queijo',
    url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    category: 'burgers',
  },
  {
    name: 'Burger Artesanal na Brasa',
    url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    category: 'burgers',
  },
  {
    name: 'Combo Completo com Fritas',
    url: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80',
    category: 'combos',
  },
  {
    name: 'Batata Rústica com Cheddar',
    url: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    category: 'sides',
  },
  {
    name: 'Onion Rings Crocantes',
    url: 'https://images.unsplash.com/photo-1639024471287-032f667059ec?auto=format&fit=crop&w=800&q=80',
    category: 'sides',
  },
  {
    name: 'Milkshake Cremoso',
    url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    category: 'drinks',
  },
  {
    name: 'Refrigerante Lata Gelado',
    url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    category: 'drinks',
  },
  {
    name: 'Suco Natural Geladinho',
    url: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80',
    category: 'drinks',
  },
  {
    name: 'Brownie com Sorvete',
    url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    category: 'desserts',
  },
  {
    name: 'Churros Espanhóis',
    url: 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?auto=format&fit=crop&w=800&q=80',
    category: 'desserts',
  },
];

export const MENU_ITEMS = [
  // Combos
  {
    id: 'combo-1',
    categoryId: 'combos',
    name: 'Combo Supreme Smash',
    description: 'Burger Smash Duplo com queijo cheddar inglês, batata rústica crocante e refrigerante gelado de 350ml.',
    price: 44.90,
    costPrice: 15.50,
    badge: 'Mais Vendido',
    active: true,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80',
    options: {
      meatTemp: true,
      addons: [
        { id: 'add-bacon', name: 'Bacon em Tiras Extra', price: 5.00 },
        { id: 'add-cheddar', name: 'Cheddar Cremoso Extra', price: 4.50 },
        { id: 'add-onion', name: 'Onion Rings no Burger', price: 4.00 },
      ],
    },
  },
  {
    id: 'combo-2',
    categoryId: 'combos',
    name: 'Combo Monster Bacon BBQ',
    description: 'Burger alto 180g na brasa, bacon crocante, barbecue artesanal, cebola caramelizada, porção de batata e refri.',
    price: 49.90,
    costPrice: 18.20,
    badge: 'Destaque',
    active: true,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    options: {
      meatTemp: true,
      addons: [
        { id: 'add-egg', name: 'Ovo Frito Gema Mole', price: 3.50 },
        { id: 'add-bacon', name: 'Bacon Extra', price: 5.00 },
        { id: 'add-jalapeno', name: 'Picles de Jalapeño', price: 3.00 },
      ],
    },
  },

  // Hambúrgueres
  {
    id: 'burger-1',
    categoryId: 'burgers',
    name: 'Classic Cheeseburger',
    description: 'Pão brioche tostado na manteiga, blend 160g bovino grelhado no fogo, fatias generosas de cheddar derretido e maionese da casa.',
    price: 29.90,
    costPrice: 10.80,
    badge: 'Clássico',
    active: true,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    options: {
      meatTemp: true,
      addons: [
        { id: 'add-bacon', name: 'Bacon em Fatias', price: 5.00 },
        { id: 'add-cheese', name: 'Queijo Extra', price: 4.00 },
        { id: 'add-salad', name: 'Salada Fresca (Alface + Tomate)', price: 2.50 },
      ],
    },
  },
  {
    id: 'burger-2',
    categoryId: 'burgers',
    name: 'Double Smash Melt',
    description: 'Dois smash burgers de 90g com crostinha crocante, dobro de cheddar melt cremoso e picles artesanal crocante.',
    price: 33.90,
    costPrice: 12.50,
    badge: 'Crocante',
    active: true,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    options: {
      meatTemp: false,
      addons: [
        { id: 'add-bacon', name: 'Farofa de Bacon', price: 4.50 },
        { id: 'add-mayo', name: 'Maionese Trufada', price: 4.00 },
      ],
    },
  },
  {
    id: 'burger-3',
    categoryId: 'burgers',
    name: 'Gorgonzola & Crispy Onion',
    description: 'Blend nobre 180g, creme aveludado de gorgonzola italiano, cebola crispy super crocante e geleia de pimenta suave.',
    price: 36.90,
    costPrice: 13.90,
    badge: 'Chef Especial',
    active: true,
    image: 'https://images.unsplash.com/photo-1583032015879-c63bf1e028b0?auto=format&fit=crop&w=800&q=80',
    options: {
      meatTemp: true,
      addons: [
        { id: 'add-bacon', name: 'Bacon Tostado', price: 5.00 },
        { id: 'add-jam', name: 'Geleia de Bacon Extra', price: 4.50 },
      ],
    },
  },
  {
    id: 'burger-4',
    categoryId: 'burgers',
    name: 'Veggie Truffle Burger',
    description: 'Burger de grão-de-bico com cogumelos salteados, queijo provolone tostado, rúcula baby e aioli trufado.',
    price: 34.90,
    costPrice: 12.00,
    badge: 'Vegetariano',
    active: true,
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80',
    options: {
      meatTemp: false,
      addons: [
        { id: 'add-mushrooms', name: 'Mix de Cogumelos Extra', price: 6.00 },
        { id: 'add-cheese', name: 'Queijo Vegano', price: 4.00 },
      ],
    },
  },

  // Entradas & Porções
  {
    id: 'side-1',
    categoryId: 'sides',
    name: 'Batata Rústica Cheddar & Bacon',
    description: 'Batatas rústicas com casca temperadas com páprica defumada, cobertas com fondue de cheddar e crispy de bacon.',
    price: 24.90,
    costPrice: 7.50,
    badge: 'Favorito',
    active: true,
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    options: {
      addons: [
        { id: 'add-sauce-bbq', name: 'Molho Barbecue à Parte', price: 3.00 },
        { id: 'add-sauce-garlic', name: 'Maionese de Alho Especial', price: 3.50 },
      ],
    },
  },
  {
    id: 'side-2',
    categoryId: 'sides',
    name: 'Onion Rings Douradas',
    description: 'Anéis de cebola gigantes empanados em farinha panko temperada, super sequinhas. Acompanha molho ranch.',
    price: 21.90,
    costPrice: 6.20,
    active: true,
    image: 'https://images.unsplash.com/photo-1639024471287-032f667059ec?auto=format&fit=crop&w=800&q=80',
    options: {
      addons: [
        { id: 'add-ranch', name: 'Molho Ranch Extra', price: 3.00 },
      ],
    },
  },
  {
    id: 'side-3',
    categoryId: 'sides',
    name: 'Coxinha de Costela Defumada',
    description: 'Porção com 6 unidades de mini coxinhas sem massa, recheadas com costela desfiada cozida por 12 horas e defumada.',
    price: 27.90,
    costPrice: 9.80,
    badge: 'Artesanal',
    active: true,
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
    options: {
      addons: [
        { id: 'add-pepper-jam', name: 'Geleia de Pimenta Biquinho', price: 3.50 },
      ],
    },
  },

  // Bebidas & Shakes
  {
    id: 'drink-1',
    categoryId: 'drinks',
    name: 'Milkshake de Nutella & Ninho',
    description: 'Sorvete artesanal de baunilha batido com muita Nutella e finalizado com leite ninho polvilhado e chantilly (400ml).',
    price: 21.90,
    costPrice: 7.00,
    badge: 'Top Sobremesa',
    active: true,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'drink-2',
    categoryId: 'drinks',
    name: 'Refrigerante Lata 350ml',
    description: 'Coca-Cola Tradicional, Coca Zero, Guaraná Antarctica ou Fanta Laranja (geladinho).',
    price: 7.00,
    costPrice: 2.80,
    active: true,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'drink-3',
    categoryId: 'drinks',
    name: 'Suco Natural de Laranja 500ml',
    description: 'Suco 100% natural espremido na hora, super refrescante e sem conservantes.',
    price: 11.00,
    costPrice: 3.50,
    active: true,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'drink-4',
    categoryId: 'drinks',
    name: 'Cerveja Artesanal IPA 500ml',
    description: 'Cerveja artesanal estilo IPA com lúpulos americanos, amargor equilibrado e notas cítricas.',
    price: 18.90,
    costPrice: 8.50,
    badge: '+18 Anos',
    active: true,
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=800&q=80',
  },

  // Sobremesas
  {
    id: 'dessert-1',
    categoryId: 'desserts',
    name: 'Brownie com Gelato & Calda Quente',
    description: 'Brownie de chocolate belga quentinho com nozes, acompanhado de uma bola de sorvete de baunilha e calda fudge de chocolate.',
    price: 22.90,
    costPrice: 7.90,
    badge: 'Irresistível',
    active: true,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dessert-2',
    categoryId: 'desserts',
    name: 'Churros Espanhóis com Doce de Leite',
    description: '4 unidades de churros crocantes passados na canela e açúcar, servidos com pote de doce de leite argentino Viçosa.',
    price: 19.90,
    costPrice: 6.00,
    active: true,
    image: 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?auto=format&fit=crop&w=800&q=80',
  },
];
