import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context';
import AddButton from '../AddButton';
import DepartmentsTable from './DepartmentsTable';
import DepartmentDisplayModal from '../modals/DepartmentDisplayModal';

export default function Departments() {
  const { departments } = useGlobalContext();
  // Elements
  const [visibleDepartments, setVisibleDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState({
    id: 0,
    name: 'Housing',
    location: 'Bradford'
  });
  // Modals
  const [displayModalShow, setDisplayModalShow] = useState(false);

  // Open Display Modal
  const handleDepartmentSelect = (department) => {
    setDisplayModalShow(true);
    setSelectedDepartment(department);
  };

  useEffect(() => {
    setVisibleDepartments(departments);
  }, [departments]);

  return (
    <>
      <div id='departments' className='section-container'>
        <div>
          <AddButton type='department' />
          <DepartmentsTable
            departments={visibleDepartments}
            handleDepartmentSelect={handleDepartmentSelect}
          />
        </div>
      </div>
      <DepartmentDisplayModal
        show={displayModalShow}
        onHide={() => setDisplayModalShow(false)}
        selectedDepartment={selectedDepartment}
        // handleEditSelect={handleEditSelect}
        // handleDeleteSelect={handleDeleteSelect}
      />
    </>
  );
}
