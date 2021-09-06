import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default function EmployeeDisplayModal(props) {
  const {
    selectedEmployee,
    handleEditEmployeeClick,
    handleDeleteEmployeeClick,
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
          <h1>
            {selectedEmployee.firstName} {selectedEmployee.lastName}
          </h1>
          <h2>{selectedEmployee.jobTitle}</h2>
          <h5>
            {selectedEmployee.department}, {selectedEmployee.location}
          </h5>
          <h5>{selectedEmployee.email}</h5>
        </div>
        <div className='modal-actions-container'>
          <p onClick={handleEditEmployeeClick}>{editIcon}</p>
          <p onClick={handleDeleteEmployeeClick}>{deleteIcon}</p>
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
