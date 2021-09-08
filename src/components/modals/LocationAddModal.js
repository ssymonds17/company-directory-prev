import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import { createLocation } from '../../services/actions';
import { validateLocation } from '../../services/helpers';

export default function DepartmentAddModal(props) {
  const { show, onHide, locations, getData, onAddSuccess, onErrorAdd } = props;
  const [error, setError] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [newLocation, setNewLocation] = useState({});

  // Handle any change of value within form fields
  const handleChange = async (e, property) => {
    let newLocationRecord = newLocation;
    newLocationRecord[property] = e.target.value;
    setNewLocation(newLocationRecord);
    setIsDisabled(false);
  };

  // On click of 'Create Location Button'
  const handleConfirm = () => {
    const validData = validateLocation(
      'create',
      newLocation,
      locations,
      setError
    );
    if (validData) {
      const newLocationRecord = newLocation;
      handleContinue(newLocationRecord);
    }
  };

  // // Handle the api request and decide whether to go to success or failure modal
  const handleContinue = async (newLocationRecord) => {
    const result = await createLocation(newLocationRecord);
    if (result.description === 'success') {
      getData();
      onAddSuccess();
    } else {
      onErrorAdd();
    }
  };

  return (
    <Modal show={show} static='true'>
      <Modal.Title className='custom-modal-title'>
        <div className='custom-modal-header'>
          <h1>New Location</h1>
        </div>
        <div className='add-cancel'>
          <p
            onClick={() => {
              setError('');
              setNewLocation({});
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
            label='Location Name'
            className='floating-form-field'
          >
            <Form.Control
              type='text'
              onChange={(e) => {
                handleChange(e, 'name');
              }}
            />
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
          Create Location
        </button>
      </Modal.Footer>
    </Modal>
  );
}
