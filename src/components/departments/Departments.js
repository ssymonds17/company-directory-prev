import React from 'react';
import AddButton from '../AddButton';
import DepartmentsTable from './DepartmentsTable';

export default function Departments() {
  return (
    <div id='departments' className='section-container'>
      <div>
        <AddButton type='department' />
        <DepartmentsTable />
      </div>
    </div>
  );
}
