import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import {
  validateDepartment,
  convertLocationToLocationID
} from '../../services/helpers';
import { createDepartment } from '../../services/actions';
import '../../index.css';

export default function DepartmentAddModal(props) {
  const { show, onHide, locations, departments, getData, onAddSuccess } = props;
  const [error, setError] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [newDepartment, setNewDepartment] = useState({});

  // Handle any change of value within form fields
  const handleChange = async (e, property) => {
    let newDepartmentRecord = newDepartment;
    newDepartmentRecord[property] = e.target.value;
    setNewDepartment(newDepartmentRecord);
    setIsDisabled(false);
  };

  // On click of 'Create Department Button'
  const handleConfirm = () => {
    const validData = validateDepartment(
      'create',
      newDepartment,
      departments,
      setError
    );
    if (validData) {
      const newDepartmentRecord = newDepartment;
      if (!newDepartmentRecord.location) {
        newDepartmentRecord.location = locations[0].id;
      } else {
        const locationID = convertLocationToLocationID(
          newDepartmentRecord,
          locations
        );
        newDepartmentRecord.location = locationID;
      }
      handleContinue(newDepartmentRecord);
    }
  };

  // Handle the api request and decide whether to go to success or failure modal
  const handleContinue = async (newDepartmentRecord) => {
    const result = await createDepartment(newDepartmentRecord);
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
          <h1>New Department</h1>
        </div>
        <div className='add-cancel'>
          <p
            onClick={() => {
              setError('');
              setNewDepartment({});
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
            controlId='formName'
            label='Department Name'
            className='floating-form-field'
          >
            <Form.Control
              type='text'
              onChange={(e) => {
                handleChange(e, 'name');
              }}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId='formLocation'
            label='Location'
            className='form-select-input'
          >
            <Form.Select
              area-label='Location select'
              onChange={(e) => {
                handleChange(e, 'location');
              }}
            >
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
        <div>{error && <p className='modal-error-message'>{error}</p>}</div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={handleConfirm}
          disabled={isDisabled}
          className={isDisabled ? 'create-button-disabled' : 'create-button'}
        >
          Create Department
        </button>
      </Modal.Footer>
    </Modal>
  );
}
