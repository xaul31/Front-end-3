import { useState } from 'react';

// Muestra el panel de perfil y cambia entre sus secciones internas.
export default function Perfil({ usuario, onLogout, onUpdateUsuario, onEliminarCuenta }) {
    const [seccion, setSeccion] = useState('perfil');

    const opciones = [
        { id: 'perfil', label: 'Ver Perfil' },
        { id: 'ejercicios', label: 'Ver Ejercicios' },
        { id: 'dieta', label: 'Ver Dieta' },
        { id: 'modificar', label: 'Modificar Perfil' },
    ];

    return (
        <div className="perfil-layout">
            <aside className="perfil-sidebar">
                <h5 className="perfil-hello">Hola, {usuario.nombre || usuario.email}</h5>

                {opciones.map((op) => (
                    <button
                        key={op.id}
                        className={`perfil-option ${seccion === op.id ? 'btn btn-primary' : 'btn btn-light'}`}
                        onClick={() => setSeccion(op.id)}
                    >
                        {op.label}
                    </button>
                ))}

                <button className="btn btn-danger perfil-logout" onClick={onLogout}>
                    Cerrar sesión
                </button>
            </aside>

            <div className="perfil-content">
                {seccion === 'perfil' && <VerPerfil usuario={usuario} />}
                {seccion === 'ejercicios' && <VerEjercicios />}
                {seccion === 'dieta' && <VerDieta />}
                {seccion === 'modificar' && (
                    <ModificarPerfil
                        usuario={usuario}
                        onUpdateUsuario={onUpdateUsuario}
                        onEliminarCuenta={onEliminarCuenta}
                    />
                )}
            </div>
        </div>
    );
}

// Renderiza los datos básicos del usuario.
function VerPerfil({ usuario }) {
    return (
        <div>
            <h2>Mi Perfil</h2>
            <p>Nombre: {usuario.nombre || 'No especificado'}</p>
            <p>Correo: {usuario.email}</p>
            <p>Acá irá la racha y estadísticas del usuario.</p>
        </div>
    );
}

// Muestra la rutina de ejercicios correspondiente a la última categoría de IMC
function VerEjercicios() {
    const guardado = localStorage.getItem('recomendacionIA');
    const recomendacion = guardado ? JSON.parse(guardado) : null;

    return (
        <div>
            <h2>Mis Ejercicios</h2>
            {!recomendacion ? (
                <p>Aún no tienes ejercicios generados. Ve a la Calculadora de IMC para obtener tu recomendación.</p>
            ) : (
                <>
                    <ul>
                        {recomendacion.ejercicios.map((ej, i) => (
                            <li key={i}>
                                <strong>{ej.nombre}</strong> — {ej.series}
                                <br />
                                {ej.descripcion}
                            </li>
                        ))}
                    </ul>
                    <p><em>{recomendacion.notas}</em></p>
                </>
            )}
        </div>
    );
}


// Muestra la dieta recomendada según la categoría de IMC guardada.
function VerDieta() {
    const guardado = localStorage.getItem('recomendacionIA');
    const recomendacion = guardado ? JSON.parse(guardado) : null;

    return (
        <div>
            <h2>Mi Dieta</h2>
            {!recomendacion ? (
                <p>Aún no tienes una dieta generada. Ve a la Calculadora de IMC para obtener tu recomendación.</p>
            ) : (
                <>
                    <p><strong>Calorías sugeridas:</strong> {recomendacion.dieta.calorias}</p>
                    <div className="row">
                        <div className="col-md-6">
                            <h4>Alimentos recomendados</h4>
                            <ul>
                                {recomendacion.dieta.recomendados.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <h4>Alimentos a evitar</h4>
                            <ul>
                                {recomendacion.dieta.evitar.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

// Permite actualizar el correo, la contraseña o eliminar la cuenta.
function ModificarPerfil({ usuario, onUpdateUsuario, onEliminarCuenta }) {
    const [email, setEmail] = useState(usuario.email);
    const [passwordActual, setPasswordActual] = useState('');
    const [passwordNueva, setPasswordNueva] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [confirmarEliminar, setConfirmarEliminar] = useState(false);

    // Valida los cambios del perfil y guarda la información actualizada.
    function manejoGuardar(e) {
        e.preventDefault();
        setError('');
        setMensaje('');

        if (!email) {
            setError('El correo no puede quedar vacío.');
            return;
        }

        if (passwordNueva) {
            if (!passwordActual) {
                setError('Ingresa tu contraseña actual para poder cambiarla.');
                return;
            }
            if (usuario.password && passwordActual !== usuario.password) {
                setError('La contraseña actual no es correcta.');
                return;
            }
        }

        const usuarioActualizado = {
            ...usuario,
            email,
            ...(passwordNueva ? { password: passwordNueva } : {}),
        };

        localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
        onUpdateUsuario(usuarioActualizado);
        setPasswordActual('');
        setPasswordNueva('');
        setMensaje('Datos actualizados correctamente.');
    }

    // Ejecuta la eliminación de la cuenta desde la sección de perfil.
    function manejoEliminar() {
        onEliminarCuenta();
    }

    return (
        <div>
            <h2>Modificar Perfil</h2>

            <form onSubmit={manejoGuardar}>
                <label htmlFor="email">Correo:</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="passwordActual">Contraseña actual:</label>
                <input
                    id="passwordActual"
                    type="password"
                    placeholder="Solo si vas a cambiarla"
                    value={passwordActual}
                    onChange={(e) => setPasswordActual(e.target.value)}
                />

                <label htmlFor="passwordNueva">Nueva contraseña:</label>
                <input
                    id="passwordNueva"
                    type="password"
                    placeholder="Dejar vacío si no la cambias"
                    value={passwordNueva}
                    onChange={(e) => setPasswordNueva(e.target.value)}
                />

                <button type="submit" className="btn btn-primary">Guardar cambios</button>
            </form>

            {error && <p>{error}</p>}
            {mensaje && <p>{mensaje}</p>}

            <hr />

            <h3>Zona de peligro</h3>

            {!confirmarEliminar ? (
                <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => setConfirmarEliminar(true)}
                >
                    Eliminar perfil
                </button>
            ) : (
                <div>
                    <p>¿Seguro que quieres eliminar tu cuenta? Esta acción no se puede deshacer.</p>
                    <button type="button" className="btn btn-danger" onClick={manejoEliminar}>
                        Sí, eliminar mi cuenta
                    </button>
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => setConfirmarEliminar(false)}
                    >
                        Cancelar
                    </button>
                </div>
            )}
        </div>
    );
}