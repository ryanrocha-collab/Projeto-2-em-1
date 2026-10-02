import React, { createContext, useContext, useState, useEffect } from 'react';
import { soundEffects } from '../utils/audio';
import { MENU_ITEMS } from '../data/menuData';
import { INITIAL_USERS } from '../data/dashboardData';

export const AppContext = createContext();

const STORAGE_KEYS = {
  ORDERS: 'p2e1_orders_v2',
  AUTH: 'p2e1_auth_v2',
  ACTIVE_CODE: 'p2e1_active_order_code',
  CUSTOMER_CPF: 'p2e1_customer_cpf',
  CART: 'p2e1_cart_v2',
  PRODUCTS: 'p2e1_products_v2',
  USERS: 'p2e1_users_v2',
};

const safeStorage = {
  getItem: (key) => {
    try {
      if (typeof window === 'undefined') return null;
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.setItem(key, value);
    } catch {}
  },
  removeItem: (key) => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(key);
    } catch {}
  },
};

// Dados de pedidos iniciais de demonstração
const INITIAL_ORDERS = [
  {
    code: '1040',
    cpf: '123.456.789-00',
    table: 'Mesa 04',
    createdAt: new Date(Date.now() - 6 * 60000).toISOString(),
    status: 'PENDING', // PENDING (Feito / Novo), PREPARING (Iniciado), READY (Pronto p/ Retirada), DELIVERED (Entregue)
    paymentMethod: 'PIX',
    paymentStatus: 'PAID',
    items: [
      {
        id: 'combo-1',
        name: 'Combo Supreme Smash',
        price: 44.90,
        costPrice: 15.50,
        quantity: 1,
        meatTemp: 'Ao ponto',
        addons: ['Bacon em Tiras Extra (+R$ 5,00)'],
        notes: 'Sem picles por favor',
      },
      {
        id: 'drink-2',
        name: 'Refrigerante Lata 350ml',
        price: 7.00,
        costPrice: 2.80,
        quantity: 1,
        notes: 'Coca Zero com gelo e limão',
      },
    ],
    total: 56.90,
    startedAt: null,
    readyAt: null,
    deliveredAt: null,
  },
  {
    code: '1041',
    cpf: '987.654.321-99',
    table: 'Mesa 12',
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
    status: 'PREPARING',
    paymentMethod: 'CREDIT',
    paymentStatus: 'PAID',
    items: [
      {
        id: 'burger-2',
        name: 'Double Smash Melt',
        price: 33.90,
        costPrice: 12.50,
        quantity: 2,
        addons: ['Farofa de Bacon (+R$ 4,50)'],
        notes: '',
      },
      {
        id: 'side-1',
        name: 'Batata Rústica Cheddar & Bacon',
        price: 24.90,
        costPrice: 7.50,
        quantity: 1,
        notes: 'Cheddar bem quente',
      },
    ],
    total: 97.20,
    startedAt: new Date(Date.now() - 8 * 60000).toISOString(),
    readyAt: null,
    deliveredAt: null,
  },
  {
    code: '1042',
    cpf: '456.789.012-33',
    table: 'Balcão / Retirada',
    createdAt: new Date(Date.now() - 25 * 60000).toISOString(),
    status: 'READY',
    paymentMethod: 'CASH',
    paymentStatus: 'PENDING_CASH', // Balconista vai receber em espécie
    cashChangeFor: 100.00,
    items: [
      {
        id: 'combo-2',
        name: 'Combo Monster Bacon BBQ',
        price: 49.90,
        costPrice: 18.20,
        quantity: 1,
        meatTemp: 'Bem passado',
        addons: ['Ovo Frito Gema Mole (+R$ 3,50)'],
        notes: 'Caprichar no molho barbecue',
      },
      {
        id: 'drink-1',
        name: 'Milkshake de Nutella & Ninho',
        price: 21.90,
        costPrice: 7.00,
        quantity: 1,
        notes: '',
      },
    ],
    total: 75.30,
    startedAt: new Date(Date.now() - 20 * 60000).toISOString(),
    readyAt: new Date(Date.now() - 5 * 60000).toISOString(),
    deliveredAt: null,
  },
];

export const AppProvider = ({ children }) => {
  // Tela atual:
  // 'CLIENT_WELCOME', 'CLIENT_CATALOG', 'CLIENT_CART', 'CLIENT_PAYMENT', 'CLIENT_KDS',
  // 'KITCHEN_KDS', 'COUNTER', 'AUTH', 'LUCAS_DASHBOARD', 'ADMIN_USERS', 'ADMIN_PRODUCTS'
  const [currentScreen, setCurrentScreen] = useState('CLIENT_WELCOME');

  // CPF do cliente conectado na sessão
  const [customerCpf, setCustomerCpf] = useState(() => {
    return safeStorage.getItem(STORAGE_KEYS.CUSTOMER_CPF) || '';
  });

  // Carrinho de compras
  const [cart, setCart] = useState(() => {
    try {
      const saved = safeStorage.getItem(STORAGE_KEYS.CART);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Código do pedido ativo no KDS do cliente
  const [activeOrderCode, setActiveOrderCode] = useState(() => {
    return safeStorage.getItem(STORAGE_KEYS.ACTIVE_CODE) || '1040';
  });

  // Lista global de pedidos
  const [orders, setOrders] = useState(() => {
    try {
      const saved = safeStorage.getItem(STORAGE_KEYS.ORDERS);
      if (!saved) return INITIAL_ORDERS;
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Produtos do Restaurante (CRUD gerenciado pelo Lucas)
  const [products, setProducts] = useState(() => {
    try {
      const saved = safeStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (!saved) return MENU_ITEMS;
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : MENU_ITEMS;
    } catch {
      return MENU_ITEMS;
    }
  });

  // Usuários do Sistema (Lucas, Cozinha, Balcão - Criar/Deletar gerenciado pelo Lucas)
  const [users, setUsers] = useState(() => {
    try {
      const saved = safeStorage.getItem(STORAGE_KEYS.USERS);
      if (!saved) return INITIAL_USERS;
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  // Usuário autenticado para telas da equipe (Admin, Cozinha, Balconista)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = safeStorage.getItem(STORAGE_KEYS.AUTH);
      if (!saved) return null;
      return JSON.parse(saved);
    } catch {
      return null;
    }
  });

  // Salvar no safeStorage e sincronizar entre abas
  useEffect(() => {
    safeStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    safeStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    safeStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    safeStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (customerCpf) {
      safeStorage.setItem(STORAGE_KEYS.CUSTOMER_CPF, customerCpf);
    } else {
      safeStorage.removeItem(STORAGE_KEYS.CUSTOMER_CPF);
    }
  }, [customerCpf]);

  useEffect(() => {
    if (activeOrderCode) {
      safeStorage.setItem(STORAGE_KEYS.ACTIVE_CODE, activeOrderCode);
    }
  }, [activeOrderCode]);

  useEffect(() => {
    if (currentUser) {
      safeStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(currentUser));
    } else {
      safeStorage.removeItem(STORAGE_KEYS.AUTH);
    }
  }, [currentUser]);

  // Listener para sincronização automática entre abas abertas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEYS.ORDERS && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setOrders(parsed);
        } catch {}
      }
      if (e.key === STORAGE_KEYS.PRODUCTS && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setProducts(parsed);
        } catch {}
      }
      if (e.key === STORAGE_KEYS.USERS && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setUsers(parsed);
        } catch {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Funções do Carrinho
  const addToCart = (item) => {
    setCart((prev) => {
      const itemKey = `${item.id}-${item.meatTemp || ''}-${(item.addons || []).sort().join(',')}-${item.notes || ''}`;
      const existingIndex = prev.findIndex((i) => i.itemKey === itemKey);

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity || 1;
        return updated;
      }
      return [...prev, { ...item, itemKey, cartItemId: Date.now() + Math.random().toString() }];
    });
  };

  const updateCartQuantity = (cartItemId, delta) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => (Array.isArray(prev) ? prev.filter((i) => i.cartItemId !== cartItemId) : []));
  };

  const clearCart = () => {
    setCart([]);
  };

  const safeCart = Array.isArray(cart) ? cart : [];
  const safeOrders = Array.isArray(orders) ? orders : INITIAL_ORDERS;

  const cartTotal = safeCart.reduce((sum, item) => sum + (Number(item?.price) || 0) * (Number(item?.quantity) || 1), 0);
  const cartItemCount = safeCart.reduce((sum, item) => sum + (Number(item?.quantity) || 1), 0);

  // Criar novo pedido (usado no autoatendimento do cliente e no balcão)
  const createOrder = ({
    paymentMethod = 'PIX',
    cashChangeFor = null,
    notes = '',
    customItems = null,
    customerIdentifier = null,
    origin = 'Mesa 08 (QR Code)',
  }) => {
    // Gerar código único de 4 dígitos sequencial
    const existingNums = safeOrders
      .map((o) => parseInt(String(o?.code || '').replace(/\D/g, ''), 10))
      .filter((n) => !isNaN(n));
    const nextNum = existingNums.length > 0 ? Math.max(...existingNums) + 1 : 1043;
    const newCode = String(nextNum);

    const isCash = paymentMethod === 'CASH';

    const orderItems = customItems || cart.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      costPrice: item.costPrice || (Number(item.price) * 0.35),
      quantity: item.quantity,
      meatTemp: item.meatTemp,
      addons: item.addons || [],
      notes: item.notes || '',
    }));

    const computedTotal = customItems
      ? orderItems.reduce((acc, it) => acc + (Number(it.price) || 0) * (Number(it.quantity) || 1), 0)
      : cartTotal;

    const newOrder = {
      code: newCode,
      cpf: customerIdentifier || customerCpf || 'Não informado',
      table: origin || 'Mesa 08 (QR Code)',
      createdAt: new Date().toISOString(),
      status: 'PENDING', // Vai direto para lista dos FEITOS na Cozinha
      paymentMethod,
      paymentStatus: isCash ? 'PENDING_CASH' : 'PAID',
      cashChangeFor: isCash ? parseFloat(cashChangeFor || 0) : null,
      generalNotes: notes,
      items: orderItems,
      total: computedTotal,
      startedAt: null,
      readyAt: null,
      deliveredAt: null,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrderCode(newCode);

    if (!customItems) {
      clearCart();
    }

    soundEffects.playNewOrder();
    return newOrder;
  };

  // Transições de status da Cozinha
  const startOrderInKitchen = (orderCode) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.code === orderCode) {
          return {
            ...order,
            status: 'PREPARING',
            startedAt: new Date().toISOString(),
          };
        }
        return order;
      })
    );
  };

  const finishOrderInKitchen = (orderCode) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.code === orderCode) {
          return {
            ...order,
            status: 'READY',
            readyAt: new Date().toISOString(),
          };
        }
        return order;
      })
    );
    soundEffects.playOrderReady();
  };

  // Transição do Balcão
  const deliverOrder = (orderCode, cashReceived = null) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.code === orderCode) {
          return {
            ...order,
            status: 'DELIVERED',
            paymentStatus: 'PAID',
            deliveredAt: new Date().toISOString(),
            cashReceived: cashReceived !== null ? parseFloat(cashReceived) : order.cashReceived,
          };
        }
        return order;
      })
    );
  };

  // Gestão de Produtos (Lucas Adicionar / Alterar / Criar / Deletar)
  const addProduct = (productData) => {
    const newProduct = {
      id: `prod-${Date.now()}`,
      active: true,
      options: { addons: [] },
      ...productData,
      price: Number(productData.price) || 0,
      costPrice: Number(productData.costPrice) || 0,
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (productId, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            ...updatedFields,
            price: updatedFields.price !== undefined ? Number(updatedFields.price) : p.price,
            costPrice: updatedFields.costPrice !== undefined ? Number(updatedFields.costPrice) : p.costPrice,
          };
        }
        return p;
      })
    );
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const toggleProductActive = (productId) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, active: p.active === false ? true : false } : p))
    );
  };

  // Gestão de Usuários (Lucas Criar / Deletar Cozinha e Balcão)
  const addUser = (userData) => {
    const newUser = {
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
      active: true,
      ...userData,
    };
    setUsers((prev) => [...prev, newUser]);
    return newUser;
  };

  const updateUser = (userId, updatedFields) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, ...updatedFields } : u))
    );
  };

  const deleteUser = (userId) => {
    // Proteger conta do Lucas contra deleção acidental
    if (userId === 'user-lucas') {
      alert('A conta principal do Lucas (Administrador Geral) não pode ser excluída.');
      return false;
    }
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    return true;
  };

  const toggleUserActive = (userId) => {
    if (userId === 'user-lucas') return;
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, active: !u.active } : u))
    );
  };

  // Autenticação da equipe (Lucas, Cozinha, Balcão)
  const loginUser = (email, password, requestedRole) => {
    // Buscar se o usuário existe na lista de usuários cadastrados
    const matchedUser = users.find(
      (u) => u.email.toLowerCase() === (email || '').toLowerCase().trim()
    );

    const role = requestedRole || (matchedUser ? matchedUser.role : 'ADMIN');
    const userObj = matchedUser || {
      email,
      role,
      name:
        role === 'ADMIN'
          ? 'Lucas Rocha (Dono)'
          : role === 'KITCHEN'
          ? 'Equipe da Cozinha'
          : 'Balconista Caixa',
    };

    setCurrentUser(userObj);

    // Redirecionamento específico para cada perfil
    if (role === 'ADMIN') {
      setCurrentScreen('LUCAS_DASHBOARD');
    } else if (role === 'KITCHEN') {
      setCurrentScreen('KITCHEN_KDS');
    } else if (role === 'COUNTER') {
      setCurrentScreen('COUNTER');
    } else {
      setCurrentScreen('LUCAS_DASHBOARD');
    }
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setCurrentScreen('AUTH');
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        customerCpf,
        setCustomerCpf,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartItemCount,
        orders,
        createOrder,
        activeOrderCode,
        setActiveOrderCode,
        startOrderInKitchen,
        finishOrderInKitchen,
        deliverOrder,
        // Produtos
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductActive,
        // Usuários
        users,
        addUser,
        updateUser,
        deleteUser,
        toggleUserActive,
        // Auth
        currentUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
