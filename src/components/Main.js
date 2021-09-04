import React, { useState } from 'react';
import Employees from './employees/Employees';
import Departments from './departments/Departments';
import Locations from './locations/Locations';

export default function Main() {
  const [selectedCategory, setSelectedCategory] = useState('');
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div style={{ display: 'flex' }}>
        <Employees />
      </div>
      <div>
        <Departments
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Locations
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </div>
  );
}
