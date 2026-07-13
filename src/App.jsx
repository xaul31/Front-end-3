import { useState } from 'react';
import CalculadoraIMC from './CalculadoraIMC.jsx';
import LoginForm from './login.jsx';
import Perfil from './perfil.jsx';


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

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img src="/logo.png" alt="Logo" width="140" height="100" className="d-inline-block align-top" />
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
          ? <Perfil usuario={usuario} onLogout={manejoLogout} onEliminarCuenta={manejoEliminarCuenta} />
          : <LoginForm onLogin={manejoLogin} />
      )}
    </div>
  );
}
