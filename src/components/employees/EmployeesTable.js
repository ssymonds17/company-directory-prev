import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context';
import TableRow from './TableRow';
import EmployeeDisplayModal from '../modals/EmployeeDisplayModal';
import EmployeeEditModal from '../modals/EmployeeEditModal';
import EmployeeConfirmModal from '../modals/EmployeeConfirmModal';
import Table from 'react-bootstrap/Table';
import '../../index.css';

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

  const [displayModalShow, setDisplayModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editConfirmModalShow, setEditConfirmModalShow] = useState(false);

  const handleEmployeeSelect = (employee) => {
    setDisplayModalShow(true);
    setSelectedEmployee(employee);
  };
  const handleEditSelect = () => {
    setDisplayModalShow(false);
    setEditModalShow(true);
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
        onReturn={() => {
          setEditModalShow(false);
          setDisplayModalShow(true);
        }}
        onContinue={() => {
          setEditModalShow(false);
          setEditConfirmModalShow(true);
        }}
        selectedemployee={selectedEmployee}
        updatingEmployee={updatingEmployee}
        setUpdatingEmployee={setUpdatingEmployee}
      />
      <EmployeeConfirmModal
        show={editConfirmModalShow}
        onHide={() => {
          setEditConfirmModalShow(false);
          setEditModalShow(true);
        }}
        updatingEmployee={updatingEmployee}
        type='edit'
      />
    </div>
  );
}
