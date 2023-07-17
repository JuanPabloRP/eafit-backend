import { React, useState } from "react";
import Card from './card/Card'
const Data = () => {
  const [data, setData] = useState([])
  const [getData, setGet]=useState(false)


  const request = async () => {
    const url = 'https://27b4-2800-e6-4000-49d6-7197-eab-919f-e1d5.ngrok-free.app/api/get-articles';
    const apiKey = "BQ-csVdQijnxsHHsIscNzqUDomcDoiLjyGMLZkzBPTxATHtehVUfLfisAwlRkhjieNBZxcjlGoqTIeWbA";
    const dropdownValue = "movilidad";
    const requestData = new FormData();

    requestData.append('dropdown', dropdownValue);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey
      },
      body: requestData
                                      })

    const responseData = await response.json();
    const newData = [];

      for (let index = 0; index < 20; index++) {

        const obj =
        {
          "title": responseData.title[index],
          "images": responseData.images[index][0],
          "summary": responseData.summary[index],
          "keywords": responseData.keywords[index],
          "link": responseData.link[index]
        }
        newData.push(obj)
        console.log(obj);
        
      }
      console.log("finExmaple\n");
      setData([...data,...newData])
      setGet(true)
    };

  const handleRequest = () => request()

  return (
    <>
      <label htmlFor="">Ingresa la palabra</label>
      <input type="text" />
      <input type="submit" value="Enviar" onClick={handleRequest} />
      {console.log(data,"\n-------------------------------------------\n")}
      { data && (
        data.map((dataE) =>{
          return <Card tittle={dataE.tittle} description={dataE.summary} imagen={dataE.images} tags={dataE.keywords} link={dataE.link} />;
        })

      )}
    </>
  );
}

export default Data;