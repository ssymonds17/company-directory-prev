import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default function WarningModal(props) {
  const { show, onHide, childElement, parentElement } = props;
  return (
    <Modal show={show}>
      <Modal.Body className='confirm-modal-body'>
        <h1>Warning</h1>
        <h3>
          There are still {childElement} records attached to this{' '}
          {parentElement}
        </h3>
        <h3>
          All associated {childElement} records must be deleted before this{' '}
          {parentElement} can be deleted
        </h3>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onHide} className='delete-button'>
          Back
        </button>
      </Modal.Footer>
    </Modal>
  );
}
