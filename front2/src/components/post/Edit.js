// components/post/Edit.js
import React, { useState } from 'react';

const Edit = ({ post, categories, onSave, onCancel }) => {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [categoryId, setCategoryId] = useState(post.category.id);

    const handleSave = () => {
        onSave({
            id: post.id,
            title,
            content,
            category_id: categoryId,
        });
    };

    return (
        <div>
            <h2>Editar Post</h2>
            <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className="form-control"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <select
                className="form-control"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
            >
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.title}
                    </option>
                ))}
            </select>
            <button onClick={handleSave} className="btn btn-primary mt-2">Guardar</button>
            <button onClick={onCancel} className="btn btn-secondary mt-2">Cancelar</button>
        </div>
    );
};

export default Edit;
