import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { updateEmployee } from '../../services/actions';

export default function EmployeeConfirmEditModal(props) {
  const {
    show,
    onHide,
    confirmedEmployeeToEdit,
    onUpdateSuccess,
    getData
  } = props;

  const handleConfirmUpdate = async () => {
    const result = await updateEmployee(confirmedEmployeeToEdit);
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
        <h1>Confirm the changes to this employee</h1>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleConfirmUpdate}>Confirm</button>
        <button onClick={onHide}>Cancel</button>
      </Modal.Footer>
    </Modal>
  );
}