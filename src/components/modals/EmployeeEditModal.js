import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default function EmployeeEditModal(props) {
  const { selectedemployee, ...rest } = props;

  return (
    <Modal {...rest}>
      <Modal.Body style={{ display: 'flex' }}>
        <div style={{ width: '80%' }}>
          <h1>
            {selectedemployee
              ? `${selectedemployee.firstName} ${selectedemployee.lastName}`
              : null}
          </h1>
        </div>
        <div
          style={{
            width: '20%',
            display: 'flex',
            justifyContent: 'space-around'
          }}
        >
          <p onClick={props.onHide}>Cancel</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button>Confirm</button>
      </Modal.Footer>
    </Modal>
  );
}
