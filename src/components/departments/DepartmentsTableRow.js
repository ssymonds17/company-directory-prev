import React from 'react';

export default function TableRow({ department }) {
  const { id, name } = department;

  return (
    <>
      <tr key={id}>
        <td onClick={() => console.log(department)}>{name}</td>
      </tr>
    </>
  );
}
