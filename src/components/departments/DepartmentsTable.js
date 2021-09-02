import React from 'react';
import Table from 'react-bootstrap/Table';
import '../../index.css';
import DepartmentTableRow from './DepartmentsTableRow';

export default function DepartmentsTable(props) {
  const { departments, handleDepartmentSelect } = props;
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
                  handleClick={handleDepartmentSelect}
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
