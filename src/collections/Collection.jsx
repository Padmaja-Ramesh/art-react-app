import React from "react";
import {useNavigate } from 'react-router-dom';

const Collection = (props) => {
    const { img, title, id } = props;
    const navigate = useNavigate();
    const handleImageClick = () => {
        navigate(`/collection/${id}`); 
    };

    return (
        <div className="card"  onClick={handleImageClick}>
            { img ? <img src={img} width="150px" height="150px" alt={props?.imgAlt} /> : null }
            { title ? <p>{title}</p> : null }
        </div>
    )
};

export default Collection;