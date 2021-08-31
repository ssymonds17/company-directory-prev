import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default function EmployeeDisplayModal(props) {
  const { selectedemployee, ...rest } = props;
  const deleteIcon = <FontAwesomeIcon icon={faTrashAlt} />;
  const editIcon = <FontAwesomeIcon icon={faEdit} />;

  return (
    <Modal {...rest}>
      <Modal.Body style={{ display: 'flex' }}>
        <div style={{ width: '80%' }}>
          <h1>
            {selectedemployee
              ? `${selectedemployee.firstName} ${selectedemployee.lastName}`
              : null}
          </h1>
          <h2>{selectedemployee ? selectedemployee.jobTitle : null}</h2>
          <h5>
            {selectedemployee
              ? `${selectedemployee.department}, ${selectedemployee.location}`
              : null}
          </h5>
        </div>
        <div
          style={{
            width: '20%',
            display: 'flex',
            justifyContent: 'space-around'
          }}
        >
          <p onClick={props.handleEditSelect}>{editIcon}</p>
          <p>{deleteIcon}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={props.onHide}>Back</button>
      </Modal.Footer>
    </Modal>
  );
}
