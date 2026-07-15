import { useState } from 'react';
import './App.css';
import CalculadoraIMC from './funciones/CalculadoraIMC.jsx';
import LoginForm from './usuarios/login.jsx';
import Perfil from './usuarios/perfil.jsx';


export default function App() {
  const [vista, setVista] = useState('calculadora');
  const [usuario, setUsuario] = useState(null);

  // Guarda los datos del usuario cuando inicia sesión o se registra.
  function manejoLogin(datosUsuario) {
    setUsuario(datosUsuario);
  }

  // Cierra la sesión quitando el usuario del estado.
  function manejoLogout() {
    setUsuario(null);
  }

  // Elimina la cuenta guardada en el almacenamiento local y limpia el estado.
  function manejoEliminarCuenta() {
    localStorage.removeItem('usuario');
    setUsuario(null);
  }

  // Actualiza los datos del usuario en el estado y en localStorage.
  function manejoActualizarUsuario(usuarioActualizado) {
    setUsuario(usuarioActualizado);
    try {
      localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
    } catch (e) {
      // Silenciar errores de localStorage para entornos donde no esté disponible
      console.warn('No se pudo guardar usuario en localStorage', e);
    }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img src="/logo.png" alt="Logo" className="app-logo d-inline-block align-top" />
        </a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <button type="button" className="nav-link btn btn-link" onClick={() => setVista('calculadora')}>Calculadora</button>
            </li>
            <li className="nav-item">
              <button type="button" className="nav-link btn btn-link" onClick={() => setVista('perfil')}>Perfil</button>
            </li>
          </ul>
        </div>
      </nav>

      {vista === 'calculadora' && <CalculadoraIMC />}
      {vista === 'perfil' && (
        usuario
          ? <Perfil usuario={usuario} onLogout={manejoLogout} onUpdateUsuario={manejoActualizarUsuario} onEliminarCuenta={manejoEliminarCuenta} />
          : <LoginForm onLogin={manejoLogin} />
      )}
    </div>
  );
}
