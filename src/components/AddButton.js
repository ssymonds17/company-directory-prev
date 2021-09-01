import React, { useState } from 'react';
import EmployeeAddModal from './modals/EmployeeAddModal';
import SuccessModal from './modals/SuccessModal';

export default function AddButton(props) {
  const [employeeModalShow, setEmployeeModalShow] = useState(false);
  const [employeeSuccessShow, setEmployeeSuccessShow] = useState(false);

  const handleAddEmployeeClick = () => {
    setEmployeeModalShow(true);
  };

  const onEmployeeSuccess = () => {
    setEmployeeModalShow(false);
    setEmployeeSuccessShow(true);
  };

  if (props.type === 'employee') {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <h3
            onClick={handleAddEmployeeClick}
            style={{ paddingRight: '0.5rem' }}
          >
            +
          </h3>
        </div>
        <EmployeeAddModal
          show={employeeModalShow}
          onHide={() => {
            setEmployeeModalShow(false);
          }}
          onEmployeeSuccess={onEmployeeSuccess}
        />
        <SuccessModal
          show={employeeSuccessShow}
          onHide={() => setEmployeeSuccessShow(false)}
          type='Employee'
          action='created'
        />
      </>
    );
  }
}
