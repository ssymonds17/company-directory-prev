import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {
  validateDepartment,
  convertLocationToLocationID,
  checkBlankNameOnEdit
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
    checkBlankNameOnEdit(
      selectedDepartment,
      updatingDepartment,
      setUpdatingDepartment
    );
    const validData = validateDepartment(
      'edit',
      updatingDepartment,
      departments,
      setError,
      selectedDepartment
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
          <h1>Edit {selectedDepartment.name}</h1>
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
          <Form.Group controlId='formName'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder={selectedDepartment.name}
              autoComplete='off'
              onChange={(e) => {
                handleChange(
                  e,
                  updatingDepartment,
                  setUpdatingDepartment,
                  'name'
                );
              }}
            />
          </Form.Group>
          <Form.Group controlId='formLocation'>
            <Form.Label>Location</Form.Label>
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
                {selectedDepartment.location} (Current)
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
