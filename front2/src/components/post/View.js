// components/post/View.js
import React from 'react';

const View = ({ post, onClose }) => {
    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p><strong>Categoría:</strong> {post.category.title}</p>
            <p><strong>Tags:</strong> {post.tags}</p>
            <p><strong>Estado:</strong> {post.status}</p>
            <button onClick={onClose} className="btn btn-secondary">Cerrar</button>
        </div>
    );
};

export default View;
