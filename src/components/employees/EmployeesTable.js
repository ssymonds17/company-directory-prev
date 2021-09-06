import React from 'react';
import Table from 'react-bootstrap/Table';
import EmployeeTableRow from './EmployeeTableRow';
import '../../index.css';

export default function EmployeesTable(props) {
  const { employees, handleEmployeeSelect } = props;

  return (
    <div>
      <Table responsive striped className='employees-table'>
        <thead>
          <tr>
            <th>EMPLOYEES</th>
          </tr>
        </thead>
        <tbody>
          {employees &&
            employees.map((employee) => {
              return (
                <EmployeeTableRow
                  key={employee.id}
                  employee={employee}
                  handleClick={handleEmployeeSelect}
                />
              );
            })}
          {!employees ||
            (employees.length === 0 && (
              <tr>
                <td>No results</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
