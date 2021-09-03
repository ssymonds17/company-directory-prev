import React, { useState, useEffect, useContext } from 'react';
import {
  fetchEmployees,
  fetchDepartments,
  fetchLocations
} from './services/actions';
import {
  filterEmployeesByName,
  filterEmployeesByDepartment,
  convertLocationIDsToDepartments
} from './services/helpers';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [employees, setEmployees] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [departments, setDepartments] = useState(null);
  const [locations, setLocations] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);

  const getData = async () => {
    const employeeData = await fetchEmployees();
    const departmentData = await fetchDepartments();
    const locationsData = await fetchLocations();
    setEmployees(employeeData);
    setDepartments(departmentData);
    setLocations(locationsData);
  };

  // Make api call for data on application load
  useEffect(() => {
    getData();
  }, []);

  // Filter employee list based on departments selected
  useEffect(() => {
    if (employees) {
      if (filteredDepartments.length === 0) {
        setFilteredEmployees(employees);
      } else {
        const newEmployeesList = filterEmployeesByDepartment(
          employees,
          filteredDepartments
        );
        setFilteredEmployees(newEmployeesList);
      }
    }
  }, [employees, filteredDepartments]);

  // Filter employee list based on locations selected
  useEffect(() => {
    if (employees) {
      if (filteredLocations.length === 0) {
        setFilteredEmployees(employees);
      } else {
        const departmentList = convertLocationIDsToDepartments(
          filteredLocations,
          departments
        );
        const newEmployeesList = filterEmployeesByDepartment(
          employees,
          departmentList
        );
        setFilteredEmployees(newEmployeesList);
      }
    }
  }, [employees, filteredLocations]);

  // When user input or employees list changes filter the employees list to return those that match the filter function
  useEffect(() => {
    if (employees) {
      const newEmployeesList = filterEmployeesByName(employees, userInput);
      setFilteredEmployees(newEmployeesList);
    }
  }, [employees, userInput]);

  return (
    <AppContext.Provider
      value={{
        employees,
        filteredEmployees,
        departments,
        locations,
        getData,
        setUserInput,
        filteredDepartments,
        setFilteredDepartments,
        filteredLocations,
        setFilteredLocations
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
