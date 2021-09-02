import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { deleteDepartment } from '../../services/actions';

export default function EmployeeDeleteModal(props) {
  // const { getData } = useGlobalContext();
  const { show, onHide, selectedDepartment, getData } = props;

  // const handleDelete = async () => {
  //   const id = Number(selectedEmployee.id);
  //   const result = await deleteEmployee(id);
  //   if (result.description === 'success') {
  //     getData();
  //     onSuccess();
  //   } else {
  //     console.log('Some error');
  //   }
  // };

  return (
    <Modal show={show}>
      <Modal.Body>
        <h1>Are you sure you want to delete this department?</h1>
        <h3>This cannot be undone</h3>
      </Modal.Body>
      <Modal.Footer>
        {/* <button onClick={handleDelete}>Delete</button> */}
        <button onClick={onHide}>Cancel</button>
      </Modal.Footer>
    </Modal>
  );
}
