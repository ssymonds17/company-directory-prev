import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default function EmployeeDeleteModal(props) {
  const { show, onHide, selectedEmployee } = props;
  return (
    <Modal show={show}>
      <Modal.Body>
        <h1>Are you sure you want to delete this employee?</h1>
        <h3>This cannot be undone</h3>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={() => console.log(selectedEmployee)}>Delete</button>
        <button onClick={onHide}>Cancel</button>
      </Modal.Footer>
    </Modal>
  );
}
