import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context';
import Table from 'react-bootstrap/Table';
import '../../index.css';
import DepartmentTableRow from './DepartmentsTableRow';

export default function DepartmentsTable() {
  const { departments } = useGlobalContext();
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
