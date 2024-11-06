import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeCsrfToken, getCsrfTokenFromCookie } from './csrf';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('admin@test.ing');
    const [password, setPassword] = useState('admin123');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        initializeCsrfToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const csrfToken = getCsrfTokenFromCookie();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': csrfToken,
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            if (!response.ok) {
                throw new Error('Error al iniciar sesión');
            }

            const data = await response.json();
            localStorage.setItem('authToken', data.token); // Guarda el token en localStorage
            console.log(data.token)
            navigate('/blogs'); // Redirige a la página de blogs
        } catch (err) {
            console.error(err);
            setError('Error al iniciar sesión, verifica tus credenciales.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4 shadow">
                        <h2 className="text-center">Iniciar Sesión</h2>
                        <form onSubmit={handleSubmit}>
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
                            <button type="submit" className="btn btn-primary w-100">
                                Iniciar Sesión
                            </button>
                        </form>
                        {error && <p className="text-danger mt-3">{error}</p>}
                        <div className="text-center mt-3">
                            <p>
                                ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
