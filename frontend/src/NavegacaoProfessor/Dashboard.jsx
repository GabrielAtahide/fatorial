import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

 useEffect(() => {
  const token = localStorage.getItem('authToken');
  console.log('Token armazenado:', token);
  
  if (!token) {
    navigate('/login');
    return;
  }

  try {
    const decoded = jwtDecode(token);
    console.log('Token decodificado:', decoded);

    // Verifique o conteúdo do token, principalmente 'tipo' e 'aprovado'
    if (decoded.tipo !== 'professor') {
      console.log('Tipo de usuário não é professor. Tipo encontrado:', decoded.tipo);

      navigate('/login');
      return;
    }
    if (!decoded.aprovado) {
      console.log('Usuário não aprovado.');
      navigate('/login');
      return;
    }
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Bem-vindo Professor!</h1>
      <div className="dashboard-buttons">
        <Link to="/criar-aula">
          <button>Criar Aula</button>
        </Link>
        <Link to="/agenda">
          <button>Minha Agenda</button>
        </Link>
        <Link to="/perfil">
          <button>Perfil</button>
        </Link>
        <Link to="/configuracoes">
          <button>Configurações</button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
