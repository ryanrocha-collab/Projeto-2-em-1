import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { WelcomeScreen } from './components/client/WelcomeScreen';
import { CatalogScreen } from './components/client/CatalogScreen';
import { CartScreen } from './components/client/CartScreen';
import { PaymentScreen } from './components/client/PaymentScreen';
import { CustomerKdsScreen } from './components/client/CustomerKdsScreen';
import { KitchenKdsScreen } from './components/kitchen/KitchenKdsScreen';
import { CounterScreen } from './components/counter/CounterScreen';
import { AuthScreen } from './components/auth/AuthScreen';
import { LucasDashboardScreen } from './components/admin/LucasDashboardScreen';
import { UsersManagerScreen } from './components/admin/UsersManagerScreen';
import { ProductsManagerScreen } from './components/admin/ProductsManagerScreen';
import { DemoGuideBar } from './components/common/DemoGuideBar';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { BackgroundPattern } from './components/common/BackgroundPattern';

function MainLayout() {
  const { currentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'CLIENT_WELCOME':
        return <WelcomeScreen />;
      case 'CLIENT_CATALOG':
        return <CatalogScreen />;
      case 'CLIENT_CART':
        return <CartScreen />;
      case 'CLIENT_PAYMENT':
        return <PaymentScreen />;
      case 'CLIENT_KDS':
        return <CustomerKdsScreen />;
      case 'KITCHEN_KDS':
        return <KitchenKdsScreen />;
      case 'COUNTER':
        return <CounterScreen />;
      case 'AUTH':
        return <AuthScreen />;
      case 'LUCAS_DASHBOARD':
        return <LucasDashboardScreen />;
      case 'ADMIN_USERS':
        return <UsersManagerScreen />;
      case 'ADMIN_PRODUCTS':
        return <ProductsManagerScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className="min-h-screen text-zinc-100 flex flex-col selection:bg-amber-500 selection:text-black font-sans relative overflow-x-hidden">
      {/* Background com degrade preto fosco, textura de grao, reflexo de luz e mini hamburgueres espalhados */}
      <BackgroundPattern />

      {/* Conteudo da Aplicacao sobreposto */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 w-full">
          {renderScreen()}
        </main>
        <DemoGuideBar />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </ErrorBoundary>
  );
}
