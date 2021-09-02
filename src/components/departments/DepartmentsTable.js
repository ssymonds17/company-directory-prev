import React from 'react';
import Table from 'react-bootstrap/Table';
import '../../index.css';
import DepartmentTableRow from './DepartmentsTableRow';

export default function DepartmentsTable({ departments }) {
  return (
    <div>
      <Table responsive striped className='section-table'>
        <thead>
          <tr>
            <th>DEPARTMENTS</th>
          </tr>
        </thead>
        <tbody>
          {departments &&
            departments.map((department) => {
              return (
                <DepartmentTableRow
                  key={department.id}
                  department={department}
                  // handleClick={handleEmployeeSelect}
                />
              );
            })}
          {!departments && (
            <tr>
              <td>Loading...</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
