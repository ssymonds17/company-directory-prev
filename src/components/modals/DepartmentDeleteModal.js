import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { deleteDepartment } from '../../services/actions';

export default function EmployeeDeleteModal(props) {
  const { show, onHide, selectedDepartment, getData, onDeleteSuccess } = props;

  const handleDelete = async () => {
    const id = Number(selectedDepartment.id);
    const result = await deleteDepartment(id);
    if (result.description === 'success') {
      getData();
      onDeleteSuccess();
    } else {
      console.log('Some error');
    }
  };

  return (
    <Modal show={show}>
      <Modal.Body className='delete-modal-body'>
        <h1>Are you sure you want to delete this department?</h1>
        <h3>This cannot be undone</h3>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleDelete} className='delete-button'>
          Delete
        </button>
        <button onClick={onHide} className='back-button'>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
}
