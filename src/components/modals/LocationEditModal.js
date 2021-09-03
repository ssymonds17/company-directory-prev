import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import { validateLocation } from '../../services/helpers';

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
    const validData = validateLocation(updatingLocation, locations, setError);
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
      <Modal.Title style={{ display: 'flex' }}>
        <div style={{ width: '80%' }}>
          <h1>{selectedLocation.name}</h1>
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
              placeholder={selectedLocation.name}
              onChange={(e) => {
                handleChange(e, updatingLocation, setUpdatingLocation, 'name');
              }}
            />
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
