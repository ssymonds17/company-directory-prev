import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default function LocationDisplayModal(props) {
  const {
    selectedLocation,
    handleEditLocationClick,
    handleDeleteLocationClick,
    show,
    onHide
  } = props;
  const deleteIcon = (
    <FontAwesomeIcon icon={faTrashAlt} className='trash-icon' />
  );
  const editIcon = <FontAwesomeIcon icon={faEdit} className='edit-icon' />;

  return (
    <Modal show={show}>
      <Modal.Body className='custom-modal-title'>
        <div className='custom-modal-header'>
          <h1>{selectedLocation.name}</h1>
          <h2>{selectedLocation.location}</h2>
        </div>
        <div className='modal-actions-container'>
          <p onClick={handleEditLocationClick}>{editIcon}</p>
          <p onClick={handleDeleteLocationClick}>{deleteIcon}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onHide} className='back-button'>
          Back
        </button>
      </Modal.Footer>
    </Modal>
  );
}
