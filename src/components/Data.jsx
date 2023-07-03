export function Data() {
  const url = 'https://b243-2800-e6-4000-49d6-ac0f-d4a0-1291-4529.ngrok-free.app/api/get-articles';
  const apiKey = "BQ-csVdQijnxsHHsIscNzqUDomcDoiLjyGMLZkzBPTxATHtehVUfLfisAwlRkhjieNBZxcjlGoqTIeWbA";
  const dropdownValue = "movilidad";
  const requestData = new FormData();
  requestData.append('dropdown', dropdownValue);

  const request = async()=>{ 
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey
      },
      body: requestData
    })

    const responseData = await response.json();
    console.log(responseData);
};

request();
  return (
    <>
      <h1>fetch</h1>
    </>
  );
}
