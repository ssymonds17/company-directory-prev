import React from 'react';
import Employees from './employees/Employees';
import Departments from './departments/Departments';
import Locations from './locations/Locations';

export default function Main() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div style={{ display: 'flex' }}>
        <Employees />
      </div>
      <div>
        <Departments />
        <Locations />
      </div>
    </div>
  );
}
