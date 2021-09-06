import React from 'react';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import '../../index.css';
import DepartmentTableRow from './DepartmentTableRow';

export default function DepartmentsTable(props) {
  const {
    departments,
    handleDepartmentSelect,
    thisSelected,
    onSelectDepartment,
    toggleOpen,
    open
  } = props;
  const chevronIcon = (
    <FontAwesomeIcon className={open ? '' : 'rotate'} icon={faChevronUp} />
  );

  return (
    <div>
      <Table className='flex-table-header'>
        <thead>
          <tr onClick={toggleOpen}>
            <th>DEPARTMENTS {chevronIcon}</th>
          </tr>
        </thead>
      </Table>
      <div id='department-tbody'>
        <Table responsive striped className='flex-table'>
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
    </div>
  );
}
