import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context';
import TableRow from './TableRow';
import EmployeeDisplayModal from '../modals/EmployeeDisplayModal';
import Table from 'react-bootstrap/Table';
import '../../index.css';

export default function EmployeeTable() {
  const { employees } = useGlobalContext();
  const [visibleEmployees, setVisibleEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [displayModalShow, setDisplayModalShow] = useState(false);

  const handleClick = (employee) => {
    setDisplayModalShow(true);
    setSelectedEmployee(employee);
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
                  handleClick={handleClick}
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
      />
    </div>
  );
}
