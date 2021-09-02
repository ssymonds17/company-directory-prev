import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context';
import AddButton from '../AddButton';
import DepartmentsTable from './DepartmentsTable';
import DepartmentDisplayModal from '../modals/DepartmentDisplayModal';
import DepartmentAddModal from '../modals/DepartmentAddModal';
import SuccessModal from '../modals/SuccessModal';

export default function Departments() {
  const { departments, locations, getData } = useGlobalContext();
  // Elements
  const [visibleDepartments, setVisibleDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState({
    id: 0,
    name: 'Housing',
    location: 'Bradford'
  });
  // Modals
  const [displayModalShow, setDisplayModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const [addSucessShow, setAddSuccessShow] = useState(false);

  // Open Display Modal
  const handleDepartmentSelect = (department) => {
    setDisplayModalShow(true);
    setSelectedDepartment(department);
  };
  // Open Add Modal
  const handleAddDepartmentClick = () => {
    setAddModalShow(true);
  };
  // Successful Creation of Department
  const onAddSuccess = () => {
    setAddModalShow(false);
    setAddSuccessShow(true);
  };

  useEffect(() => {
    setVisibleDepartments(departments);
  }, [departments]);

  return (
    <>
      <div id='departments' className='section-container'>
        <div>
          <AddButton
            type='department'
            handleAddDepartmentClick={handleAddDepartmentClick}
          />
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
      <DepartmentAddModal
        show={addModalShow}
        onHide={() => setAddModalShow(false)}
        onAddSuccess={onAddSuccess}
        locations={locations}
        departments={departments}
        getData={getData}
      />
      {/* ADD SUCCESS */}
      <SuccessModal
        show={addSucessShow}
        onHide={() => setAddSuccessShow(false)}
        type='Department'
        action='created'
      />
    </>
  );
}
