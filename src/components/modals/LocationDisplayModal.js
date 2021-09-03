import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default function LocationDisplayModal(props) {
  const {
    selectedLocation,
    // handleEditDepartmentClick,
    // handleDeleteDepartmentClick,
    show,
    onHide
  } = props;
  const deleteIcon = <FontAwesomeIcon icon={faTrashAlt} />;
  const editIcon = <FontAwesomeIcon icon={faEdit} />;

  return (
    <Modal show={show}>
      <Modal.Body style={{ display: 'flex' }}>
        <div style={{ width: '80%' }}>
          <h1>{selectedLocation.name}</h1>
          <h2>{selectedLocation.location}</h2>
        </div>
        <div
          style={{
            width: '20%',
            display: 'flex',
            justifyContent: 'space-around'
          }}
        >
          {/* <p onClick={handleEditDepartmentClick}>{editIcon}</p>
          <p onClick={handleDeleteDepartmentClick}>{deleteIcon}</p> */}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onHide}>Back</button>
      </Modal.Footer>
    </Modal>
  );
}
