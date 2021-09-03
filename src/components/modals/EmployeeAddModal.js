import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import {
  validateEmployee,
  convertDepartmentToDepartmentID
} from '../../services/helpers';
import { createEmployee } from '../../services/actions';

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
      <Modal.Title style={{ display: 'flex' }}>
        <div style={{ width: '80%' }}>
          <h1>New Employee</h1>
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
          <FloatingLabel controlId='formFirstName' label='First Name'>
            <Form.Control
              type='text'
              onChange={(e) => {
                handleChange(e, 'firstName');
              }}
            />
          </FloatingLabel>
          <FloatingLabel controlId='formLastName' label='Last Name'>
            <Form.Control
              type='text'
              onChange={(e) => {
                handleChange(e, 'lastName');
              }}
            />
          </FloatingLabel>
          <FloatingLabel controlId='formEmail' label='Email'>
            <Form.Control
              type='email'
              onChange={(e) => {
                handleChange(e, 'email');
              }}
            />
          </FloatingLabel>
          <FloatingLabel controlId='formJobTitle' label='Job Title'>
            <Form.Control
              type='text'
              onChange={(e) => {
                handleChange(e, 'jobTitle');
              }}
            />
          </FloatingLabel>
          <FloatingLabel controlId='formDepartment' label='Department'>
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
        <button onClick={handleConfirm} disabled={isDisabled}>
          Create Employee
        </button>
      </Modal.Footer>
    </Modal>
  );
}
