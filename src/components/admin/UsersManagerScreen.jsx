import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  UserPlus, 
  Trash2, 
  ChefHat, 
  Store, 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  Clock, 
  Search, 
  CheckCircle2, 
  ArrowLeft,
  X
} from 'lucide-react';

export const UsersManagerScreen = () => {
  const { 
    users = [], 
    addUser, 
    deleteUser, 
    toggleUserActive, 
    setCurrentScreen 
  } = useApp();

  const [filterRole, setFilterRole] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Formulário de novo usuário
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('KITCHEN'); // 'KITCHEN' | 'COUNTER' | 'ADMIN'
  const [newPassword, setNewPassword] = useState('123456');
  const [newShift, setNewShift] = useState('Turno da Noite (17h às 23h30)');
  const [formError, setFormError] = useState('');

  // Contadores
  const kitchenCount = users.filter((u) => u.role === 'KITCHEN').length;
  const counterCount = users.filter((u) => u.role === 'COUNTER').length;
  const adminCount = users.filter((u) => u.role === 'ADMIN').length;

  // Filtragem de lista
  const filteredUsers = users.filter((user) => {
    const matchesRole = filterRole === 'ALL' || user.role === filterRole;
    const matchesSearch = 
      (user.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.shift || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) {
      setFormError('Por favor, informe o nome e o email do usuário.');
      return;
    }

    // Verificar se o email já existe
    if (users.some((u) => u.email.toLowerCase() === newEmail.trim().toLowerCase())) {
      setFormError('Já existe um usuário cadastrado com este e-mail.');
      return;
    }

    const roleLabel = 
      newRole === 'KITCHEN' ? 'Equipe de Cozinha' :
      newRole === 'COUNTER' ? 'Balconista & Atendimento' : 'Administrador';

    const avatarColor = 
      newRole === 'KITCHEN' ? 'from-orange-500 to-red-500' :
      newRole === 'COUNTER' ? 'from-amber-400 to-yellow-500' : 'from-amber-500 to-orange-500';

    addUser({
      name: newName.trim(),
      email: newEmail.trim(),
      role: newRole,
      roleLabel,
      password: newPassword || '123456',
      shift: newShift.trim() || 'Turno Geral',
      avatarColor,
    });

    setSuccessMessage(`Usuário "${newName}" adicionado com sucesso!`);
    setTimeout(() => setSuccessMessage(''), 4000);

    // Resetar formulário
    setNewName('');
    setNewEmail('');
    setNewPassword('123456');
    setNewShift('Turno da Noite (17h às 23h30)');
    setFormError('');
    setModalOpen(false);
  };

  const handleDeleteUser = (userId, userName) => {
    const success = deleteUser(userId);
    if (success) {
      setSuccessMessage(`Usuário "${userName}" removido da equipe.`);
      setTimeout(() => setSuccessMessage(''), 4000);
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-zinc-100 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8 pt-4">
      
      {/* Top Header com Voltar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <button
            onClick={() => setCurrentScreen('LUCAS_DASHBOARD')}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition mb-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Dashboard do Lucas</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center space-x-3">
            <span>Gerenciar Usuários da Equipe</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
              Lucas Rocha
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Crie, altere ou delete os acessos da Cozinha (Tablet KDS) e Balcão (Atendimento & Caixa).
          </p>
        </div>

        <button
          onClick={() => {
            setFormError('');
            setModalOpen(true);
          }}
          className="flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition active:scale-95 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Cadastrar Novo Usuário</span>
        </button>
      </div>

      {/* Alerta de Sucesso */}
      {successMessage && (
        <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-2xl p-4 flex items-center space-x-3 text-emerald-400 text-xs sm:text-sm animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span className="font-semibold">{successMessage}</span>
        </div>
      )}

      {/* Cards de Resumo da Equipe */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        
        <div className="bg-[#121215] border border-zinc-800 rounded-2xl p-4">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
            Total de Colaboradores
          </span>
          <span className="text-2xl font-black text-white mt-1 block">
            {users.length}
          </span>
          <span className="text-[10px] text-zinc-500">
            Cadastrados no sistema
          </span>
        </div>

        <div className="bg-[#121215] border border-zinc-800 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">
              Equipe Cozinha
            </span>
            <ChefHat className="w-4 h-4 text-orange-400" />
          </div>
          <span className="text-2xl font-black text-white mt-1 block">
            {kitchenCount}
          </span>
          <span className="text-[10px] text-zinc-500">
            Acessam o Tablet KDS
          </span>
        </div>

        <div className="bg-[#121215] border border-zinc-800 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              Equipe Balcão
            </span>
            <Store className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-2xl font-black text-white mt-1 block">
            {counterCount}
          </span>
          <span className="text-[10px] text-zinc-500">
            Balcão, Caixa e Pedidos
          </span>
        </div>

        <div className="bg-[#121215] border border-zinc-800 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
              Administradores
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-black text-white mt-1 block">
            {adminCount}
          </span>
          <span className="text-[10px] text-zinc-500">
            Acesso total ao sistema
          </span>
        </div>

      </div>

      {/* Barra de Filtros e Busca */}
      <div className="bg-[#121215] border border-zinc-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        
        {/* Filtro por Cargo */}
        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterRole('ALL')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              filterRole === 'ALL'
                ? 'bg-amber-500 text-zinc-950 font-black'
                : 'bg-[#09090b] text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            Todos ({users.length})
          </button>
          <button
            onClick={() => setFilterRole('KITCHEN')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center space-x-1.5 cursor-pointer ${
              filterRole === 'KITCHEN'
                ? 'bg-orange-500 text-zinc-950 font-black'
                : 'bg-[#09090b] text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span>Cozinha ({kitchenCount})</span>
          </button>
          <button
            onClick={() => setFilterRole('COUNTER')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center space-x-1.5 cursor-pointer ${
              filterRole === 'COUNTER'
                ? 'bg-amber-500 text-zinc-950 font-black'
                : 'bg-[#09090b] text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Balcão ({counterCount})</span>
          </button>
          <button
            onClick={() => setFilterRole('ADMIN')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center space-x-1.5 cursor-pointer ${
              filterRole === 'ADMIN'
                ? 'bg-emerald-500 text-zinc-950 font-black'
                : 'bg-[#09090b] text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin ({adminCount})</span>
          </button>
        </div>

        {/* Input de Busca */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome, email ou turno..."
            className="w-full bg-[#09090b] border border-zinc-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
          />
        </div>

      </div>

      {/* Lista de Usuários */}
      <div className="space-y-3">
        {filteredUsers.length === 0 ? (
          <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-12 text-center space-y-3">
            <Users className="w-12 h-12 text-zinc-600 mx-auto" />
            <h3 className="text-base font-bold text-white">Nenhum usuário encontrado</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Nenhum colaborador corresponde aos filtros selecionados. Tente alterar o filtro ou cadastre um novo usuário.
            </p>
          </div>
        ) : (
          filteredUsers.map((user) => {
            const isLucas = user.id === 'user-lucas';
            const isDeleting = deleteConfirmId === user.id;

            return (
              <div
                key={user.id}
                className="bg-[#121215] border border-zinc-800 hover:border-zinc-700 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition shadow-md"
              >
                {/* Info do Usuário */}
                <div className="flex items-center space-x-3.5">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${user.avatarColor || 'from-zinc-700 to-zinc-900'} text-zinc-950 font-black text-base flex items-center justify-center shadow-md flex-shrink-0`}>
                    {user.role === 'KITCHEN' ? '🍳' : user.role === 'COUNTER' ? '💁' : '👑'}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm sm:text-base font-black text-white">
                        {user.name}
                      </h3>
                      {isLucas && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                          Dono Principal
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                      <span className="flex items-center space-x-1 text-zinc-300">
                        <Mail className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{user.email}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1 text-zinc-400">
                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{user.shift || 'Turno Geral'}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Perfil & Ações */}
                <div className="flex items-center justify-between sm:justify-end space-x-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-800/80">
                  
                  {/* Badge de Cargo */}
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-xl border flex items-center space-x-1.5 ${
                    user.role === 'KITCHEN'
                      ? 'bg-orange-500/10 border-orange-500/30 text-orange-400'
                      : user.role === 'COUNTER'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  }`}>
                    {user.role === 'KITCHEN' && <ChefHat className="w-3.5 h-3.5" />}
                    {user.role === 'COUNTER' && <Store className="w-3.5 h-3.5" />}
                    {user.role === 'ADMIN' && <ShieldCheck className="w-3.5 h-3.5" />}
                    <span>{user.roleLabel || user.role}</span>
                  </span>

                  {/* Status Toggle */}
                  {!isLucas && (
                    <button
                      type="button"
                      onClick={() => toggleUserActive(user.id)}
                      className={`text-xs font-semibold px-2.5 py-1.5 rounded-xl border transition ${
                        user.active !== false
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white'
                      }`}
                      title={user.active !== false ? 'Desativar acesso temporariamente' : 'Reativar acesso'}
                    >
                      {user.active !== false ? 'Ativo' : 'Inativo'}
                    </button>
                  )}

                  {/* Botão Deletar com Confirmação Segura */}
                  {!isLucas && (
                    <>
                      {isDeleting ? (
                        <div className="flex items-center space-x-1.5 bg-red-500/10 border border-red-500/30 rounded-xl p-1">
                          <button
                            type="button"
                            onClick={() => handleDeleteUser(user.id, user.name)}
                            className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold transition"
                          >
                            Confirmar Exclusão
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(null)}
                            className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 text-[11px]"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(user.id)}
                          className="p-2 rounded-xl bg-zinc-800/80 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 border border-zinc-700/80 hover:border-red-500/40 transition cursor-pointer"
                          title={`Deletar usuário ${user.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </>
                  )}

                </div>
              </div>
            );
          })
        )}
      </div>

      {/* MODAL PARA ADICIONAR NOVO USUÁRIO */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
            
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Criar Novo Usuário</h3>
                  <p className="text-[11px] text-zinc-400">Cadastre equipe de Cozinha ou Balcão</p>
                </div>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              
              {/* Escolha do Perfil / Cargo */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Cargo / Perfil de Acesso:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setNewRole('KITCHEN');
                      setNewShift('Turno da Tarde/Noite (16h às 00h)');
                    }}
                    className={`p-3 rounded-xl border flex items-center space-x-2.5 text-left transition cursor-pointer ${
                      newRole === 'KITCHEN'
                        ? 'bg-orange-500/15 border-orange-500 text-orange-400 font-bold'
                        : 'bg-[#09090b] border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <ChefHat className="w-5 h-5" />
                    <div>
                      <p className="text-xs font-bold text-white">Cozinha</p>
                      <p className="text-[10px] text-zinc-400">Tablet KDS</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setNewRole('COUNTER');
                      setNewShift('Turno Noite (17h às 23h30)');
                    }}
                    className={`p-3 rounded-xl border flex items-center space-x-2.5 text-left transition cursor-pointer ${
                      newRole === 'COUNTER'
                        ? 'bg-amber-500/15 border-amber-500 text-amber-400 font-bold'
                        : 'bg-[#09090b] border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <Store className="w-5 h-5" />
                    <div>
                      <p className="text-xs font-bold text-white">Balcão</p>
                      <p className="text-[10px] text-zinc-400">Atendimento & Caixa</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Nome */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Nome Completo
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Ex: Carlos Chapa ou Julia Caixa"
                    className="w-full bg-[#09090b] border border-zinc-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  E-mail de Login
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="ex: roberto@dapraca.com"
                    className="w-full bg-[#09090b] border border-zinc-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Senha */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Senha Provisória
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="123456"
                    className="w-full bg-[#09090b] border border-zinc-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              {/* Turno */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Turno / Função
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={newShift}
                    onChange={(e) => setNewShift(e.target.value)}
                    placeholder="Ex: Turno Noite (18h às 00h)"
                    className="w-full bg-[#09090b] border border-zinc-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {formError && (
                <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-2.5 text-center">
                  {formError}
                </p>
              )}

              <div className="pt-2 flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs shadow-lg shadow-amber-500/20 transition active:scale-95"
                >
                  Salvar Usuário
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
