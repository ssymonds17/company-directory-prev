import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context';
import Table from 'react-bootstrap/Table';
import '../../index.css';
import LocationsTableRow from './LocationsTableRow';

export default function LocationsTable() {
  const { locations } = useGlobalContext();
  return (
    <div>
      <Table responsive striped className='section-table'>
        <thead>
          <tr>
            <th>LOCATIONS</th>
          </tr>
        </thead>
        <tbody>
          {locations &&
            locations.map((location) => {
              return (
                <LocationsTableRow
                  key={location.id}
                  location={location}
                  // handleClick={handleEmployeeSelect}
                />
              );
            })}
          {!locations && (
            <tr>
              <td>Loading...</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
