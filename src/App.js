import React, { useState } from 'react';

function App() {
  const [locations, setLocations] = useState(null);
  const [error, setError] = useState(null);

  const getLocations = () => {
    fetch('http://192.168.64.2/project2-api/php/getLocations.php')
      .then((res) => res.json())
      .then(
        (result) => {
          // setLocations(result.data);
          console.log(result.data);
        },
        (error) => {
          setError(error);
        }
      );
  };
  return (
    <div>
      <button onClick={getLocations}>Click</button>
    </div>
  );
}

export default App;
