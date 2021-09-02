import React from 'react';
import AddButton from '../AddButton';
import LocationsTable from './LocationsTable';

export default function Locations() {
  return (
    <div id='locations' className='section-container'>
      <div>
        <AddButton type='location' />
        <LocationsTable />
      </div>
    </div>
  );
}
