import React from "react";
import {useNavigate } from 'react-router-dom';

const Collection = (props) => {
    const { img, title } = props;
    const navigate = useNavigate();
    const handleImageClick = () => {
        navigate(`/collection/${title}`); 
    };

    return (
        <div>
            { img ? <img src={img?.lqip} width="50%" height="50%" alt="art"  onClick={handleImageClick}  /> : null }
            { title ? <p>{title}</p> : null }
        </div>
    )
};

export default Collection;