import React from 'react';
import Table from 'react-bootstrap/Table';
import DepartmentTableRow from './DepartmentTableRow';
import '../../index.css';

export default function DepartmentsTable(props) {
  const {
    departments,
    handleDepartmentSelect,
    thisSelected,
    onSelectDepartment
  } = props;
  return (
    <div>
      <Table responsive striped className='section-table'>
        <thead>
          <tr>
            <th>DEPARTMENTS</th>
          </tr>
        </thead>
        <tbody className={thisSelected ? 'selected-category-container' : ''}>
          {/* NOT SELECTED */}
          {departments &&
            !thisSelected &&
            departments.map((department) => {
              return (
                <DepartmentTableRow
                  key={department.id}
                  department={department}
                  handleClick={handleDepartmentSelect}
                />
              );
            })}
          {/* SELECTED */}
          {departments &&
            thisSelected &&
            departments.map((department) => {
              return (
                <DepartmentTableRow
                  key={department.id}
                  department={department}
                  handleClick={onSelectDepartment}
                  isSelected={true}
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
