import React from 'react'
import './ItemListContainer.css'

const ItemListContainer = ({ saludo }) => {
    return (
        <div className="container-list">
            <h2>{saludo}</h2>
        </div>
    );
};

export default ItemListContainer