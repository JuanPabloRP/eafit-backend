import { React, useState } from "react";
import Card from './card/Card'
const Data = () => {

  const [data, setData] = useState([])
  const [mensaje, setMensaje] = useState([])


  const request = async (msje) => {
    const url = 'https://ab5e-2800-e6-4001-fe74-41a7-67e7-eb46-15c8.ngrok-free.app/api/get-articles';
    const apiKey = "BQ-csVdQijnxsHHsIscNzqUDomcDoiLjyGMLZkzBPTxATHtehVUfLfisAwlRkhjieNBZxcjlGoqTIeWbA";
    const dropdownValue = msje;
    const requestData = new FormData();
    console.log(msje)
    requestData.append('dropdown', dropdownValue);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey
      },
      body: requestData,
      mode: 'cors'
    })

    const responseData = await response.json();
    const newData = [];

    for (let index = 0; index < 20; index++) {
      const obj =
      {
        "title": responseData.title[index],
        "images": responseData?.images[index][0],
        "summary": responseData.summary[index],
        "keywords": responseData.keywords[index],
        "link": responseData.link[index]
      }
      newData.push(obj)
    }

    setData([...data, ...newData])
    setGet(true)
  };

  const handleMensaje = (e) => {
    setMensaje(
      { ...mensaje, value: e.target.value }
    )
  }

  const handleRequest = () => {
    request(mensaje.value)
  }

  const saveSeñal = (title, description, imagen, tags, link) => {
    const url = "http://localhost:8080/news/join"
    console.log(`enviar señal, titulo:${title}, desc:${description},\nimagen: ${imagen}, \n${tags}, \n${link}`)
    



    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "id": 5,
      "title": title,
      "description": description,
      "tags": tags.join(", "),
      "link": link,
      "image": imagen
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8080/news/join", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));


  }


  return (
    <>
      <label htmlFor="">Ingresa la palabra</label>
      <input type="text" onChange={handleMensaje} />
      <input type="submit" value="Enviar" onClick={handleRequest} />
      <div>
        {data && (
          data.map((dataE) => {
            return <Card onSubmit={saveSeñal} tittle={dataE.title} description={dataE.summary} imagen={dataE.images} tags={dataE.keywords} link={dataE.link} />;
          })

        )}
      </div>
    </>
  );
}

export default Data;