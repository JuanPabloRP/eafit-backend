import React from "react";

const Card=({tittle,description,imagen,tags,link})=>{

    return(
        <>
        <div className="card-container">
            <h2>{tittle}</h2>
            <img src={imagen} width="250" height="250"/>
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