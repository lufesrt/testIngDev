// src/csrf.js

// Función para leer el token CSRF desde la cookie
export function getCsrfTokenFromCookie() {
    const match = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
}

// Función para inicializar el token CSRF
export function initializeCsrfToken() {
    // Hace la solicitud a /sanctum/csrf-cookie para establecer la cookie
    return fetch('/sanctum/csrf-cookie', {
        credentials: 'include',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener el token CSRF");
            }
            console.log("Token CSRF inicializado en la cookie");
        })
        .catch(err => {
            console.error("Error al inicializar el token CSRF", err);
        });
}
