import { useState } from 'react';

// Muestra el formulario para iniciar sesión o crear una cuenta.
export default function LoginForm({ onLogin }) {
  const [modo, setModo] = useState('login'); // 'login' o 'registro'
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Valida el formulario y registra o autentica al usuario según el modo actual.
  function manejoSubmit(e) {
    e.preventDefault();

    if (!email || !password || (modo === 'registro' && !nombre)) {
      setError('Completa todos los campos.');
      return;
    }

    setError('');

    if (modo === 'registro') {
      // Guarda el usuario en localStorage, incluyendo la contraseña
      const usuario = { nombre, email, password };
      localStorage.setItem('usuario', JSON.stringify(usuario));
      onLogin(usuario);
    } else {
      // Login: valida correo y contraseña por separado
      const guardado = localStorage.getItem('usuario');

      if (!guardado) {
        setError('No hay una cuenta registrada. Regístrate primero.');
        return;
      }

      const usuario = JSON.parse(guardado);

      if (usuario.email !== email) {
        setError('Credenciales incorrectas.');
        return;
      }

      if (usuario.password !== password) {
        setError('Credenciales incorrectas.');
        return;
      }

      onLogin(usuario);
    }
  }

  return (
    <div className="container">
      <h1 className="display-4">{modo === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</h1>

      <form onSubmit={manejoSubmit}>
        {modo === 'registro' && (
          <>
            <label htmlFor="nombre">Nombre:</label>
            <input
              id="nombre"
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </>
        )}

        <label htmlFor="email">Correo:</label>
        <input
          id="email"
          type="email"
          placeholder="tucorreo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Contraseña:</label>
        <input
          id="password"
          type="password"
          placeholder="••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="btn btn-primary">
          {modo === 'login' ? 'Ingresar' : 'Registrarme'}
        </button>
      </form>

      {error && <p className="form-error">{error}</p>}

      <p>
        {modo === 'login' ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
        <button
          type="button"
          className="btn btn-link"
          onClick={() => { setModo(modo === 'login' ? 'registro' : 'login'); setError(''); }}
        >
          {modo === 'login' ? 'Regístrate aquí' : 'Inicia sesión aquí'}
        </button>
      </p>
    </div>
  );
}