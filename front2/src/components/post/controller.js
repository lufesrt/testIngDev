// controller.js

import {getCsrfTokenFromCookie} from "../csrf";

export const fetchPosts = async (authToken, setPosts, setError) => {
    try {
        const response = await fetch('/api/posts', {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();
        setPosts(Array.isArray(data.posts) ? data.posts : []);
    } catch (err) {
        console.error("Error al cargar los posts:", err);
        setError('Error al cargar los posts.');
    }
};

export const handleCreatePost = async (
    e, title, content, categoryId, tags, authToken, posts, setPosts, setTitle, setContent, setCategoryId, setTags, setError, setMessage
) => {
    e.preventDefault();
    const csrfToken = getCsrfTokenFromCookie();
    try {
        // Formatear la fecha actual en el formato compatible con MySQL (YYYY-MM-DD HH:MM:SS)
        const fechaActual = new Date();
        const published_at_format = fechaActual.getFullYear() + '-' +
            ('0' + (fechaActual.getMonth() + 1)).slice(-2) + '-' +
            ('0' + fechaActual.getDate()).slice(-2) + ' ' +
            ('0' + fechaActual.getHours()).slice(-2) + ':' +
            ('0' + fechaActual.getMinutes()).slice(-2) + ':' +
            ('0' + fechaActual.getSeconds()).slice(-2);
        const responseCrea = await fetch('./api/posts', { // Cambia aquí la URL completa
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': csrfToken,
            },
            body: JSON.stringify({
                title,
                content,
                category_id: categoryId,
                tags,
                status: "published",
                featured_image: "http://example.com/image.jpg",
                published_at: published_at_format
            }),
        });

        if (!responseCrea.ok) {
            throw new Error('Error al crear el post');
        }

        const newPost = await responseCrea.json();
        setPosts([...posts, newPost]);
        setMessage('Post creado exitosamente.');

        // Limpiar los campos después de crear el post
        setTitle('');
        setContent('');
        setCategoryId('');
        setTags('');
        setError('');
    } catch (error) {
        console.error('Error en la creación del post:', error);
        setError('Error al crear el post.');
    }
};




export const handleDeletePost = async (postId, authToken, posts, setPosts, setError) => {
    try {
        const response = await fetch('/api/posts/${postId}', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al borrar el post');
        }

        setPosts(posts.filter(post => post.id !== postId));
    } catch (err) {
        console.error(err);
        setError('Error al borrar el post.');
    }
};
