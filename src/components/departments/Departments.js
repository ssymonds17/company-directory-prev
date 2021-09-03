import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context';
import AddButton from '../AddButton';
import DepartmentsTable from './DepartmentsTable';
import DepartmentDisplayModal from '../modals/DepartmentDisplayModal';
import DepartmentAddModal from '../modals/DepartmentAddModal';
import DepartmentEditModal from '../modals/DepartmentEditModal';
import DepartmentConfirmEditModal from '../modals/DepartmentConfirmEditModal';
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
  const [updatingDepartment, setUpdatingDepartment] = useState({
    id: 0,
    name: 'Housing',
    location: 'Bradford'
  });
  const [confirmedDepToEdit, setConfirmedDepToEdit] = useState(null);
  // Modals
  const [displayModalShow, setDisplayModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const [addSuccessShow, setAddSuccessShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [confirmEditModalShow, setConfirmEditModalShow] = useState(false);
  const [editSuccessShow, setEditSuccessShow] = useState(false);
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
  // Open Edit Modal
  const handleEditDepartmentClick = () => {
    setDisplayModalShow(false);
    setEditModalShow(true);
  };
  // Return from Edit Modal
  const handleReturnFromEdit = () => {
    setEditModalShow(false);
    setDisplayModalShow(true);
  };
  // Continue from Edit Modal to Confirm Edit Modal
  const handleContinueFromEdit = () => {
    setEditModalShow(false);
    setConfirmEditModalShow(true);
  };
  // Successful Edit of Department
  const onUpdateSuccess = () => {
    setConfirmEditModalShow(false);
    setEditSuccessShow(true);
  };
  // Open Delete Modal
  const handleDeleteDepartmentClick = () => {
    // Check if any employees are still attached to the department the user wishes to delete
    const dependencies = checkDatabaseDependencies(
      employees,
      selectedDepartment,
      'department'
    );
    if (dependencies === 0) {
      setDisplayModalShow(false);
      setDeleteModalShow(true);
    } else {
      setWarningModalShow(true);
    }
  };
  // Successful Deletion of Department
  const onDeleteSuccess = () => {
    setDeleteModalShow(false);
    setDeleteSuccessShow(true);
  };

  useEffect(() => {
    setVisibleDepartments(departments);
  }, [departments]);

  return (
    <>
      <div id='departments' className='section-container'>
        <div>
          <AddButton type='department' addRecord={handleAddDepartmentClick} />
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
        handleEditDepartmentClick={handleEditDepartmentClick}
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
      <DepartmentEditModal
        show={editModalShow}
        handleReturnFromEdit={handleReturnFromEdit}
        handleContinueFromEdit={handleContinueFromEdit}
        selectedDepartment={selectedDepartment}
        updatingDepartment={updatingDepartment}
        setUpdatingDepartment={setUpdatingDepartment}
        setConfirmedDepToEdit={setConfirmedDepToEdit}
        locations={locations}
        departments={departments}
      />
      <DepartmentConfirmEditModal
        show={confirmEditModalShow}
        onHide={() => {
          setConfirmEditModalShow(false);
          setEditModalShow(true);
        }}
        onUpdateSuccess={onUpdateSuccess}
        confirmedDepToEdit={confirmedDepToEdit}
        getData={getData}
      />
      {/* UPDATE SUCCESS */}
      <SuccessModal
        show={editSuccessShow}
        onHide={() => setEditSuccessShow(false)}
        type='Department'
        action='updated'
      />
      <DepartmentDeleteModal
        show={deleteModalShow}
        onHide={() => {
          setDeleteModalShow(false);
          setDisplayModalShow(true);
        }}
        onDeleteSuccess={onDeleteSuccess}
        selectedDepartment={selectedDepartment}
        getData={getData}
      />
      <SuccessModal
        show={deleteSuccessShow}
        onHide={() => setDeleteSuccessShow(false)}
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
