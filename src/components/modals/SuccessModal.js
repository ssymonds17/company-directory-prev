import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default function SuccessModal(props) {
  const { show, onHide, type, action } = props;
  return (
    <Modal show={show}>
      <Modal.Body className='confirm-modal-body'>
        <h1>
          {type} has been successfully {action}
        </h1>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onHide} className='confirm-button'>
          Continue
        </button>
      </Modal.Footer>
    </Modal>
  );
}
