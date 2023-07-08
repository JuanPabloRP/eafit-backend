import {React, useState} from "react";

const Data= () => {
  const [data, setData]=useState([])

  const request = async()=>{ 
      const url = 'https://048d-2800-e6-4000-49d6-51fc-4bf0-47ea-aac4.ngrok-free.app/api/get-articles';
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
      

      const obj =
       { 
                    "title": responseData.title[0],
                    "images": responseData.images[0][0],
                    "summary": responseData.summary[0],
                    "keywords": responseData.keywords[0],
                    "link":responseData.link[0]
        }

      console.log(obj);
      setData(obj)
};    

const handleRequest = ()=> request()

  return (
    <>
    <label htmlFor="">Ingresa la palabra</label>
    <input type="text" />
    <input type="submit" value="Enviar" onClick={handleRequest}/>
    
    </>
  );
}

export default Data;