export function Data() {
  const url = 'https://b243-2800-e6-4000-49d6-ac0f-d4a0-1291-4529.ngrok-free.app/api/get-articles';
  const apiKey = "BQ-csVdQijnxsHHsIscNzqUDomcDoiLjyGMLZkzBPTxATHtehVUfLfisAwlRkhjieNBZxcjlGoqTIeWbA";
  const dropdownValue = "movilidad";


  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': apiKey
    },
    body: JSON.stringify(dropdownValue) 
  })
  .then(response => {
    console.log(response);
    return response.json();
  })
  .catch(error => {
    // Manejo de errores
    console.error('Error:', error);
  });
  
  return (
    <>
      <h1>fetch</h1>
    </>
  );
}
