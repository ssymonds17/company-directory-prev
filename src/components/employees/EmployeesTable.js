import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context';
import TableRow from './TableRow';
import EmployeeDisplayModal from '../modals/EmployeeDisplayModal';
import EmployeeEditModal from '../modals/EmployeeEditModal';
import EmployeeConfirmModal from '../modals/EmployeeConfirmModal';
import Table from 'react-bootstrap/Table';
import '../../index.css';
import SuccessModal from '../modals/SuccessModal';

export default function EmployeeTable() {
  const { employees } = useGlobalContext();
  const [visibleEmployees, setVisibleEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({
    id: 0,
    firstName: 'John',
    lastName: 'Doe',
    email: 'example.email.com',
    jobTitle: 'CEO',
    department: { name: 'Management', id: 0 }
  });
  const [updatingEmployee, setUpdatingEmployee] = useState({
    id: 0,
    firstName: 'John',
    lastName: 'Doe',
    email: 'example.email.com',
    jobTitle: 'CEO',
    department: { name: 'Management', id: 0 }
  });
  const [confirmedEmployeeToEdit, setConfirmedEmployeeToEdit] = useState(null);
  const [displayModalShow, setDisplayModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editConfirmModalShow, setEditConfirmModalShow] = useState(false);
  const [successModalShow, setSuccessModalShow] = useState(false);

  const handleEmployeeSelect = (employee) => {
    setDisplayModalShow(true);
    setSelectedEmployee(employee);
  };
  const handleEditSelect = () => {
    setDisplayModalShow(false);
    setEditModalShow(true);
  };

  const handleReturn = () => {
    setEditModalShow(false);
    setDisplayModalShow(true);
  };
  const handleContinue = () => {
    setEditModalShow(false);
    setEditConfirmModalShow(true);
  };

  useEffect(() => {
    setVisibleEmployees(employees);
  }, [employees]);

  return (
    <div>
      <Table responsive striped className='employees-table'>
        <thead>
          <tr>
            <th>EMPLOYEES</th>
          </tr>
        </thead>
        <tbody>
          {visibleEmployees &&
            visibleEmployees.map((employee) => {
              return (
                <TableRow
                  key={employee.id}
                  employee={employee}
                  handleClick={handleEmployeeSelect}
                />
              );
            })}
          {!visibleEmployees && (
            <tr>
              <td>No results</td>
            </tr>
          )}
        </tbody>
      </Table>
      <EmployeeDisplayModal
        show={displayModalShow}
        onHide={() => setDisplayModalShow(false)}
        selectedemployee={selectedEmployee}
        handleEditSelect={handleEditSelect}
      />
      <EmployeeEditModal
        show={editModalShow}
        handleReturn={handleReturn}
        handleContinue={handleContinue}
        selectedemployee={selectedEmployee}
        updatingEmployee={updatingEmployee}
        setUpdatingEmployee={setUpdatingEmployee}
        setConfirmedEmployeeToEdit={setConfirmedEmployeeToEdit}
      />
      <EmployeeConfirmModal
        show={editConfirmModalShow}
        onHide={() => {
          setEditConfirmModalShow(false);
          setEditModalShow(true);
        }}
        onSuccess={() => {
          setEditConfirmModalShow(false);
          setSuccessModalShow(true);
        }}
        confirmedEmployeeToEdit={confirmedEmployeeToEdit}
        type='edit'
      />
      <SuccessModal
        show={successModalShow}
        onHide={() => setSuccessModalShow(false)}
        type='Employee'
        action='updated'
      />
    </div>
  );
}
