import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { updateLocation } from '../../services/actions';

export default function EmployeeConfirmModal(props) {
  const { show, onHide, confirmedLocToEdit, onUpdateSuccess, getData } = props;

  const handleConfirmUpdate = async () => {
    const result = await updateLocation(confirmedLocToEdit);
    if (result.description === 'success') {
      getData();
      onUpdateSuccess();
    } else {
      console.log('Some error');
    }
  };

  return (
    <Modal show={show}>
      <Modal.Body>
        <h1>Confirm the changes to this location</h1>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleConfirmUpdate}>Confirm</button>
        <button onClick={onHide}>Cancel</button>
      </Modal.Footer>
    </Modal>
  );
}
