import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Certifique-se de que a URL corresponde ao backend
});

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('aluno'); // Tipo de login (padrão: aluno)
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Log para ver o tipo de usuário enviado para o backend
    console.log('Enviando dados para o backend:', { email, senha: password, tipo: loginType });

    try {
      const response = await api.post('/api/auth/login', { email, senha: password, tipo: loginType });
      console.log('Resposta do login:', response);

      if (response.status === 200) {
        const { token } = response.data;
        console.log('Token do login:', token); 

        // Salva o token no localStorage
        localStorage.setItem('authToken', token);

        // Redireciona para o Dashboard
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setError('Credenciais inválidas. Verifique o e-mail ou a senha.');
        } else if (err.response.status === 403) {
          setError('Professor não validado. Acesso negado.');
        } else if (err.response.status === 404) {
          setError('Usuário não encontrado.');
        } else {
          setError('Erro desconhecido. Tente novamente mais tarde.');
        }
      } else if (err.request) {
        setError('Erro de conexão. Verifique sua internet ou tente novamente mais tarde.');
      } else {
        setError('Erro ao processar a solicitação. Tente novamente mais tarde.');
      }

      console.error('Erro ao fazer login:', err);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Tipo de Login:</label>
        <div>
          <button
            type="button"
            onClick={() => setLoginType('aluno')}
            style={{ backgroundColor: loginType === 'aluno' ? 'lightblue' : 'white' }}
          >
            Aluno
          </button>
          <button
            type="button"
            onClick={() => setLoginType('professor')}
            style={{ backgroundColor: loginType === 'professor' ? 'lightblue' : 'white' }}
          >
            Professor
          </button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default LoginPage;
