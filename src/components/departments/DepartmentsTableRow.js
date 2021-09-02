import React from 'react';

export default function TableRow({ department, handleClick }) {
  const { id, name } = department;

  return (
    <>
      <tr key={id}>
        <td onClick={() => handleClick(department)}>{name}</td>
      </tr>
    </>
  );
}
