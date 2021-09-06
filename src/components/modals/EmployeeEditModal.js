import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {
  validateEmployee,
  convertDepartmentToDepartmentID,
  checkBlankOnEditEmployee
} from '../../services/helpers';

export default function EmployeeEditModal(props) {
  const {
    show,
    handleReturnFromEdit,
    handleContinueFromEdit,
    selectedEmployee,
    updatingEmployee,
    setUpdatingEmployee,
    setConfirmedEmployeeToEdit,
    departments
  } = props;
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState('');

  const handleChange = async (
    e,
    updatingEmployee,
    setUpdatingEmployee,
    property
  ) => {
    let newEmployeeRecord = updatingEmployee;
    newEmployeeRecord[property] = e.target.value;
    setUpdatingEmployee(newEmployeeRecord);
    setIsDisabled(false);
  };

  const handleConfirm = () => {
    const propertyList = ['firstName', 'lastName', 'email', 'jobTitle'];
    checkBlankOnEditEmployee(
      propertyList,
      selectedEmployee,
      updatingEmployee,
      setUpdatingEmployee
    );
    const validData = validateEmployee(
      'edit',
      updatingEmployee,
      setError,
      selectedEmployee
    );
    if (validData) {
      const confirmedEmployee = updatingEmployee;
      const departmentID = convertDepartmentToDepartmentID(
        confirmedEmployee,
        departments
      );
      const employeeID = Number(confirmedEmployee.id);
      confirmedEmployee.department = departmentID;
      confirmedEmployee.id = employeeID;
      setConfirmedEmployeeToEdit(confirmedEmployee);
      handleContinueFromEdit();
    }
  };

  const setUpdateBaseData = () => {
    const employeeToEdit = {
      id: selectedEmployee.id,
      firstName: selectedEmployee.firstName,
      lastName: selectedEmployee.lastName,
      email: selectedEmployee.email,
      jobTitle: selectedEmployee.jobTitle,
      department: selectedEmployee.department
    };
    setUpdatingEmployee(employeeToEdit);
  };

  useEffect(() => {
    setUpdateBaseData();
  }, [show]);

  return (
    <Modal show={show}>
      <Modal.Title style={{ display: 'flex' }}>
        <div style={{ width: '80%' }}>
          <h1>
            Edit {selectedEmployee.firstName} {selectedEmployee.lastName}
          </h1>
        </div>
        <div
          style={{
            width: '20%',
            display: 'flex',
            justifyContent: 'space-around'
          }}
        >
          <p
            onClick={() => {
              handleReturnFromEdit();
              setIsDisabled(true);
              setError('');
              setUpdateBaseData();
            }}
          >
            Cancel
          </p>
        </div>
      </Modal.Title>
      <Modal.Body>
        <Form>
          <Form.Group controlId='formFirstName'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type='text'
              placeholder={selectedEmployee.firstName}
              autoComplete='off'
              onChange={(e) => {
                handleChange(
                  e,
                  updatingEmployee,
                  setUpdatingEmployee,
                  'firstName'
                );
              }}
            />
          </Form.Group>
          <Form.Group controlId='formLastName'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type='text'
              placeholder={selectedEmployee.lastName}
              autoComplete='off'
              onChange={(e) => {
                handleChange(
                  e,
                  updatingEmployee,
                  setUpdatingEmployee,
                  'lastName'
                );
              }}
            />
          </Form.Group>
          <Form.Group controlId='formEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder={selectedEmployee.email}
              autoComplete='off'
              onChange={(e) => {
                handleChange(e, updatingEmployee, setUpdatingEmployee, 'email');
              }}
            />
          </Form.Group>
          <Form.Group controlId='formJobTitle'>
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              type='text'
              placeholder={selectedEmployee.jobTitle}
              autoComplete='off'
              onChange={(e) => {
                handleChange(
                  e,
                  updatingEmployee,
                  setUpdatingEmployee,
                  'jobTitle'
                );
              }}
            />
          </Form.Group>
          <Form.Group controlId='formDepartment'>
            <Form.Label>Department</Form.Label>
            <Form.Select
              area-label='Department select'
              onChange={(e) => {
                handleChange(
                  e,
                  updatingEmployee,
                  setUpdatingEmployee,
                  'department'
                );
              }}
            >
              <option value={selectedEmployee.department}>
                {selectedEmployee.department} (Current)
              </option>
              {departments &&
                departments.map((department) => {
                  return (
                    <option key={department.id} value={department.name}>
                      {department.name}
                    </option>
                  );
                })}
            </Form.Select>
          </Form.Group>
        </Form>
        <div>{error && <p>{error}</p>}</div>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleConfirm} disabled={isDisabled}>
          Confirm
        </button>
      </Modal.Footer>
    </Modal>
  );
}
