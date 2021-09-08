import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default function ErrorModal(props) {
  const { show, onHide } = props;
  return (
    <Modal show={show}>
      <Modal.Body className='confirm-modal-body'>
        <h1>Error</h1>
        <h3>There was an error handling your request.</h3>
        <h3>Please try again at another time.</h3>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onHide} className='delete-button'>
          Back
        </button>
      </Modal.Footer>
    </Modal>
  );
}
