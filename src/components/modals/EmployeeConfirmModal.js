import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useGlobalContext } from '../../context';
import { updateEmployee } from '../../services/actions';

export default function EmployeeConfirmModal(props) {
  const {
    type,
    updatingEmployee,
    confirmedEmployeeToEdit,
    onSuccess,
    ...rest
  } = props;
  const { getData } = useGlobalContext();

  const handleConfirmUpdate = async () => {
    const result = await updateEmployee(confirmedEmployeeToEdit);
    if (result.description === 'success') {
      getData();
      onSuccess();
    } else {
      console.log('Some error');
    }
  };

  if (type === 'edit') {
    return (
      <Modal {...rest}>
        <Modal.Body>
          <h1>Confirm the changes to this employee</h1>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleConfirmUpdate}>Confirm</button>
          <button onClick={props.onHide}>Cancel</button>
        </Modal.Footer>
      </Modal>
    );
  }
}
