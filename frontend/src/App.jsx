import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import Dashboard from '@NavegacaoProfessor/Dashboard';
import CriarAula from '@NavegacaoProfessor/CriarAula';
import LoginPage from './LoginPage';
import Agenda from '@NavegacaoProfessor/Agenda';
import Perfil from '@NavegacaoProfessor/Perfil';
import Configuracoes from '@NavegacaoProfessor/Configuracoes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/criar-aula" element={<CriarAula />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
      </Routes>
    </Router>
  );
}

export default App;

