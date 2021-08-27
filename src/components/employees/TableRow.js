import React from 'react';

export default function TableRow({ employee }) {
  const { id, firstName, lastName } = employee;

  return (
    <tr key={id}>
      <td>
        {firstName} {lastName}
      </td>
    </tr>
  );
}
