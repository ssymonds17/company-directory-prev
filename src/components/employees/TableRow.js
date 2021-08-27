import React from 'react';

export default function TableRow({ employee, handleClick }) {
  const { id, firstName, lastName } = employee;

  return (
    <>
      <tr key={id}>
        <td onClick={() => handleClick()}>
          {firstName} {lastName}
        </td>
      </tr>
    </>
  );
}
