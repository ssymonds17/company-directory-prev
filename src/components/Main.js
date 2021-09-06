import React, { useState, useEffect } from 'react';
import Employees from './employees/Employees';
import Departments from './departments/Departments';
import Locations from './locations/Locations';
import '../index.css';

export default function Main() {
  const [selectedCategory, setSelectedCategory] = useState('');
  return (
    <div id='main'>
      <div className='main-employees-container'>
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
