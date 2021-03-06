import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { validateLocation, checkBlankNameOnEdit } from '../../services/helpers';

export default function LocationEditModal(props) {
  const {
    show,
    selectedLocation,
    updatingLocation,
    setUpdatingLocation,
    setConfirmedLocToEdit,
    handleReturnFromEdit,
    handleContinueFromEdit,
    locations
  } = props;
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState('');

  const handleChange = async (
    e,
    updatingLocation,
    setUpdatingLocation,
    property
  ) => {
    let newLocationRecord = updatingLocation;
    newLocationRecord[property] = e.target.value;
    setUpdatingLocation(newLocationRecord);
    setIsDisabled(false);
  };

  const handleConfirm = () => {
    checkBlankNameOnEdit(
      selectedLocation,
      updatingLocation,
      setUpdatingLocation
    );
    const validData = validateLocation(
      'edit',
      updatingLocation,
      locations,
      setError,
      selectedLocation
    );
    if (validData) {
      const confirmedLocation = updatingLocation;
      const locationID = Number(confirmedLocation.id);
      confirmedLocation.id = locationID;
      setConfirmedLocToEdit(confirmedLocation);
      handleContinueFromEdit();
    }
  };

  const setUpdateBaseData = () => {
    const locationToEdit = {
      id: selectedLocation.id,
      name: selectedLocation.name
    };
    setUpdatingLocation(locationToEdit);
  };

  useEffect(() => {
    setUpdateBaseData();
  }, [show]);

  return (
    <Modal show={show}>
      <Modal.Title className='custom-modal-title'>
        <div className='custom-modal-header'>
          <h1>Edit {selectedLocation.name}</h1>
        </div>
        <div className='add-cancel'>
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
              placeholder={selectedLocation.name}
              autoComplete='off'
              onChange={(e) => {
                handleChange(e, updatingLocation, setUpdatingLocation, 'name');
              }}
            />
          </Form.Group>
        </Form>
        <div>{error && <p className='modal-error-message'>{error}</p>}</div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={handleConfirm}
          disabled={isDisabled}
          className={isDisabled ? 'create-button-disabled' : 'create-button'}
        >
          Confirm
        </button>
      </Modal.Footer>
    </Modal>
  );
}
