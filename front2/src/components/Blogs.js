import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import View from './post/View';
import Edit from './post/Edit';
import Delete from './post/Delete';
import { fetchPosts, handleCreatePost, handleDeletePost } from './post/controller';

function Blogs() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [status, setStatus] = useState('published');
    const [featuredImage, setFeaturedImage] = useState('');
    const [publishedAt, setPublishedAt] = useState('');
    const [categoryId, setCategoryId] = useState('1');
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedPost, setSelectedPost] = useState(null);
    const [viewMode, setViewMode] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();

    const categories = [
        { id: 1, title: 'Technology' },
        { id: 2, title: 'Health' },
        { id: 3, title: 'Lifestyle' },
        { id: 4, title: 'Education' },
    ];

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            navigate('/login');
        } else {
            loadPosts(authToken, currentPage, selectedCategory);
        }
    }, [navigate, currentPage, selectedCategory]);

    const loadPosts = async (authToken, page = 1, category = '') => {
        try {
            let url = `/api/posts?page=${page}`;
            if (category) {
                url = `/api/posts/category/${category}?page=${page}`;
            }

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error(`Error en la solicitud: ${response.status}`);

            const data = await response.json();

            if (data.posts && Array.isArray(data.posts)) {
                setPosts(data.posts);
                setTotalPages(data.total_pages || 1);
                setMessage('');
            } else if (data.message === "No se encontraron posts para esta categoría") {
                setPosts([]);
                setMessage("No se encontraron posts para esta categoría.");
            } else {
                setPosts([]);
                setMessage('Error al cargar los posts.');
            }
        } catch (err) {
            console.error("Error al cargar los posts:", err);
            setError('Error al cargar los posts. Posiblemente no hay resultados para esta categoria.');
            setMessage('Error al cargar los posts. Posiblemente no hay resultados para esta categoria.');
        }
    };

    const resetForm = () => {
        setTitle('');
        setContent('');
        setTags('');
        setFeaturedImage('');
        setPublishedAt('');
        setCategoryId('1');
    };

    const createPost = (eventPost) => {
        eventPost.preventDefault();
        const authToken = localStorage.getItem('authToken');

        // Aquí definimos los datos individuales para `handleCreatePost`
        handleCreatePost(
            eventPost,            // e
            title,                // título
            content,              // contenido
            categoryId,           // ID de categoría
            tags,                 // etiquetas
            authToken,            // token de autenticación
            posts,                // lista de posts
            setPosts,             // setter para actualizar posts
            setTitle,             // setter para título
            setContent,           // setter para contenido
            setCategoryId,        // setter para ID de categoría
            setTags,              // setter para etiquetas
            setError,             // setter para errores
            setMessage            // setter para mensajes
        );
    };


    const deletePost = (postId) => {
        const authToken = localStorage.getItem('authToken');
        handleDeletePost(authToken, postId, setPosts, posts, setViewMode, setSelectedPost, setError);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Gestión de Posts</h2>
            <form onSubmit={createPost}>
                <div className="mb-3">
                    <label>Título</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Contenido</label>
                    <textarea
                        className="form-control"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Categoría</label>
                    <select
                        className="form-control"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                    >
                        <option value="">Selecciona una categoría</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.title}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label>Etiquetas (Tags)</label>
                    <input
                        type="text"
                        className="form-control"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Crear Blog</button>
            </form>

            <div className="mb-3">
                <label>Filtrar por Categoría:</label>
                <select
                    className="form-control"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Todas las Categorías</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.title}</option>
                    ))}
                </select>
            </div>

            {message ? (
                <div className="alert alert-info">{message}</div>
            ) : (
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Contenido</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.content}</td>
                                <td>{post.category.title}</td>
                                <td>
                                    <button onClick={() => {
                                        setSelectedPost(post);
                                        setViewMode('view');
                                    }}>Ver
                                    </button>
                                    <button onClick={() => {
                                        setSelectedPost(post);
                                        setViewMode('edit');
                                    }}>Editar
                                    </button>
                                    <button onClick={() => deletePost(post.id)}>Borrar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No se encontraron posts.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            )}

            <div className="d-flex justify-content-between align-items-center">
                <button
                    className="btn btn-secondary"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                <span>Página {currentPage} de {totalPages}</span>
                <button
                    className="btn btn-secondary"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Siguiente
                </button>
            </div>

            {viewMode === 'view' && <View post={selectedPost} onClose={() => setViewMode(null)}/>}
            {viewMode === 'edit' && <Edit post={selectedPost} categories={categories} onSave={(updatedPost) => {/* lógica de actualización */
            }} onCancel={() => setViewMode(null)}/>}
            {viewMode === 'delete' &&
                <Delete post={selectedPost} onDelete={deletePost} onCancel={() => setViewMode(null)}/>}
        </div>
    );
}

export default Blogs;
