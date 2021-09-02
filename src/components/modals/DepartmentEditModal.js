import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import {
  validateDepartment,
  convertLocationToLocationID
} from '../../services/helpers';

export default function DepartmentEditModal(props) {
  const {
    show,
    selectedDepartment,
    updatingDepartment,
    setUpdatingDepartment,
    setConfirmedDepToEdit,
    handleReturnFromEdit,
    handleContinueFromEdit,
    locations,
    departments
  } = props;
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState('');

  const handleChange = async (
    e,
    updatingDepartment,
    setUpdatingDepartment,
    property
  ) => {
    let newDepartmentRecord = updatingDepartment;
    newDepartmentRecord[property] = e.target.value;
    setUpdatingDepartment(newDepartmentRecord);
    setIsDisabled(false);
  };

  const handleConfirm = () => {
    const validData = validateDepartment(
      updatingDepartment,
      departments,
      setError
    );
    if (validData) {
      const confirmedDepartment = updatingDepartment;
      const locationID = convertLocationToLocationID(
        confirmedDepartment,
        locations
      );
      confirmedDepartment.location = locationID;
      const departmentID = Number(confirmedDepartment.id);
      confirmedDepartment.id = departmentID;
      setConfirmedDepToEdit(confirmedDepartment);
      handleContinueFromEdit();
    }
  };

  const setUpdateBaseData = () => {
    const departmentToEdit = {
      id: selectedDepartment.id,
      name: selectedDepartment.name,
      location: selectedDepartment.location
    };
    setUpdatingDepartment(departmentToEdit);
  };

  useEffect(() => {
    setUpdateBaseData();
  }, [show]);

  return (
    <Modal show={show}>
      <Modal.Title style={{ display: 'flex' }}>
        <div style={{ width: '80%' }}>
          <h1>{selectedDepartment.name}</h1>
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
          <FloatingLabel controlId='formName' label='Name'>
            <Form.Control
              type='text'
              placeholder={selectedDepartment.name}
              onChange={(e) => {
                handleChange(
                  e,
                  updatingDepartment,
                  setUpdatingDepartment,
                  'name'
                );
              }}
            />
          </FloatingLabel>
          <FloatingLabel controlId='formLocation' label='Location'>
            <Form.Select
              area-label='Location select'
              onChange={(e) => {
                handleChange(
                  e,
                  updatingDepartment,
                  setUpdatingDepartment,
                  'location'
                );
              }}
            >
              <option value={selectedDepartment.location}>
                {selectedDepartment.location}
              </option>
              {locations &&
                locations.map((location) => {
                  return (
                    <option key={location.id} value={location.name}>
                      {location.name}
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
          Confirm
        </button>
      </Modal.Footer>
    </Modal>
  );
}
