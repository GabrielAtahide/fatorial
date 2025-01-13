import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Configuração do Axios
const api = axios.create({
  baseURL: 'http://localhost:3000', // Endpoint do backend
});

function RegistrationForm() {
  const [role, setRole] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      nome: e.target.name.value,
      email: e.target.email.value,
      senha: e.target.password.value,
      tipo: e.target.role.value,
      ...(role === 'professor' && { especialidade }), // Adiciona especialidade apenas se for professor
    };

    try {
      // Define o endpoint baseado no papel selecionado
      const endpoint = role === 'professor' ? '/api/professores' : '/api/usuarios';

      // Envia os dados do formulário para o backend usando POST
      const response = await api.post(endpoint, formData);

      if (response.status === 201) {
        console.log('Usuário cadastrado com sucesso!');
        navigate('/login'); // Redireciona para a página de login
      } else {
        console.error('Erro ao cadastrar usuário');
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);

    // Limpa a especialidade se o papel não for professor
    if (selectedRole !== 'professor') {
      setEspecialidade('');
    }
  };

  return (
    <div className="container">
      <h2>Cadastro</h2>
      <form id="registrationForm" onSubmit={handleSubmit}>
        <label htmlFor="name">Nome Completo:</label>
        <input type="text" id="name" name="name" placeholder="Digite seu nome completo" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Digite seu email" required />

        <label htmlFor="password">Senha:</label>
        <input type="password" id="password" name="password" placeholder="Digite sua senha" required />

        <div className="role-selection">
          <label>
            <input
              type="radio"
              name="role"
              value="aluno"
              onChange={handleRoleChange}
              required
            />
            Aluno
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="professor"
              onChange={handleRoleChange}
              required
            />
            Professor
          </label>
        </div>

        {role === 'professor' && (
          <div className="especialidade">
            <label htmlFor="especialidade">Especialidade:</label>
            <input
              type="text"
              id="especialidade"
              name="especialidade"
              placeholder="Digite sua especialidade"
              value={especialidade}
              onChange={(e) => setEspecialidade(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
