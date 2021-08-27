import React, { useState, useEffect, useContext } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [employees, setEmployees] = useState(null);
  const [departments, setDepartments] = useState(null);
  const [locations, setLocations] = useState(null);
  const [error, setError] = useState(null);

  const getEmployees = () => {
    fetch('http://192.168.64.2/project2-api/php/getEmployees.php')
      .then((res) => res.json())
      .then(
        (result) => {
          setEmployees(result.data);
        },
        (error) => {
          setError(error);
        }
      );
  };
  const getDepartments = () => {
    fetch('http://192.168.64.2/project2-api/php/getDepartments.php')
      .then((res) => res.json())
      .then(
        (result) => {
          setDepartments(result.data);
        },
        (error) => {
          setError(error);
        }
      );
  };
  const getLocations = () => {
    fetch('http://192.168.64.2/project2-api/php/getLocations.php')
      .then((res) => res.json())
      .then(
        (result) => {
          setLocations(result.data);
        },
        (error) => {
          setError(error);
        }
      );
  };

  useEffect(() => {
    getEmployees();
    getDepartments();
    getLocations();
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
