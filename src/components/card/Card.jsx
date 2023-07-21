import React from "react";

const Card=({tittle,description,imagen,tags,link,onSubmit})=>{

    const handleSeñal= ()=>{
        onSubmit(tittle,description,imagen,tags,link)
    }

    return(
        <>
        <div className="card-container">
            <h2>{tittle}</h2>
            <img src={imagen} width="250" height="250"/>
            <p>{description}<br/>
            <a href={link}>Link</a></p>
            <input type="submit" value="Enviar Señal" onClick={handleSeñal}/>
            <div className="tags">
                {tags}
            </div>
        </div>
        
        </>
    )
}

export default Card;