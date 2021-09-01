import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default function EmployeeDisplayModal(props) {
  const {
    selectedemployee,
    handleEditSelect,
    handleDeleteSelect,
    ...rest
  } = props;
  const deleteIcon = <FontAwesomeIcon icon={faTrashAlt} />;
  const editIcon = <FontAwesomeIcon icon={faEdit} />;

  return (
    <Modal {...rest}>
      <Modal.Body style={{ display: 'flex' }}>
        <div style={{ width: '80%' }}>
          <h1>
            {selectedemployee.firstName} {selectedemployee.lastName}
          </h1>
          <h2>{selectedemployee.jobTitle}</h2>
          <h5>
            {selectedemployee.department}, {selectedemployee.location}
          </h5>
          <h5>{selectedemployee.email}</h5>
        </div>
        <div
          style={{
            width: '20%',
            display: 'flex',
            justifyContent: 'space-around'
          }}
        >
          <p onClick={handleEditSelect}>{editIcon}</p>
          <p onClick={handleDeleteSelect}>{deleteIcon}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={props.onHide}>Back</button>
      </Modal.Footer>
    </Modal>
  );
}
