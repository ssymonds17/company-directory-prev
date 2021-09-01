import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default function SuccessModal(props) {
  const { show, onHide, type, action } = props;
  return (
    <Modal show={show}>
      <Modal.Body>
        <h1>
          {type} data has been successfully {action}
        </h1>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onHide}>Continue</button>
      </Modal.Footer>
    </Modal>
  );
}
