import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { initializeCsrfToken, getCsrfTokenFromCookie } from './csrf';

function Register() {
    const [name, setName] = useState('Test User2');
    const [email, setEmail] = useState('testuser2@example.com');
    const [password, setPassword] = useState('password1232');
    const [confirmPassword, setConfirmPassword] = useState('password1232'); // Nuevo estado para la confirmación de contraseña
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Inicializa el token CSRF al cargar la página
    useEffect(() => {
        initializeCsrfToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        const csrfToken = getCsrfTokenFromCookie();
        console.log("Token CSRF:", csrfToken);

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': csrfToken,
                },
                credentials: 'include',
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: confirmPassword, // Enviamos la confirmación de contraseña
                }),
            });

            if (!response.ok) {
                throw new Error('Error al registrar usuario');
            }

            const data = await response.json();
            console.log("Registro exitoso:", data);
            setSuccess('Registro exitoso. Ahora puedes iniciar sesión.');

            // Limpiar los campos del formulario después del registro exitoso
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (err) {
            console.error(err);
            setError('Error al registrar usuario, por favor verifica los datos.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center">Registro</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Nombre Completo</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Ingresa tu nombre completo"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Ingresa tu correo"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Ingresa tu contraseña"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                placeholder="Confirma tu contraseña"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Registrarse
                        </button>
                    </form>
                    {error && <p className="text-danger mt-3">{error}</p>}
                    {success && <p className="text-success mt-3">{success}</p>}
                    <div className="text-center mt-3">
                        <p>
                            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
