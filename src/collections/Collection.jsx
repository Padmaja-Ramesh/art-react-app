import React from "react";

const Collection = (props) => {
    const { img, title } = props;
    return (
        <div>
            { img ? <img src={img?.lqip} width="20%" height="20%" alt="art" /> : null }
            { title ? <p>{title}</p> : null }
        </div>
    )
};

export default Collection;