import React from 'react';
import EmployeesTable from './EmployeesTable';
import '../../index.css';
import AddButton from '../AddButton';

export default function Employees() {
  return (
    <div id='employees'>
      <div>
        <AddButton type='employee' />
        <EmployeesTable />
      </div>
    </div>
  );
}
