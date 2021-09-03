import React from 'react';

export default function LocationTableRow({ location, handleClick }) {
  const { id, name } = location;

  return (
    <>
      <tr key={id}>
        <td onClick={() => handleClick(location)}>{name}</td>
      </tr>
    </>
  );
}
