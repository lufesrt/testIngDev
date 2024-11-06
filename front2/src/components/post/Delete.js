// components/post/Delete.js
import React from 'react';

const Delete = ({ post, onDelete, onCancel }) => {
    return (
        <div>
            <h2>Eliminar Post</h2>
            <p>¿Estás seguro de que deseas eliminar el post titulado <strong>{post.title}</strong>?</p>
            <button onClick={() => onDelete(post.id)} className="btn btn-danger">Eliminar</button>
            <button onClick={onCancel} className="btn btn-secondary">Cancelar</button>
        </div>
    );
};

export default Delete;
