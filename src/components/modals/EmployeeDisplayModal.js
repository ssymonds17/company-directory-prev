import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default function EmployeeDisplayModal(props) {
  const { selectedemployee, ...rest } = props;
  let employeeName = `${selectedemployee.firstName} ${selectedemployee.lastName}`;
  let depAndLoc = `${selectedemployee.department}, ${selectedemployee.location}`;

  return (
    <Modal {...rest}>
      <Modal.Body style={{ display: 'flex' }}>
        <div>
          <h1>{employeeName ? employeeName : null}</h1>
          <h2>{selectedemployee ? selectedemployee.jobTitle : null}</h2>
          <h5>{depAndLoc ? depAndLoc : null}</h5>
        </div>
        <div style={{ display: 'flex' }}>
          <p>Edit</p>
          <p>Delete</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={props.onHide}>Close</button>
      </Modal.Footer>
    </Modal>
  );
}
