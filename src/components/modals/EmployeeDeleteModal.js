import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { deleteEmployee } from '../../services/actions';

export default function EmployeeDeleteModal(props) {
  const {
    show,
    onHide,
    selectedEmployee,
    getData,
    onDeleteSuccess,
    onErrorDelete
  } = props;

  const handleDelete = async () => {
    const id = Number(selectedEmployee.id);
    const result = await deleteEmployee(id);
    if (result.description === 'success') {
      getData();
      onDeleteSuccess();
    } else {
      onErrorDelete();
    }
  };

  return (
    <Modal show={show}>
      <Modal.Body className='delete-modal-body'>
        <h1>Are you sure you want to delete this employee?</h1>
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
