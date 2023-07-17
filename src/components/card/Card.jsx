import React from "react";

const Card=({tittle,description,imagen,tags,link})=>{

    return(
        <>
        <div className="card-container">
            <h3>{tittle}</h3>
            <img src={imagen} />
            <p>{description}</p>
            <div className="tags">
                {tags}
            </div>
            <input type="submit" value="Enviar Señal" />
        </div>
        
        </>
    )
}

export default Card;