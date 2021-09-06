import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default function DepartmentDisplayModal(props) {
  const {
    selectedDepartment,
    handleEditDepartmentClick,
    handleDeleteDepartmentClick,
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
          <h1>{selectedDepartment.name}</h1>
          <h2>{selectedDepartment.location}</h2>
        </div>
        <div className='modal-actions-container'>
          <p onClick={handleEditDepartmentClick}>{editIcon}</p>
          <p onClick={handleDeleteDepartmentClick}>{deleteIcon}</p>
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
