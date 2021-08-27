import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context';
import TableRow from './TableRow';

export default function Table() {
  const { employees } = useGlobalContext();
  const [visibleEmployees, setVisibleEmployees] = useState([]);

  useEffect(() => {
    setVisibleEmployees(employees);
  }, [employees]);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>EMPLOYEES</th>
          </tr>
        </thead>
        <tbody>
          {visibleEmployees &&
            visibleEmployees.map((employee) => {
              return <TableRow key={employee.id} employee={employee} />;
            })}
          {!visibleEmployees && (
            <tr>
              <td>No results</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
