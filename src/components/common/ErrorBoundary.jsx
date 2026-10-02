import React from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error(e);
    }
    window.location.reload();
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#09090b] text-zinc-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#121215] border border-red-500/30 rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                Ocorreu um imprevisto na exibição
              </h2>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                A aplicação encontrou uma inconsistência nos dados locais da sessão.
                Você pode recarregar a página ou restaurar os dados originais do cardápio e demonstração.
              </p>
            </div>

            {this.state.error?.message && (
              <div className="bg-[#09090b] p-3 rounded-xl border border-zinc-800 text-left">
                <p className="text-[11px] font-mono text-red-400 break-words">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="flex-1 py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition flex items-center justify-center space-x-1.5"
              >
                <Home className="w-4 h-4" />
                <span>Recarregar</span>
              </button>

              <button
                type="button"
                onClick={this.handleReset}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-black uppercase tracking-wider transition flex items-center justify-center space-x-1.5 shadow-lg shadow-amber-500/20"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restaurar Dados</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

