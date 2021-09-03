import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context';
import AddButton from '../AddButton';
import LocationsTable from './LocationsTable';
import LocationDisplayModal from '../modals/LocationDisplayModal';
import LocationAddModal from '../modals/LocationAddModal';
import LocationEditModal from '../modals/LocationEditModal';
import LocationConfirmEditModal from '../modals/LocationConfirmEditModal';
import LocationDeleteModal from '../modals/LocationDeleteModal';
import SuccessModal from '../modals/SuccessModal';
import WarningModal from '../modals/WarningModal';
import { checkDatabaseDependencies } from '../../services/helpers';

export default function Locations() {
  const { departments, locations, getData } = useGlobalContext();
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

  useEffect(() => {
    setVisibleLocations(locations);
  }, [locations]);
  return (
    <>
      <div id='locations' className='section-container'>
        <div>
          <AddButton type='location' addRecord={handleAddLocationClick} />
          <LocationsTable
            locations={visibleLocations}
            handleLocationSelect={handleLocationSelect}
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
    </>
  );
}
