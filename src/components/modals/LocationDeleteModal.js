import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { deleteLocation } from '../../services/actions';

export default function EmployeeDeleteModal(props) {
  const { show, onHide, selectedLocation, getData, onDeleteSuccess } = props;

  const handleDelete = async () => {
    const id = Number(selectedLocation.id);
    const result = await deleteLocation(id);
    if (result.description === 'success') {
      getData();
      onDeleteSuccess();
    } else {
      console.log('Some error');
    }
  };

  return (
    <Modal show={show}>
      <Modal.Body>
        <h1>Are you sure you want to delete this location?</h1>
        <h3>This cannot be undone</h3>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={onHide}>Cancel</button>
      </Modal.Footer>
    </Modal>
  );
}
