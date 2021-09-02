import React from 'react';

export default function TableRow({ location }) {
  const { id, name } = location;

  return (
    <>
      <tr key={id}>
        <td onClick={() => console.log(location)}>{name}</td>
      </tr>
    </>
  );
}
