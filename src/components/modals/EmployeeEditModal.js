import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useGlobalContext } from '../../context';
import { FloatingLabel } from 'react-bootstrap';
import { validateEmployeeEdit } from '../../services/helpers';

export default function EmployeeEditModal(props) {
  const {
    selectedemployee,
    updatingEmployee,
    setUpdatingEmployee,
    setEditConfirmModalShow,
    ...rest
  } = props;
  const { departments } = useGlobalContext();
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChange = (e, updatingEmployee, setUpdatingEmployee, property) => {
    let newEmployeeRecord = updatingEmployee;
    newEmployeeRecord[property] = e.target.value;
    setUpdatingEmployee(newEmployeeRecord);
    setIsDisabled(false);
  };

  const handleConfirm = () => {
    validateEmployeeEdit(updatingEmployee);
  };

  const setUpdateBaseData = () => {
    const employeeToEdit = {
      id: selectedemployee.id,
      firstName: selectedemployee.firstName,
      lastName: selectedemployee.lastName,
      email: selectedemployee.email,
      jobTitle: selectedemployee.jobTitle,
      department: selectedemployee.department
    };
    setUpdatingEmployee(employeeToEdit);
  };

  useEffect(() => {
    setUpdateBaseData();
  }, [props.show]);

  return (
    <Modal {...rest}>
      <Modal.Title style={{ display: 'flex' }}>
        <div style={{ width: '80%' }}>
          <h1>
            {selectedemployee.firstName} {selectedemployee.lastName}
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
              props.onReturn();
              setIsDisabled(true);
              setUpdateBaseData();
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
              placeholder={selectedemployee.firstName}
              onChange={(e) => {
                handleChange(
                  e,
                  updatingEmployee,
                  setUpdatingEmployee,
                  'firstName'
                );
              }}
            />
          </FloatingLabel>
          <FloatingLabel controlId='formLastName' label='Last Name'>
            <Form.Control
              type='text'
              placeholder={selectedemployee.lastName}
              onChange={(e) => {
                handleChange(
                  e,
                  updatingEmployee,
                  setUpdatingEmployee,
                  'lastName'
                );
              }}
            />
          </FloatingLabel>
          <FloatingLabel controlId='formEmail' label='Email'>
            <Form.Control
              type='email'
              placeholder={selectedemployee.email}
              onChange={(e) => {
                handleChange(e, updatingEmployee, setUpdatingEmployee, 'email');
              }}
            />
          </FloatingLabel>
          <FloatingLabel controlId='formJobTitle' label='Job Title'>
            <Form.Control
              type='text'
              placeholder={selectedemployee.jobTitle}
              onChange={(e) => {
                handleChange(
                  e,
                  updatingEmployee,
                  setUpdatingEmployee,
                  'jobTitle'
                );
              }}
            />
          </FloatingLabel>
          <FloatingLabel controlId='formDepartment' label='Department'>
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
              <option value={selectedemployee.department}>
                {selectedemployee.department}
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
          </FloatingLabel>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button
          // onClick={props.onContinue}
          onClick={handleConfirm}
          disabled={isDisabled}
        >
          Confirm
        </button>
      </Modal.Footer>
    </Modal>
  );
}
