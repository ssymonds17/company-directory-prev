import React, { useState, useEffect, useContext } from 'react';
import {
  fetchEmployees,
  fetchDepartments,
  fetchLocations
} from './services/actions';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [employees, setEmployees] = useState(null);
  const [departments, setDepartments] = useState(null);
  const [locations, setLocations] = useState(null);

  const getData = async () => {
    const employeeData = await fetchEmployees();
    const departmentData = await fetchDepartments();
    const locationsData = await fetchLocations();
    setEmployees(employeeData);
    setDepartments(departmentData);
    setLocations(locationsData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AppContext.Provider value={{ employees, departments, locations }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
