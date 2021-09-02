import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context';
import AddButton from '../AddButton';
import DepartmentsTable from './DepartmentsTable';
import DepartmentDisplayModal from '../modals/DepartmentDisplayModal';
import DepartmentAddModal from '../modals/DepartmentAddModal';
import DepartmentDeleteModal from '../modals/DepartmentDeleteModal';
import SuccessModal from '../modals/SuccessModal';
import WarningModal from '../modals/WarningModal';
import { checkDatabaseDependencies } from '../../services/helpers';

export default function Departments() {
  const { employees, departments, locations, getData } = useGlobalContext();
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
  const [addSuccessShow, setAddSuccessShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [deleteSuccessShow, setDeleteSuccessShow] = useState(false);
  const [warningModalShow, setWarningModalShow] = useState(false);

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
  // Open Delete Modal
  const handleDeleteDepartmentClick = () => {
    // Check if any employees are still attached to the department the user wishes to delete
    const dependencies = checkDatabaseDependencies(
      employees,
      selectedDepartment
    );
    if (dependencies === 0) {
      setDisplayModalShow(false);
      setDeleteModalShow(true);
    } else {
      setWarningModalShow(true);
    }
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
        handleDeleteDepartmentClick={handleDeleteDepartmentClick}
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
        show={addSuccessShow}
        onHide={() => setAddSuccessShow(false)}
        type='Department'
        action='created'
      />
      <DepartmentDeleteModal
        show={deleteModalShow}
        onHide={() => {
          setDeleteModalShow(false);
          setDisplayModalShow(true);
        }}
        // onSuccess={() => {
        //   setDeleteModalShow(false);
        //   setDeleteSuccessShow(true);
        // }}
        selectedDepartment={selectedDepartment}
        getData={getData}
      />
      <SuccessModal
        show={deleteSuccessShow}
        // onHide={() => setDeleteSuccessShow(false)}
        type='Department'
        action='deleted'
      />
      <WarningModal
        show={warningModalShow}
        onHide={() => {
          setWarningModalShow(false);
          setDisplayModalShow(true);
        }}
        childElement='employee'
        parentElement='department'
      />
    </>
  );
}
