import React from 'react';

export default function EmployeeTableRow({ employee, handleClick }) {
  const { id, firstName, lastName } = employee;

  return (
    <>
      <tr key={id}>
        <td onClick={() => handleClick(employee)}>
          {firstName} {lastName}
        </td>
      </tr>
    </>
  );
}
