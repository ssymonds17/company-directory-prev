import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import {
  validateEmployee,
  convertDepartmentToDepartmentID
} from '../../services/helpers';
import { createEmployee } from '../../services/actions';
import '../../index.css';

export default function EmployeeAddModal(props) {
  const { show, onHide, onAddSuccess, departments, getData } = props;

  const [error, setError] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [newEmployee, setNewEmployee] = useState({});

  const handleChange = async (e, property) => {
    let newEmployeeRecord = newEmployee;
    newEmployeeRecord[property] = e.target.value;
    setNewEmployee(newEmployeeRecord);
    setIsDisabled(false);
  };

  const handleConfirm = () => {
    const validData = validateEmployee(newEmployee, setError);
    if (validData) {
      const newEmployeeRecord = newEmployee;
      if (!newEmployeeRecord.department) {
        newEmployeeRecord.department = departments[0].id;
      } else {
        const departmentID = convertDepartmentToDepartmentID(
          newEmployeeRecord,
          departments
        );
        newEmployeeRecord.department = departmentID;
      }
      handleContinue(newEmployeeRecord);
    }
  };

  const handleContinue = async (newEmployeeRecord) => {
    const result = await createEmployee(newEmployeeRecord);
    if (result.description === 'success') {
      getData();
      onAddSuccess();
    } else {
      console.log('Some error');
    }
  };

  return (
    <Modal show={show} static='true'>
      <Modal.Title className='custom-modal-title'>
        <div className='custom-modal-header'>
          <h1>New Employee</h1>
        </div>
        <div className='add-cancel'>
          <p
            onClick={() => {
              setError('');
              setNewEmployee({});
              setIsDisabled(true);
              onHide();
            }}
          >
            Cancel
          </p>
        </div>
      </Modal.Title>
      <Modal.Body>
        <Form>
          <FloatingLabel
            controlId='formFirstName'
            label='First Name'
            autoComplete='off'
            className='floating-form-field'
          >
            <Form.Control
              type='text'
              onChange={(e) => {
                handleChange(e, 'firstName');
              }}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId='formLastName'
            label='Last Name'
            className='floating-form-field'
          >
            <Form.Control
              type='text'
              autoComplete='off'
              onChange={(e) => {
                handleChange(e, 'lastName');
              }}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId='formEmail'
            label='Email'
            className='floating-form-field'
          >
            <Form.Control
              type='email'
              autoComplete='off'
              onChange={(e) => {
                handleChange(e, 'email');
              }}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId='formJobTitle'
            label='Job Title'
            className='floating-form-field'
          >
            <Form.Control
              type='text'
              autoComplete='off'
              onChange={(e) => {
                handleChange(e, 'jobTitle');
              }}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId='formDepartment'
            label='Department'
            className='form-select-input'
          >
            <Form.Select
              area-label='Department select'
              onChange={(e) => {
                handleChange(e, 'department');
              }}
            >
              {departments &&
                departments.map((department) => {
                  return (
                    <option key={department.id} value={department.name}>
                      {department.name}
                    </option>
                  );
                })}
            </Form.Select>
          </FloatingLabel>
        </Form>
        <div>{error && <p>{error}</p>}</div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={handleConfirm}
          disabled={isDisabled}
          className='create-button'
        >
          Create Employee
        </button>
      </Modal.Footer>
    </Modal>
  );
}
