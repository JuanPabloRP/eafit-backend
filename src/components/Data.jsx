import React, { useEffect, useState } from 'react';

export function Data() {
  const url = 'https://b243-2800-e6-4000-49d6-ac0f-d4a0-1291-4529.ngrok-free.app/api/get-articles';
  const apiKey = 'BQ-csVdQijnxsHHsIscNzqUDomcDoiLjyGMLZkzBPTxATHtehVUfLfisAwlRkhjieNBZxcjlGoqTIeWbA';
  const dropdownValue = 'movilidad';

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestData = new FormData();
        requestData.append('dropdown', dropdownValue);

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': apiKey
          },
          body: requestData
        });

        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Fetch</h1>
      {data ? (
        <div>
          {/* Renderiza los datos obtenidos aquí */}
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
}
