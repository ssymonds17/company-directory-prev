import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default function SuccessModal(props) {
  return (
    <Modal show={props.show}>
      <Modal.Body>
        <h1>Employee data has been successfully updated</h1>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={props.onHide}>Continue</button>
      </Modal.Footer>
    </Modal>
  );
}
