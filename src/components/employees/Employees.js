import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context';
import AddButton from '../AddButton';
import EmployeesTable from './EmployeesTable';
import EmployeeDisplayModal from '../modals/EmployeeDisplayModal';
import EmployeeAddModal from '../modals/EmployeeAddModal';
import EmployeeEditModal from '../modals/EmployeeEditModal';
import EmployeeConfirmEditModal from '../modals/EmployeeConfirmEditModal';
import EmployeeDeleteModal from '../modals/EmployeeDeleteModal';
import SuccessModal from '../modals/SuccessModal';
import '../../index.css';

export default function Employees() {
  const { employees, departments, getData } = useGlobalContext();
  console.log(departments);

  // Elements
  const [visibleEmployees, setVisibleEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({
    id: 0,
    firstName: 'John',
    lastName: 'Doe',
    email: 'example.email.com',
    jobTitle: 'CEO',
    department: {
      name: 'Management',
      id: 0
    }
  });
  const [updatingEmployee, setUpdatingEmployee] = useState({
    id: 0,
    firstName: 'John',
    lastName: 'Doe',
    email: 'example.email.com',
    jobTitle: 'CEO',
    department: {
      name: 'Management',
      id: 0
    }
  });
  const [confirmedEmployeeToEdit, setConfirmedEmployeeToEdit] = useState(null);
  // Modals
  const [displayModalShow, setDisplayModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const [addSuccessShow, setAddSuccessShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [confirmEditModalShow, setConfirmEditModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [editSuccessShow, setEditSuccessShow] = useState(false);
  const [deleteSuccessShow, setDeleteSuccessShow] = useState(false);

  // Open Display Modal
  const handleEmployeeSelect = (employee) => {
    setDisplayModalShow(true);
    setSelectedEmployee(employee);
  };
  // Open Add Modal
  const handleAddEmployeeClick = () => {
    setAddModalShow(true);
  };
  // Successful Creation of Employee
  const onAddSuccess = () => {
    setAddModalShow(false);
    setAddSuccessShow(true);
  };
  // Open Edit Modal
  const handleEditEmployeeClick = () => {
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
  // Successful Edit of Employee
  const onUpdateSuccess = () => {
    setConfirmEditModalShow(false);
    setEditSuccessShow(true);
  };
  // Open Delete Modal
  const handleDeleteEmployeeClick = () => {
    setDisplayModalShow(false);
    setDeleteModalShow(true);
  };
  // Successful Deletion of Employee
  const onDeleteSuccess = () => {
    setDeleteModalShow(false);
    setDeleteSuccessShow(true);
  };

  useEffect(() => {
    setVisibleEmployees(employees);
  }, [employees]);

  return (
    <>
      <div id='employees' className='section-container'>
        <div>
          <AddButton type='employee' addRecord={handleAddEmployeeClick} />
          <EmployeesTable
            employees={visibleEmployees}
            handleEmployeeSelect={handleEmployeeSelect}
          />
        </div>
      </div>
      <EmployeeDisplayModal
        show={displayModalShow}
        onHide={() => setDisplayModalShow(false)}
        selectedEmployee={selectedEmployee}
        handleEditEmployeeClick={handleEditEmployeeClick}
        handleDeleteEmployeeClick={handleDeleteEmployeeClick}
      />
      <EmployeeAddModal
        show={addModalShow}
        onHide={() => setAddModalShow(false)}
        onAddSuccess={onAddSuccess}
        departments={departments}
        getData={getData}
      />
      {/* ADD SUCCESS */}
      <SuccessModal
        show={addSuccessShow}
        onHide={() => setAddSuccessShow(false)}
        type='Employee'
        action='created'
      />
      <EmployeeEditModal
        show={editModalShow}
        handleReturnFromEdit={handleReturnFromEdit}
        handleContinueFromEdit={handleContinueFromEdit}
        selectedEmployee={selectedEmployee}
        updatingEmployee={updatingEmployee}
        setUpdatingEmployee={setUpdatingEmployee}
        setConfirmedEmployeeToEdit={setConfirmedEmployeeToEdit}
        employees={employees}
        departments={departments}
      />
      <EmployeeConfirmEditModal
        show={confirmEditModalShow}
        onHide={() => {
          setConfirmEditModalShow(false);
          setEditModalShow(true);
        }}
        onUpdateSuccess={onUpdateSuccess}
        confirmedEmployeeToEdit={confirmedEmployeeToEdit}
        getData={getData}
      />
      {/* UPDATE SUCCESS */}
      <SuccessModal
        show={editSuccessShow}
        onHide={() => setEditSuccessShow(false)}
        type='Employee'
        action='updated'
      />
      <EmployeeDeleteModal
        show={deleteModalShow}
        onHide={() => {
          setDeleteModalShow(false);
          setDisplayModalShow(true);
        }}
        onDeleteSuccess={onDeleteSuccess}
        selectedEmployee={selectedEmployee}
        getData={getData}
      />
      <SuccessModal
        show={deleteSuccessShow}
        onHide={() => setDeleteSuccessShow(false)}
        type='Employee'
        action='deleted'
      />
    </>
  );
}
