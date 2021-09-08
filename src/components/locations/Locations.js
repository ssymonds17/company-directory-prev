import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context';
import $ from 'jquery';
import AddButton from '../AddButton';
import LocationsTable from './LocationsTable';
import LocationDisplayModal from '../modals/LocationDisplayModal';
import LocationAddModal from '../modals/LocationAddModal';
import LocationEditModal from '../modals/LocationEditModal';
import LocationConfirmEditModal from '../modals/LocationConfirmEditModal';
import LocationDeleteModal from '../modals/LocationDeleteModal';
import SuccessModal from '../modals/SuccessModal';
import WarningModal from '../modals/WarningModal';
import ErrorModal from '../modals/ErrorModal';
import { checkDatabaseDependencies } from '../../services/helpers';

export default function Locations(props) {
  const {
    departments,
    locations,
    getData,
    filteredLocations,
    setFilteredLocations
  } = useGlobalContext();
  const { selectedCategory, setSelectedCategory } = props;
  // Elements
  const [visibleLocations, setVisibleLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({
    id: 0,
    name: 'Bradford'
  });
  const [updatingLocation, setUpdatingLocation] = useState({
    id: 0,
    name: 'Bradford'
  });
  const [confirmedLocToEdit, setConfirmedLocToEdit] = useState(null);
  // Modals
  const [displayModalShow, setDisplayModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const [addSuccessShow, setAddSuccessShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [confirmEditModalShow, setConfirmEditModalShow] = useState(false);
  const [editSuccessShow, setEditSuccessShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [deleteSuccessShow, setDeleteSuccessShow] = useState(false);
  const [warningModalShow, setWarningModalShow] = useState(false);
  const [errorModalShow, setErrorModalShow] = useState(false);
  // Select
  const [thisSelected, setThisSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const [blocked, setBlocked] = useState(false);

  // Set visibilty of location table body
  const toggleOpen = () => {
    if (open) {
      setOpen(false);
      setThisSelected(false);
      setFilteredLocations([]);
      setSelectedCategory('');
      $('#location-tbody').slideUp();
    } else {
      setOpen(true);
      $('#location-tbody').slideDown();
    }
  };
  // Open Display Modal
  const handleLocationSelect = (location) => {
    setDisplayModalShow(true);
    setSelectedLocation(location);
  };
  // Open Add Modal
  const handleAddLocationClick = () => {
    setAddModalShow(true);
  };
  // Successful Creation of Location
  const onAddSuccess = () => {
    setAddModalShow(false);
    setAddSuccessShow(true);
  };
  // // Open Edit Modal
  const handleEditLocationClick = () => {
    setDisplayModalShow(false);
    setEditModalShow(true);
  };
  // // Return from Edit Modal
  const handleReturnFromEdit = () => {
    setEditModalShow(false);
    setDisplayModalShow(true);
  };
  // // Continue from Edit Modal to Confirm Edit Modal
  const handleContinueFromEdit = () => {
    setEditModalShow(false);
    setConfirmEditModalShow(true);
  };
  // // Successful Edit of Location
  const onUpdateSuccess = () => {
    setConfirmEditModalShow(false);
    setEditSuccessShow(true);
  };
  // // Open Delete Modal
  const handleDeleteLocationClick = () => {
    // Check if any departments are still attached to the location the user wishes to delete
    const dependencies = checkDatabaseDependencies(
      departments,
      selectedLocation,
      'location'
    );

    if (dependencies === 0) {
      setDisplayModalShow(false);
      setDeleteModalShow(true);
    } else {
      setWarningModalShow(true);
    }
  };
  // // Successful Deletion of Location
  const onDeleteSuccess = () => {
    setDeleteModalShow(false);
    setDeleteSuccessShow(true);
  };
  // On request error
  const onErrorAdd = () => {
    setAddModalShow(false);
    setErrorModalShow(true);
  };
  const onErrorEdit = () => {
    setConfirmEditModalShow(false);
    setErrorModalShow(true);
  };
  const onErrorDelete = () => {
    setDeleteModalShow(false);
    setErrorModalShow(true);
  };

  // Select button clicks
  const onSelectClick = () => {
    !thisSelected ? setSelectedCategory('locations') : setSelectedCategory('');
    setThisSelected(!thisSelected);
    setFilteredLocations([]);
  };
  const onSelectLocation = (location) => {
    const newFilterList = [...filteredLocations];
    const alreadyFiltered = newFilterList.includes(location.name);

    if (alreadyFiltered) {
      const index = newFilterList.indexOf(location.name);
      if (index > -1) {
        newFilterList.splice(index, 1);
      }
    } else {
      newFilterList.push(location.name);
    }
    setFilteredLocations(newFilterList);
  };

  // USE EFFECTS

  useEffect(() => {
    $('#location-tbody').hide();
  }, []);

  useEffect(() => {
    setVisibleLocations(locations);
  }, [locations]);

  useEffect(() => {
    if (selectedCategory === 'locations' || selectedCategory === '') {
      setBlocked(false);
    } else if (selectedCategory === 'departments') {
      setOpen(false);
      setThisSelected(false);
      setFilteredLocations([]);
      setBlocked(true);
      $('#location-tbody').slideUp();
    }
  }, [selectedCategory]);

  return (
    <>
      <div id='locations' className='section-container'>
        <div>
          <AddButton
            type='location'
            addRecord={handleAddLocationClick}
            thisSelected={thisSelected}
            onSelectClick={onSelectClick}
            flex={true}
            open={open}
          />
          <LocationsTable
            locations={visibleLocations}
            handleLocationSelect={handleLocationSelect}
            thisSelected={thisSelected}
            onSelectLocation={onSelectLocation}
            toggleOpen={blocked ? null : toggleOpen}
            open={open}
          />
        </div>
      </div>
      <LocationDisplayModal
        show={displayModalShow}
        onHide={() => setDisplayModalShow(false)}
        selectedLocation={selectedLocation}
        handleEditLocationClick={handleEditLocationClick}
        handleDeleteLocationClick={handleDeleteLocationClick}
      />
      <LocationAddModal
        show={addModalShow}
        onHide={() => setAddModalShow(false)}
        onAddSuccess={onAddSuccess}
        locations={locations}
        departments={departments}
        getData={getData}
        onErrorAdd={onErrorAdd}
      />
      {/* ADD SUCCESS */}
      <SuccessModal
        show={addSuccessShow}
        onHide={() => setAddSuccessShow(false)}
        type='Location'
        action='created'
      />
      <LocationEditModal
        show={editModalShow}
        handleReturnFromEdit={handleReturnFromEdit}
        handleContinueFromEdit={handleContinueFromEdit}
        selectedLocation={selectedLocation}
        updatingLocation={updatingLocation}
        setUpdatingLocation={setUpdatingLocation}
        setConfirmedLocToEdit={setConfirmedLocToEdit}
        locations={locations}
        departments={departments}
      />
      <LocationConfirmEditModal
        show={confirmEditModalShow}
        onHide={() => {
          setConfirmEditModalShow(false);
          setEditModalShow(true);
        }}
        onUpdateSuccess={onUpdateSuccess}
        confirmedLocToEdit={confirmedLocToEdit}
        getData={getData}
        onErrorEdit={onErrorEdit}
      />
      {/* UPDATE SUCCESS */}
      <SuccessModal
        show={editSuccessShow}
        onHide={() => setEditSuccessShow(false)}
        type='Location'
        action='updated'
      />
      <LocationDeleteModal
        show={deleteModalShow}
        onHide={() => {
          setDeleteModalShow(false);
          setDisplayModalShow(true);
        }}
        onDeleteSuccess={onDeleteSuccess}
        selectedLocation={selectedLocation}
        getData={getData}
        onErrorDelete={onErrorDelete}
      />
      <SuccessModal
        show={deleteSuccessShow}
        onHide={() => setDeleteSuccessShow(false)}
        type='Location'
        action='deleted'
      />
      <WarningModal
        show={warningModalShow}
        onHide={() => {
          setWarningModalShow(false);
          setDisplayModalShow(true);
        }}
        childElement='department'
        parentElement='location'
      />
      <ErrorModal
        show={errorModalShow}
        onHide={() => setErrorModalShow(false)}
      />
    </>
  );
}
