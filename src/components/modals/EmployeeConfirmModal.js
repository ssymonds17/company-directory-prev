import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default function EmployeeDisplayModal(props) {
  const { type, updatingEmployee, confirmedEmployeeToEdit, ...rest } = props;

  if (type === 'edit') {
    return (
      <Modal {...rest}>
        <Modal.Body>
          <h1>Confirm the changes to this employee</h1>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => {}}>Confirm</button>
          <button onClick={props.onHide}>Cancel</button>
        </Modal.Footer>
      </Modal>
    );
  }
}
