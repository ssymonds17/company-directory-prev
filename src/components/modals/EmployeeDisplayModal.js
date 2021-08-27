import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default function EmployeeDisplayModal(props) {
  const { ...rest } = props;
  return (
    <Modal {...rest}>
      <Modal.Body>
        <p>Modal displays</p>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={props.onHide}>Close</button>
      </Modal.Footer>
    </Modal>
  );
}
