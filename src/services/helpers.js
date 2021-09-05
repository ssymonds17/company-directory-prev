// ---------- VALIDATION FUNCTIONS ----------------
export const validateEmployee = (employee, setError, selectedEmployee) => {
  let employeeRef = selectedEmployee;
  delete employeeRef.location;
  const noChange = noChangeOnEdit(employee, employeeRef);
  if (noChange) {
    setError('No changes have been made. Please update one or more fields.');
    return false;
  }

  const stringRegex = new RegExp(/[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~0-9]/);
  const emailRegex = new RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  const properties = ['firstName', 'lastName', 'jobTitle'];

  for (let i = 0; i < properties.length; i++) {
    const invalidString = stringRegex.test(employee[properties[i]]);
    if (invalidString || !employee[properties[i]]) {
      setError(
        'All fields must contain at least 1 character and contain no special characters'
      );
      return false;
    }
  }
  const validEmail = emailRegex.test(employee['email']);
  if (!validEmail || !employee['email']) {
    setError('Please use valid email address');
    return false;
  }
  setError('');
  return true;
};

export const checkBlankOnEditEmployee = (
  propertyList,
  selectedEmployee,
  updatingEmployee,
  setUpdatingEmployee
) => {
  let templateEmployee = updatingEmployee;
  propertyList.forEach((property) => {
    if (updatingEmployee[property] === '') {
      templateEmployee[property] = selectedEmployee[property];
      setUpdatingEmployee(templateEmployee);
    }
  });
};

const noChangeOnEdit = (employee, employeeRef) => {
  const firstName = employee.firstName === employeeRef.firstName;
  const lastName = employee.lastName === employeeRef.lastName;
  const email = employee.email === employeeRef.email;
  const jobTitle = employee.jobTitle === employeeRef.jobTitle;
  const department = employee.department === employeeRef.department;
  if (firstName && lastName && email && jobTitle && department) {
    return true;
  } else {
    return false;
  }
};

export const validateDepartment = (
  department,
  departmentsList,
  setError,
  selectedDepartment
) => {
  const noChange = department.name === selectedDepartment.name;
  if (noChange) {
    setError('No changes have been made. Please update one or more fields.');
    return false;
  }
  const stringRegex = new RegExp(/[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~0-9]/);
  const invalidString = stringRegex.test(department['name']);
  if (invalidString || !department['name']) {
    setError(
      'Department name contain at least 1 character and contain no special characters'
    );
    return false;
  }

  const duplicate = checkDuplicateName(department, departmentsList);
  if (duplicate) {
    setError('Department with that name already exists');
    return false;
  }

  setError('');
  return true;
};

export const validateLocation = (location, locationsList, setError) => {
  const stringRegex = new RegExp(/[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~0-9]/);
  const invalidString = stringRegex.test(location['name']);
  if (invalidString || !location['name']) {
    setError(
      'Location name contain at least 1 character and contain no special characters'
    );
    return false;
  }

  const duplicate = checkDuplicateName(location, locationsList);
  if (duplicate) {
    setError('Location with that name already exists');
    return false;
  }

  setError('');
  return true;
};

const checkDuplicateName = (element, elementList) => {
  const newElementList = elementList.filter((item) => item.id !== element.id);
  const elementNameLower = element.name.toLowerCase();
  for (let i = 0; i < newElementList.length; i++) {
    const itemNameLower = newElementList[i].name.toLowerCase();
    if (itemNameLower === elementNameLower) {
      return true;
    }
  }
  return false;
};

export const checkBlankNameOnEdit = (selected, updating, setUpdating) => {
  let template = updating;
  if (updating['name'] === '') {
    template['name'] = selected['name'];
    setUpdating(template);
  }
};

// ---------- CONVERSION FUNCTIONS ----------------
// Convert name of department into an id which can interact with the database
export const convertDepartmentToDepartmentID = (employee, departments) => {
  const departmentName = employee.department.toLowerCase();
  const departObj = departments.filter(
    (item) => item.name.toLowerCase() === departmentName
  );
  return Number(departObj[0].id);
};
export const convertLocationToLocationID = (department, locations) => {
  const locationName = department.location.toLowerCase();
  const locationObj = locations.filter(
    (item) => item.name.toLowerCase() === locationName
  );
  return Number(locationObj[0].id);
};

export const convertLocationIDsToDepartments = (locations, departments) => {
  let filteredList = [];

  locations.forEach((location) => {
    const name = location.toLowerCase();
    const filtered = departments.filter(
      (department) => name === department.location.toLowerCase()
    );
    let justNames = [];
    filtered.forEach((item) => {
      justNames.push(item.name);
    });

    const concat = filteredList.concat(justNames);
    filteredList = concat;
  });
  return filteredList;
};

// ------------ CHECK FUNCTIONS ------------
export const checkDatabaseDependencies = (
  childElements,
  parentElement,
  property
) => {
  const parentName = parentElement.name.toLowerCase();

  let count = 0;
  for (let i = 0; i < childElements.length; i++) {
    const childName = childElements[i][property].toLowerCase();
    if (parentName === childName) {
      count += 1;
    }
  }
  return count;
};

// ------------- FILTER FUNCTIONS -------------------
export const filterEmployeesByName = (list, input) => {
  const lowerCaseInput = input.toLowerCase();

  const filteredList = list.filter((employee) =>
    `${employee.firstName} ${employee.lastName}`
      .toLowerCase()
      .includes(lowerCaseInput)
  );
  return filteredList;
};

export const filterEmployeesByDepartment = (employees, departments) => {
  let filteredList = [];
  departments.forEach((department) => {
    const name = department.toLowerCase();
    const filtered = employees.filter(
      (employees) => name === employees.department.toLowerCase()
    );
    const concat = filteredList.concat(filtered);
    filteredList = concat;
  });
  filteredList.sort((a, b) => {
    const nameA = a.lastName.toLowerCase(); // ignore upper and lowercase
    const nameB = b.lastName.toLowerCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  });
  return filteredList;
};
