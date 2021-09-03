import React from 'react';
import Table from 'react-bootstrap/Table';
import '../../index.css';
import LocationTableRow from './LocationTableRow';

export default function LocationsTable(props) {
  const {
    locations,
    handleLocationSelect,
    thisSelected,
    onSelectLocation
  } = props;
  return (
    <div>
      <Table responsive striped className='section-table'>
        <thead>
          <tr>
            <th>LOCATIONS</th>
          </tr>
        </thead>
        <tbody className={thisSelected ? 'selected-category-container' : ''}>
          {/* NOT SELECTED */}
          {locations &&
            !thisSelected &&
            locations.map((location) => {
              return (
                <LocationTableRow
                  key={location.id}
                  location={location}
                  handleClick={handleLocationSelect}
                />
              );
            })}
          {/* SELECTED */}
          {locations &&
            thisSelected &&
            locations.map((location) => {
              return (
                <LocationTableRow
                  key={location.id}
                  location={location}
                  handleClick={onSelectLocation}
                  isSelected={true}
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
