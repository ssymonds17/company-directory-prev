import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import '../../index.css';
import LocationTableRow from './LocationTableRow';

export default function LocationsTable(props) {
  const {
    locations,
    handleLocationSelect,
    thisSelected,
    onSelectLocation
  } = props;
  const [open, setOpen] = useState(false);
  const chevronIcon = (
    <FontAwesomeIcon className={open ? '' : 'rotate'} icon={faChevronUp} />
  );

  const toggleOpen = () => {
    if (open) {
      $('#location-tbody').slideUp();
      setOpen(false);
    } else {
      $('#location-tbody').slideDown();
      setOpen(true);
    }
  };

  useEffect(() => {
    $('#location-tbody').hide();
  }, []);

  return (
    <div>
      <Table className='flex-table'>
        <thead>
          <tr onClick={toggleOpen}>
            <th>LOCATIONS {chevronIcon}</th>
          </tr>
        </thead>
      </Table>
      <div id='location-tbody'>
        <Table responsive striped className='flex-table'>
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
    </div>
  );
}
