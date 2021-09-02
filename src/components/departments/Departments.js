import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context';
import AddButton from '../AddButton';
import DepartmentsTable from './DepartmentsTable';

export default function Departments() {
  const { departments } = useGlobalContext();

  return (
    <div id='departments' className='section-container'>
      <div>
        <AddButton type='department' />
        <DepartmentsTable departments={departments} />
      </div>
    </div>
  );
}
