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
  const deleteIcon = <FontAwesomeIcon icon={faTrashAlt} />;
  const editIcon = <FontAwesomeIcon icon={faEdit} />;

  return (
    <Modal show={show}>
      <Modal.Body style={{ display: 'flex' }}>
        <div style={{ width: '80%' }}>
          <h1>
            {selectedEmployee.firstName} {selectedEmployee.lastName}
          </h1>
          <h2>{selectedEmployee.jobTitle}</h2>
          <h5>
            {selectedEmployee.department}, {selectedEmployee.location}
          </h5>
          <h5>{selectedEmployee.email}</h5>
        </div>
        <div
          style={{
            width: '20%',
            display: 'flex',
            justifyContent: 'space-around'
          }}
        >
          <p onClick={handleEditEmployeeClick}>{editIcon}</p>
          <p onClick={handleDeleteEmployeeClick}>{deleteIcon}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onHide}>Back</button>
      </Modal.Footer>
    </Modal>
  );
}
